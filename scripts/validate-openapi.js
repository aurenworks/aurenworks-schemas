#!/usr/bin/env node

/**
 * Validate OpenAPI specifications
 * This script validates all OpenAPI specs in the openapi directory
 */

const fs = require('fs');
const path = require('path');
const SwaggerParser = require('@apidevtools/swagger-parser');

const OPENAPI_DIR = path.join(__dirname, '..', 'openapi');

/**
 * Validate OpenAPI specifications
 */
async function validateOpenApiSpecs() {
  if (!fs.existsSync(OPENAPI_DIR)) {
    console.log('ℹ️  No openapi directory found, skipping OpenAPI validation');
    return true;
  }
  
  const openApiFiles = fs.readdirSync(OPENAPI_DIR)
    .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
    .map(file => path.join(OPENAPI_DIR, file));
  
  if (openApiFiles.length === 0) {
    console.log('ℹ️  No OpenAPI files found');
    return true;
  }
  
  let allValid = true;
  
  for (const openApiFile of openApiFiles) {
    const specName = path.basename(openApiFile);
    
    try {
      await SwaggerParser.validate(openApiFile);
      console.log(`✅ OpenAPI spec valid: ${specName}`);
    } catch (error) {
      console.error(`❌ OpenAPI spec invalid: ${specName}`);
      console.error('Validation errors:', error.message);
      allValid = false;
    }
  }
  
  return allValid;
}

/**
 * Main validation function
 */
async function main() {
  console.log('🔍 Validating OpenAPI specifications...\n');
  
  try {
    const isValid = await validateOpenApiSpecs();
    
    if (isValid) {
      console.log('\n✅ All OpenAPI specs are valid!');
      process.exit(0);
    } else {
      console.log('\n❌ Some OpenAPI specs are invalid!');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ OpenAPI validation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateOpenApiSpecs };
