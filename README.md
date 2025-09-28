# aurenworks-schemas

**Source of truth for contracts** in the AurenWorks platform. This repository contains shared schemas, API definitions, and contract specifications consumed by all AurenWorks services.

## 🎯 Purpose

This repository serves as the **contract layer** for the AurenWorks ecosystem, providing:

- **JSON Schemas** for data validation (Projects, Components, Records, Jobs, etc.)
- **OpenAPI** specifications for REST/GraphQL endpoints
- **MCP descriptor schemas** for LLM tool integrations
- **Event schemas** for inter-service communication
- **TypeScript definitions** and generated types

## 🏗️ Architecture

```
aurenworks-schemas (this repo)
├── jsonschema/          # Core data schemas
├── openapi/             # API specifications  
├── mcp/                 # MCP descriptor schemas
├── examples/            # Valid payload examples
├── scripts/             # Validation & build tools
└── dist/                # Generated artifacts
```

## 🔗 Consumer Repositories

This repository is consumed by:

- **[aurenworks-api](https://github.com/aurenworks/aurenworks-api)** - Control-plane API implementation
- **[aurenworks-studio](https://github.com/aurenworks/aurenworks-studio)** - No/low-code builder UI
- **[aurenworks-portal](https://github.com/aurenworks/aurenworks-portal)** - End-user portal/runtime
- **[aurenworks-worker](https://github.com/aurenworks/aurenworks-worker)** - Background workers
- **[aurenworks-docs](https://github.com/aurenworks/aurenworks-docs)** - Documentation site

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/aurenworks/aurenworks-schemas.git
cd aurenworks-schemas

# Install dependencies
npm install

# Validate all schemas
npm run validate:all
```

### Development

```bash
# Watch mode for development
npm run dev

# Validate schemas only
npm run validate:schemas

# Validate examples
npm run validate:examples

# Lint OpenAPI specs
npm run validate:openapi

# Build generated types
npm run build
```

## 📋 Validation & Quality

All schemas are validated using:

- **AJV** for JSON Schema validation
- **Spectral** for OpenAPI linting  
- **TypeScript** for type checking
- **Prettier** for code formatting

## 🔄 Versioning & Breaking Changes

This repository uses **Semantic Versioning**:

- **MAJOR** - Breaking changes (require consumer updates)
- **MINOR** - New optional fields/features
- **PATCH** - Bug fixes and clarifications

⚠️ **Breaking changes** are communicated via:
- CHANGELOG.md migration notes
- GitHub issues in consumer repos
- Slack notifications to the team

## 🤝 Contributing

See [AGENTS.md](./AGENTS.md) for detailed guidelines on:
- Schema design principles
- Validation requirements  
- Cross-repo impact assessment
- Pull request process

## 📄 License

Apache-2.0 - see [LICENSE](./LICENSE) for details.
