#!/usr/bin/env node

/**
 * Generate TypeScript types from OpenAPI specifications
 * This script generates TypeScript client code from OpenAPI specs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OPENAPI_DIR = path.join(__dirname, '..', 'openapi');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const TYPESCRIPT_CLIENT_DIR = path.join(DIST_DIR, 'typescript-client');

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate TypeScript client from OpenAPI spec
 */
function generateTypeScriptClient() {
  console.log('🔧 Generating TypeScript client from OpenAPI specification...');
  
  try {
    // Ensure dist directory exists
    ensureDir(DIST_DIR);
    
    // Check if OpenAPI spec exists
    const openApiSpec = path.join(OPENAPI_DIR, 'control-plane-v0.yaml');
    if (!fs.existsSync(openApiSpec)) {
      console.log('⚠️  No OpenAPI specification found, skipping TypeScript generation');
      return;
    }
    
    // Generate TypeScript client using OpenAPI Generator
    const command = `npx openapi-generator-cli generate -i ${openApiSpec} -g typescript-axios -o ${TYPESCRIPT_CLIENT_DIR} --additional-properties=typescriptThreePlus=true,npmName=@aurenworks/control-plane-client,packageName=@aurenworks/control-plane-client,packageVersion=0.1.0`;
    
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    
    console.log('✅ TypeScript client generated successfully');
    
    // Create a simple index file that exports the client
    const indexContent = `// Generated TypeScript client for AurenWorks Control Plane API
export * from './api';
export * from './models';
export * from './base';
export { Configuration } from './configuration';
export { DefaultApi } from './api/defaultApi';
`;
    
    fs.writeFileSync(path.join(TYPESCRIPT_CLIENT_DIR, 'index.ts'), indexContent);
    console.log('✅ Created index.ts for easy imports');
    
  } catch (error) {
    console.error('❌ Failed to generate TypeScript client:', error.message);
    process.exit(1);
  }
}

/**
 * Generate JSON Schema types (if needed)
 */
function generateJsonSchemaTypes() {
  console.log('🔧 Generating types from JSON schemas...');
  
  const schemasDir = path.join(__dirname, '..', 'jsonschema');
  if (!fs.existsSync(schemasDir)) {
    console.log('ℹ️  No JSON schemas found, skipping JSON schema type generation');
    return;
  }
  
  // This is a placeholder for future JSON schema type generation
  // For now, we'll focus on OpenAPI TypeScript generation
  console.log('ℹ️  JSON schema type generation not implemented yet');
}

/**
 * Main generation function
 */
function main() {
  console.log('🚀 Starting type generation...\n');
  
  try {
    generateTypeScriptClient();
    generateJsonSchemaTypes();
    
    console.log('\n✅ All type generation completed successfully!');
    console.log(`📁 Generated files are in: ${DIST_DIR}`);
    
  } catch (error) {
    console.error('\n❌ Type generation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateTypeScriptClient, generateJsonSchemaTypes };
