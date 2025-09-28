#!/usr/bin/env node

/**
 * Validate JSON schemas
 * This script validates all JSON schemas in the jsonschema directory
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const SCHEMAS_DIR = path.join(__dirname, '..', 'jsonschema');

/**
 * Validate JSON schemas
 */
function validateSchemas() {
  if (!fs.existsSync(SCHEMAS_DIR)) {
    console.log('ℹ️  No jsonschema directory found, skipping schema validation');
    return true;
  }
  
  const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(SCHEMAS_DIR, file));
  
  if (schemaFiles.length === 0) {
    console.log('ℹ️  No schema files found');
    return true;
  }
  
  let allValid = true;
  
  for (const schemaFile of schemaFiles) {
    const schemaName = path.basename(schemaFile, '.json');
    
    try {
      const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
      
      // Validate the schema itself
      const validate = ajv.compile(schema);
      
      if (validate.errors) {
        console.error(`❌ Schema invalid: ${schemaName}`);
        console.error('Validation errors:', validate.errors);
        allValid = false;
      } else {
        console.log(`✅ Schema valid: ${schemaName}`);
      }
      
    } catch (error) {
      console.error(`❌ Failed to validate schema ${schemaFile}:`, error.message);
      allValid = false;
    }
  }
  
  return allValid;
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 Validating JSON schemas...\n');
  
  const isValid = validateSchemas();
  
  if (isValid) {
    console.log('\n✅ All schemas are valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Some schemas are invalid!');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateSchemas };
