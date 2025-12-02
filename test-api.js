/**
 * Simple API test script for Windows PowerShell
 * Tests all API endpoints to ensure they're working correctly
 */

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const endpoints = [
  '/api/health',
  '/api/profile',
  '/api/projects',
  '/api/projects/ecommerce-platform',
];

async function testEndpoint(url) {
  try {
    const response = await fetch(url);
    const status = response.status;
    const contentType = response.headers.get('content-type');
    
    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    return {
      url,
      status,
      success: status >= 200 && status < 300,
      data: data ? (typeof data === 'object' ? JSON.stringify(data).substring(0, 100) + '...' : data) : null,
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      success: false,
      error: error.message,
    };
  }
}

async function runTests() {
  console.log(`Testing API endpoints at ${baseUrl}\n`);
  console.log('='.repeat(60));
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const fullUrl = `${baseUrl}${endpoint}`;
    const result = await testEndpoint(fullUrl);
    results.push(result);
    
    const statusIcon = result.success ? '✓' : '✗';
    const statusText = result.success ? 'PASS' : 'FAIL';
    
    console.log(`\n${statusIcon} ${statusText}: ${endpoint}`);
    console.log(`   Status: ${result.status}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else if (result.data) {
      console.log(`   Response: ${result.data}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`\nResults: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('All tests passed! ✓\n');
    process.exit(0);
  } else {
    console.log('Some tests failed. ✗\n');
    process.exit(1);
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('Error: fetch is not available. Please use Node.js 18 or higher.');
  process.exit(1);
}

runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});

