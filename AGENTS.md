# AGENTS.md – Guidelines for AI Agents and Contributors (aurenworks-schemas)

This document defines how AI assistants (ChatGPT, Copilot, Cursor, etc.) and human contributors should interact with the **aurenworks-schemas** project.

---

## Mission
`aurenworks-schemas` is the **source of truth for contracts** in the AurenWorks platform:
- **JSON Schemas** (Projects, Components, Records, Jobs, etc.)
- **OpenAPI** for control‑plane endpoints
- (Future) **GraphQL/Protobuf/event contracts**
- **MCP descriptor types** (tools, resources, prompts) for LLM integrations

All client and server repos must consume these artifacts rather than duplicating types.

---

## Core Responsibilities
- Provide **well‑versioned, validated** schemas and API definitions.
- Guarantee **compatibility** and clear deprecation paths.
- Offer **examples and fixtures** used by API, Studio, Portal, Worker, and Docs.
- Publish an installable package (e.g., `@aurenworks/schemas`) with generated types where applicable.

---

## Rules for AI Agents (NON‑NEGOTIABLE)
- **Never commit secrets** or tokens in examples, tests, or docs.
- **No real endpoints** in examples; use placeholders like `https://api.example.local` and fake IDs.
- Prefer **additive changes**; avoid breaking fields. If a breaking change is required, bump **major** and provide a migration note.
- **Validate everything** you generate: run the validation scripts locally before opening a PR.
- Keep examples **small and representative**. No PII or production data.
- If unsure about semantics, open an issue and propose options with trade‑offs.

---

## Development Guidelines
- Language & tooling: **JSON/YAML** first. Supporting scripts in **TypeScript/Node** are allowed for validation & generation.
- **Formatting**: 2‑space indent for JSON/YAML; UTF‑8; LF line endings.
- **File layout** (top‑level folders):
  - `jsonschema/` – JSON Schemas (e.g., `project.json`, `component.json`, `record.json`)
  - `openapi/` – OpenAPI documents (split into `paths/`, `components/` or as a single `openapi.yaml`)
  - `mcp/` – MCP descriptor schemas (`tool.json`, `resource.json`, `prompt.json`) and examples
  - `examples/` – Valid example payloads (used in CI)
  - `scripts/` – Validation/build utilities
  - `package.json` – If publishing as an npm package
- **Naming**: kebab‑case for files; camelCase for JSON keys unless a spec demands otherwise.
- **References**: Use `$id` and `$ref` consistently; prefer absolute `$id` with stable versioned URIs (e.g., `https://schemas.auren.dev/component-1.0.json`).

---

## Versioning & Compatibility
- Use **SemVer** for the package and schema `$id`s:
  - **MAJOR** – backward incompatible (document breaking changes)
  - **MINOR** – new optional fields/elements
  - **PATCH** – corrections and clarifications
- Mark deprecated fields with `"deprecated": true` and document removal timelines.
- Maintain a **CHANGELOG.md** with a clear “Migration” section for MAJOR changes.

---

## Validation & Build
Provide npm scripts (or make targets) like:
- `npm run validate:schemas` – Validate all JSON Schemas with AJV (or similar).
- `npm run validate:examples` – Assert example payloads pass the relevant schemas.
- `npm run validate:openapi` – Lint with Spectral; check references.
- `npm test` – Run any unit tests for helper scripts and schema transforms.
- `npm run build` – Optional codegen (e.g., TS types from schemas).

AI agents must **run these commands** and include output in PRs when adding or modifying contracts.

---

## Pull Request Checklist
1. **Security** – No secrets/real endpoints; examples are synthetic.
2. **Formatting** – Prettier (2 spaces) applied to JSON/YAML.
3. **Validation** – All `validate:*` scripts pass.
4. **Versioning** – Bump package version or schema `$id` as needed; update CHANGELOG.
5. **Docs** – Update `README.md` and cross‑repo notes if behavior changes.
6. **Consumers** – Note any repo impacts (api, studio, portal, worker, docs).

---

## MCP Additions (for LLM agents)
- Define **MCP descriptor schemas** for `Tool`, `Resource`, and `Prompt` under `mcp/`.
- Supply examples for tools such as `create_project`, `create_component_from_yaml`, `list_components`, `create_record`.
- Ensure OpenAPI ↔ MCP mapping is documented (method, auth, request/response).

---

## Cross-Repository Collaboration

### Consumer Impact Assessment
Before making changes, **always assess downstream impact**:

1. **Identify affected consumers**:
   - `aurenworks-api` - API implementation and validation
   - `aurenworks-studio` - UI forms and data binding
   - `aurenworks-portal` - Runtime data handling
   - `aurenworks-worker` - Job processing and data transformation
   - `aurenworks-docs` - API documentation generation

2. **Breaking change protocol**:
   - Open issues in **all affected consumer repos** before merging
   - Provide migration guides and timeline
   - Coordinate releases across the ecosystem
   - Use `@aurenworks/team` mentions for visibility

3. **Schema evolution strategy**:
   - **Additive changes**: New optional fields (MINOR)
   - **Deprecation**: Mark with `"deprecated": true` + timeline
   - **Removal**: After 2+ MINOR versions, remove in MAJOR
   - **Breaking changes**: New MAJOR version + migration docs

### Cross-Repo Communication
- **Slack**: Use `#aurenworks-schemas` for coordination
- **GitHub**: Link related issues across repos with `Fixes #123 in aurenworks/api`
- **Releases**: Tag consumer teams in release notes
- **Documentation**: Update cross-repo READMEs when contracts change

## Communication & Collaboration
- Open an issue for any change that might break downstream consumers.
- In PRs, include: **Why**, **What**, **Schema diffs**, **Validation results**, and **Consumer impact**.
- Keep discussions focused on **contract semantics** and downstream impact.
- **Coordinate with consumer teams** before merging breaking changes.

**Non‑negotiables:** security, validation, backward compatibility, and consumer coordination.
