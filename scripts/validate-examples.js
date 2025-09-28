#!/usr/bin/env node

/**
 * Validate example payloads against their corresponding schemas
 * This script ensures all examples in the examples/ directory are valid
 * according to their corresponding JSON schemas.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const SCHEMAS_DIR = path.join(__dirname, '..', 'jsonschema');
const EXAMPLES_DIR = path.join(__dirname, '..', 'examples');

/**
 * Load all JSON schemas from the jsonschema directory
 */
function loadSchemas() {
  const schemas = new Map();
  
  if (!fs.existsSync(SCHEMAS_DIR)) {
    console.log('ℹ️  No jsonschema directory found, skipping schema validation');
    return schemas;
  }
  
  const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(SCHEMAS_DIR, file));
  
  for (const schemaFile of schemaFiles) {
    try {
      const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
      const schemaName = path.basename(schemaFile, '.json');
      schemas.set(schemaName, schema);
      console.log(`✅ Loaded schema: ${schemaName}`);
    } catch (error) {
      console.error(`❌ Failed to load schema ${schemaFile}:`, error.message);
      process.exit(1);
    }
  }
  
  return schemas;
}

/**
 * Validate examples against their corresponding schemas
 */
function validateExamples(schemas) {
  if (!fs.existsSync(EXAMPLES_DIR)) {
    console.log('ℹ️  No examples directory found, skipping example validation');
    return true;
  }
  
  const exampleFiles = fs.readdirSync(EXAMPLES_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(EXAMPLES_DIR, file));
  
  if (exampleFiles.length === 0) {
    console.log('ℹ️  No example files found');
    return true;
  }
  
  let allValid = true;
  
  for (const exampleFile of exampleFiles) {
    const exampleName = path.basename(exampleFile, '.json');
    const schemaName = exampleName.split('-')[0]; // Assume format: schemaName-example.json
    
    if (!schemas.has(schemaName)) {
      console.log(`⚠️  No schema found for example: ${exampleName} (looking for schema: ${schemaName})`);
      continue;
    }
    
    try {
      const example = JSON.parse(fs.readFileSync(exampleFile, 'utf8'));
      const schema = schemas.get(schemaName);
      
      const validate = ajv.compile(schema);
      const valid = validate(example);
      
      if (valid) {
        console.log(`✅ Example valid: ${exampleName}`);
      } else {
        console.error(`❌ Example invalid: ${exampleName}`);
        console.error('Validation errors:', validate.errors);
        allValid = false;
      }
    } catch (error) {
      console.error(`❌ Failed to validate example ${exampleFile}:`, error.message);
      allValid = false;
    }
  }
  
  return allValid;
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 Validating examples against schemas...\n');
  
  const schemas = loadSchemas();
  const isValid = validateExamples(schemas);
  
  if (isValid) {
    console.log('\n✅ All examples are valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Some examples are invalid!');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadSchemas, validateExamples };
