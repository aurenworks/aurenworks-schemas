# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure and collaboration guidelines
- Cross-repository coordination protocols
- Validation and build tooling setup

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [1.0.0] - 2025-01-XX

### Added
- Initial release of AurenWorks schemas
- JSON Schema definitions for core entities
- OpenAPI specifications for control-plane API
- MCP descriptor schemas for LLM integrations
- Validation tooling and CI/CD pipeline

---

## Breaking Changes

### Migration Guide

When breaking changes are introduced, this section will contain:

1. **What changed**: Description of the breaking change
2. **Why it changed**: Rationale for the change
3. **Migration steps**: Step-by-step guide for consumers
4. **Timeline**: When the change takes effect
5. **Consumer impact**: Which repositories are affected

### Example Migration Entry

```markdown
## [2.0.0] - 2025-XX-XX

### Breaking Changes

#### Project Schema - Removed `legacyId` field

**What changed**: The `legacyId` field has been removed from the Project schema.

**Why it changed**: The field was deprecated in v1.5.0 and is no longer used by any consumers.

**Migration steps**:
1. Remove any references to `project.legacyId` in your code
2. Use `project.id` instead (available since v1.0.0)
3. Update validation logic to remove `legacyId` checks

**Timeline**: 
- Deprecated: v1.5.0 (2024-XX-XX)
- Removed: v2.0.0 (2025-XX-XX)

**Consumer impact**:
- `aurenworks-api`: Update Project model validation
- `aurenworks-studio`: Remove legacyId from UI forms
- `aurenworks-portal`: Update runtime data handling
```

---

## Consumer Update Checklist

When releasing breaking changes, ensure:

- [ ] All affected consumer repositories have been notified
- [ ] Migration guides are provided for each consumer
- [ ] Timeline is communicated to all teams
- [ ] Cross-repository issues are created and linked
- [ ] Documentation is updated across all repos
- [ ] Integration tests pass with new schemas
- [ ] Release notes include consumer impact summary

---

## Version History

| Version | Date | Breaking Changes | Consumer Impact |
|---------|------|------------------|-----------------|
| 1.0.0 | 2025-XX-XX | None | Initial release |
| 2.0.0 | TBD | TBD | TBD |

---

## Support

For questions about breaking changes or migration assistance:

- **Slack**: `#aurenworks-schemas`
- **GitHub Issues**: [aurenworks-schemas/issues](https://github.com/aurenworks/aurenworks-schemas/issues)
- **Email**: schemas@aurenworks.com
