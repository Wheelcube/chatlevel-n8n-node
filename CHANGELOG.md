# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-09

### Added
- Enhanced device selection interface with two options:
  - Select device from dynamic list
  - Manual device ID input
- Improved error handling for API requests
- New resourceLocator implementation for device selection

### Changed
- Consolidated webhook trigger nodes into a single node with multi-select event options
- Updated API credentials handling for better security
- Improved TypeScript type definitions

## [0.1.0] - 2025-11-09

### Added
- Initial release of n8n-nodes-chatlevel
- Support for Message operations:
  - Send Text messages
  - Send Media (image, video, document, audio)
  - Send Template messages
  - Get message details
  - Get multiple messages with filters
- Support for Contact operations:
  - Create contacts
  - Get contact details
  - Get multiple contacts
  - Update contact information
  - Delete contacts
- Support for Media operations:
  - Upload media files
  - Get media details
  - Download media files
- Support for Template operations:
  - Get template details
  - List all templates
- Support for Webhook operations:
  - Create webhooks
  - Get webhook details
  - Update webhook configuration
  - Delete webhooks
- ChatLevel API credentials with API key authentication
- Comprehensive documentation and examples
- MIT License

### Security
- API key stored securely using n8n's credential system
- All API requests use HTTPS

## [Unreleased]

### Planned
- Support for group messaging
- Bulk messaging capabilities
- Message scheduling
- Analytics and reporting endpoints
- Advanced filtering options
- Conversation management
- Auto-reply rules
- Integration with n8n trigger nodes for real-time message handling
