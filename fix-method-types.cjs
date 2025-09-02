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
  
  // Fix the spread operator issue by restructuring request config
  content = content.replace(
    /const requestConfig: RequestConfig = \{\s*method: '(\w+)' as const,\s*endpoint: ([^,\n]+),\s*\.\.\.options,?\s*\}/gm,
    (match, method, endpoint) => {
      return `const requestConfig: RequestConfig = {\n      method: '${method}' as const,\n      endpoint: ${endpoint},\n      ...(options || {})\n    }`;
    }
  );
  
  // Handle cases with body parameter
  content = content.replace(
    /const requestConfig: RequestConfig = \{\s*method: '(\w+)' as const,\s*endpoint: ([^,\n]+),\s*body: ([^,\n]+),\s*\.\.\.options,?\s*\}/gm,
    (match, method, endpoint, body) => {
      return `const requestConfig: RequestConfig = {\n      method: '${method}' as const,\n      endpoint: ${endpoint},\n      body: ${body},\n      ...(options || {})\n    }`;
    }
  );
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed method types in ${filePath}`);
});

console.log('All method type issues fixed');