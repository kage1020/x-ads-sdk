const fs = require('fs');
const path = require('path');

const resourceFiles = [
  'src/resources/account.ts',
  'src/resources/campaign.ts', 
  'src/resources/line-item.ts'
];

resourceFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Fix method types with "as const"
  content = content.replace(/method: '(GET|POST|PUT|DELETE)',/g, "method: '$1' as const,");
  
  // Add type parameter to request calls and fix return types
  const responseTypeMap = {
    'account': 'AccountResponse',
    'campaign': 'CampaignResponse', 
    'line-item': 'LineItemResponse'
  };
  
  const fileType = Object.keys(responseTypeMap).find(type => filePath.includes(type));
  const responseType = responseTypeMap[fileType];
  
  if (responseType) {
    // Fix request calls to include type parameter
    content = content.replace(
      /const response = await this\.httpClient\.request\(requestConfig\);/g,
      `const response = await this.httpClient.request<${responseType}>(requestConfig);`
    );
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed ${filePath}`);
});

console.log('All type errors fixed');