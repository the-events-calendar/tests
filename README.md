# The Events Calendar E2E Tests

This repository contains end-to-end testing for The Events Calendar using TestFlow, a WordPress Plugin Testing Framework with Lando and Playwright.

## Overview

This project provides automated testing for The Events Calendar plugin across multiple environments and configurations. It uses TestFlow for environment management and Playwright for browser automation.

## Features

- 🚀 **Automated Environment Setup**: Uses Lando for consistent WordPress environments
- 🎭 **Playwright Integration**: Modern browser automation for E2E testing
- 🔌 **Plugin Source Management**: Automatic installation of The Events Calendar from WordPress.org
- 🗄️ **Matrix Testing**: Test across different PHP/MySQL/WordPress versions
- 🌍 **Multi-Configuration Support**: Parallel testing with selective execution
- 🔧 **WordPress Helpers**: Built-in utilities for WordPress testing tasks

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) (for Lando)
- [Lando](https://lando.dev/) (will be installed by CI)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tec-tests
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Verify installation:**
   ```bash
   bun run status
   ```

## Configuration

The project is configured via `testflow.yaml`:

- **WordPress Environment**: PHP 8.2, MySQL 8.0, WordPress 6.4
- **Plugin Source**: The Events Calendar from WordPress.org
- **Test Directory**: `tests/e2e/`
- **Matrix Testing**: Multiple PHP/WordPress version combinations

## Running Tests

### Local Development

```bash
# Run tests with default configuration
bun run test

# Run all matrix combinations
bun run test:matrix

# Run with debug mode
bun run test:debug

# Check TestFlow status
bun run status

# List available matrix configurations
bunx testflow matrix list
```

### Lando Environment Management

```bash
# Start Lando environment (requires Lando installed)
bun run lando:start

# Stop Lando environment
bun run lando:stop

# Destroy Lando environment
bun run lando:destroy
```

## Test Suite

The initial test suite includes:

### Installation & Activation Tests
- ✅ Plugin installation verification
- ✅ Plugin activation confirmation
- ✅ Admin menu presence check

### Admin Functionality Tests
- ✅ Event creation workflow
- ✅ Event management interface
- ✅ Settings page accessibility

### Frontend Tests
- ✅ Calendar view display
- ✅ List view functionality
- ✅ Event search capabilities

## Matrix Testing

The project supports testing across multiple configurations:

### Environment Configuration
- **WordPress**: 6.8 (latest)
- **PHP**: 8.2 (current stable)
- **MySQL**: 8.0 (latest stable)
- **Plugin**: The Events Calendar (from WordPress.org)

## GitHub Actions

The project uses specific workflows for different testing scenarios:

### Available Workflows

#### `basic-the-events-calendar.yml`
- **Purpose**: Tests basic TEC functionality 
- **Configuration**: WordPress 6.8, PHP 8.2, MySQL 8.0
- **Triggers**: PR to main, daily at 2 AM UTC, manual dispatch
- **Features**: Comprehensive E2E testing with The Events Calendar

### Common Features
- **Manual Triggers**: All workflows support manual dispatch with debug mode
- **Artifact Collection**: Test results and screenshots automatically uploaded
- **Clean Environments**: Lando environments destroyed after each run
- **Debug Mode**: Optional verbose logging via workflow dispatch input

### Usage

```bash
# Trigger tests manually with debug mode
# Go to Actions → Basic The Events Calendar Tests → Run workflow → Enable debug

# Tests run automatically on:
# - Pull requests to main branch
# - Daily at 2 AM UTC via scheduled run
```

## Project Structure

```
tec-tests/
├── .github/
│   └── workflows/
│       └── basic-the-events-calendar.yml     # TEC testing workflow
├── tests/
│   └── e2e/
│       └── events-calendar-installation.test.ts  # Main test file
├── testflow.yaml                # TestFlow configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Test Development

### Adding New Tests

1. Create new test files in `tests/e2e/`
2. Follow the existing test structure
3. Use descriptive test names and documentation
4. Include proper assertions and error handling

### Test Patterns

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('should do something specific', async ({ page }) => {
    // Test implementation
  });
});
```

### WordPress Helpers

The project includes built-in WordPress testing utilities:

```typescript
// Login to WordPress admin
await page.goto('/wp-admin/');
await page.fill('#user_login', 'admin');
await page.fill('#user_pass', 'admin123');
await page.click('#wp-submit');
```

## Debugging

### Local Debugging

```bash
# Run tests with debug output
bun run test:debug

# Check Lando logs
lando logs

# View TestFlow status
bun run status
```

### CI Debugging

1. Enable debug mode in GitHub Actions workflow
2. Review uploaded artifacts for detailed logs
3. Check Lando logs for environment issues

## Contributing

1. Create a feature branch
2. Add tests for new functionality
3. Ensure all tests pass locally
4. Submit a pull request

### Code Standards

- Follow WordPress coding standards for PHP-related tests
- Use ES6+ syntax for JavaScript/TypeScript
- Add proper docblocks with `@since TBD`
- Include descriptive test names and comments

## Troubleshooting

### Common Issues

1. **Lando not starting**: Ensure Docker is running
2. **Plugin not found**: Verify WordPress.org plugin slug
3. **Test timeouts**: Increase timeout values for slow operations
4. **Permission errors**: Check file permissions and Docker access

### Debug Steps

1. Check TestFlow status: `bun run status`
2. Verify Lando environment: `bun run lando:start`
3. Review test output for specific errors
4. Check GitHub Actions logs for CI issues

## Support

- 📖 [TestFlow Documentation](https://github.com/stellarwp/testflow)
- 🐛 [Issue Tracker](../../issues)
- 💬 [Discussions](../../discussions)

## License

MIT License - see LICENSE file for details. 