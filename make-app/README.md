# Make.com App Development

This directory contains the Make.com app code that integrates with our backend service.

## Local Development

1. Install the Make.com VS Code extension
2. Open this directory in VS Code
3. Update the `base` URL in the app configuration to point to your deployed backend
4. Use the Make.com extension to publish changes:
   - Open the Command Palette (Cmd/Ctrl + Shift + P)
   - Select "Make: Deploy App"
   - Choose your target environment
   - Review and confirm the deployment

## Configuration

The app requires the following configuration:

- Update the `base` URL in the app configuration to match your deployed backend URL
- Ensure any required API keys or credentials are properly configured

## Resources

- [Make.com Apps SDK Documentation](https://developers.make.com/custom-apps-documentation/make-apps-editor/apps-sdk/local-development-for-apps/deploy-changes-from-local-app-to-make-app)
- [Local Development Guide](https://developers.make.com/custom-apps-documentation/make-apps-editor/apps-sdk/local-development-for-apps)

## Notes

- Keep sensitive credentials in `.secrets` file (gitignored)
- Test thoroughly in development environment before deploying to production
