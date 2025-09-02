const fs = require('fs');
const path = require('path');

const resourceFiles = [
  'src/resources/campaign.ts',
  'src/resources/line-item.ts'
];

resourceFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Add RequestConfig import
  if (!content.includes('import type { RequestConfig }')) {
    content = content.replace(
      "import type { RequestOptions } from '../types/auth.js';",
      "import type { RequestConfig } from '../client/base.js';\nimport type { RequestOptions } from '../types/auth.js';"
    );
  }
  
  // Replace the request patterns - more comprehensive
  content = content.replace(
    /const requestConfig: RequestConfig = \{\s*method: '(GET|POST|PUT|DELETE)',\s*endpoint: ([^,\n]+),?([^}]*)\s*\};\s*const response = await this\.httpClient\.request\(requestConfig\);/gm,
    (match, method, endpoint, rest) => {
      const restFormatted = rest.trim() ? `\n      ${rest.trim()}` : '';
      return `const requestConfig: RequestConfig = {\n      method: '${method}' as const,\n      endpoint: ${endpoint},${restFormatted}\n    };\n    const response = await this.httpClient.request<Response>(requestConfig);`;
    }
  );
  
  // Replace return statements
  content = content.replace(/return response as (\w+Response);/g, 'return response;');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed ${filePath}`);
});

console.log('Resource files fixed');