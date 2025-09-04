/**
 * Media Upload Example for X Ads SDK
 *
 * This example demonstrates how to upload media files and manage media library using the X Ads SDK.
 */

/// <reference types="./vite-env" />

import { XAdsClient } from '../src/index';
import type { MediaListOptions, MediaUploadData, SDKConfig } from '../src/types';

async function mediaUploadExample() {
  // Initialize the client
  const config: SDKConfig = {
    credentials: {
      consumerKey: import.meta.env.VITE_CONSUMER_KEY || 'your-consumer-key',
      consumerSecret: import.meta.env.VITE_CONSUMER_SECRET || 'your-consumer-secret',
      accessToken: import.meta.env.VITE_ACCESS_TOKEN || 'your-access-token',
      accessTokenSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET || 'your-access-token-secret',
    },
    environment: 'sandbox',
    debug: true,
  };

  const client = new XAdsClient(config);

  try {
    // Get the first available account
    const accounts = await client.accounts.list();
    if (accounts.data.length === 0) {
      throw new Error('No advertising accounts found');
    }

    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accountId}`);

    // 1. Create sample image files for upload (in a real scenario, you'd have actual files)
    console.log('\n--- Creating sample media files ---');

    // Create sample image data (this would normally be file data)
    const imageData = createSampleImageFile('sample-ad-creative.jpg', 'image/jpeg');
    const videoData = createSampleVideoFile('sample-ad-video.mp4', 'video/mp4');

    // 2. Upload an image
    console.log('\n--- Uploading image media ---');
    const imageUploadData: MediaUploadData = {
      file: imageData,
      media_category: 'TWEET_IMAGE',
      name: 'Sample Ad Creative Image',
    };

    const imageUpload = await client.media.upload(accountId, imageUploadData);
    console.log(`Uploaded image: ${imageUpload.data.name} (ID: ${imageUpload.data.id})`);
    console.log(`File size: ${imageUpload.data.file_size} bytes`);
    console.log(`Media category: ${imageUpload.data.media_category}`);

    const imageId = imageUpload.data.id;

    // 3. Upload a video
    console.log('\n--- Uploading video media ---');
    const videoUploadData: MediaUploadData = {
      file: videoData,
      media_category: 'TWEET_VIDEO',
      name: 'Sample Ad Video',
    };

    const videoUpload = await client.media.upload(accountId, videoUploadData);
    console.log(`Uploaded video: ${videoUpload.data.name} (ID: ${videoUpload.data.id})`);
    console.log(`File size: ${videoUpload.data.file_size} bytes`);

    const videoId = videoUpload.data.id;

    // 4. Upload media without a name (optional)
    console.log('\n--- Uploading media without name ---');
    const simpleImageData: MediaUploadData = {
      file: createSampleImageFile('simple-image.png', 'image/png'),
      media_category: 'TWEET_IMAGE',
      // No name provided
    };

    const simpleUpload = await client.media.upload(accountId, simpleImageData);
    console.log(`Uploaded simple image (ID: ${simpleUpload.data.id})`);

    // 5. List all media in the library
    console.log('\n--- Listing media library ---');
    const allMedia = await client.media.list(accountId);
    console.log(`Found ${allMedia.data.length} media files in library:`);

    allMedia.data.slice(0, 5).forEach((media, index) => {
      console.log(`${index + 1}. ${media.name || 'Unnamed'} (${media.media_category})`);
      console.log(`   ID: ${media.id}`);
      console.log(`   File: ${media.file_name}, Size: ${media.file_size} bytes`);
      console.log(`   Created: ${media.created_at}`);
    });

    // 6. Filter media by category
    console.log('\n--- Filtering media by category ---');
    const imageOptions: MediaListOptions = {
      media_category: 'TWEET_IMAGE',
      count: 10,
    };

    const imageMedia = await client.media.list(accountId, imageOptions);
    console.log(`Found ${imageMedia.data.length} image files:`);

    imageMedia.data.forEach((media, index) => {
      console.log(`${index + 1}. ${media.name || media.file_name} (${media.media_category})`);
    });

    // 7. Get specific media details
    console.log('\n--- Getting specific media details ---');
    const mediaDetails = await client.media.getMedia(accountId, imageId);
    console.log(`Media details for ${imageId}:`);
    console.log(`Name: ${mediaDetails.data.name}`);
    console.log(`Category: ${mediaDetails.data.media_category}`);
    console.log(`File: ${mediaDetails.data.file_name}`);
    console.log(`Size: ${mediaDetails.data.file_size} bytes`);
    console.log(`Created: ${mediaDetails.data.created_at}`);
    console.log(`Updated: ${mediaDetails.data.updated_at}`);

    // 8. Demonstrate error handling for large files
    console.log('\n--- Error handling example ---');
    try {
      const tooLargeFile = createSampleImageFile('large-file.jpg', 'image/jpeg', 50 * 1024 * 1024); // 50MB
      const largeUploadData: MediaUploadData = {
        file: tooLargeFile,
        media_category: 'TWEET_IMAGE',
        name: 'File too large',
      };

      await client.media.upload(accountId, largeUploadData);
    } catch (error) {
      console.log('Expected error for large file:', error instanceof Error ? error.message : error);
    }

    // 9. Demonstrate name validation error
    try {
      const longNameData: MediaUploadData = {
        file: createSampleImageFile('test.jpg', 'image/jpeg'),
        media_category: 'TWEET_IMAGE',
        name: 'x'.repeat(300), // Name too long
      };

      await client.media.upload(accountId, longNameData);
    } catch (error) {
      console.log('Expected error for long name:', error instanceof Error ? error.message : error);
    }

    // 10. Clean up - delete test media (optional)
    console.log('\n--- Cleaning up test media ---');
    try {
      await client.media.delete(accountId, imageId);
      console.log(`Deleted image: ${imageId}`);

      await client.media.delete(accountId, videoId);
      console.log(`Deleted video: ${videoId}`);
    } catch (error) {
      console.log(
        'Error deleting media (may not exist):',
        error instanceof Error ? error.message : error
      );
    }
  } catch (error) {
    console.error('Media upload example failed:', error);
    throw error;
  }
}

// Helper function to create sample image file
function createSampleImageFile(filename: string, mimeType: string, size: number = 1024): File {
  // Create sample binary data
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);

  // Fill with sample data (in real usage, this would be actual image data)
  for (let i = 0; i < view.length; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }

  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

// Helper function to create sample video file
function createSampleVideoFile(filename: string, mimeType: string, size: number = 5 * 1024): File {
  // Create sample video data
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);

  // Fill with sample data
  for (let i = 0; i < view.length; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }

  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

mediaUploadExample()
  .then(() => {
    console.log('\nMedia upload example completed successfully');
  })
  .catch((error) => {
    console.error('Example failed:', error);
    if (typeof process !== 'undefined' && process.exit) {
      process.exit(1);
    }
  });
