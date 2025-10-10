# Nimiq Icons

[Explorer](https://www.nimiq.com/developers/build/ui/design/icons).

This package is designed to retrieve and process icons from a Figma file, and subsequently package them in the Iconify format.

## How it works

The package connects to a Figma file, specified by the `FIGMA_FILE_ID` environment variable. It retrieves all top-level frames from a specific page, excluding those that start with an underscore.

Each frame's SVG for each icon is retrieved and processed to optimize the SVG code. The processed icons are then packaged in the Iconify format.

The naming convention for each icon in the package is `${frameName}-${iconName}`, where `frameName` is the name of the frame in Figma and iconName is the name of the icon in Figma. Please note that icons in the frame named 'icons' will not have the frame name as a prefix.

## Preview

You can preview the icons in the `apps/icons-ui` directory. This directory contains a Vue application that uses the nimiq-icons package and provides a visual interface to view all the icons.

## Environment Variables

The package uses the following environment variables for Figma integration:

```bash
FIGMA_FILE_ID: The ID of the Figma file
FIGMA_API_TOKEN: The API token for Figma
```

**Important:** These are ONLY required if you're actively working on updating icons from Figma. Most developers can ignore this - the icon build will automatically skip if credentials are not configured.

### Setup for Icon Development

1. Copy `.env.example` to `.env` in the `packages/nimiq-icons` directory
2. Get a Figma API token from https://www.figma.com/developers/api#access-tokens
3. Get the File ID from the Nimiq Figma file URL
4. Fill in the values in your `.env` file
5. Ensure you have access permissions to the Nimiq Figma file

### Troubleshooting

If you encounter a 404 error when running `pnpm dev`:

- **Don't need to update icons?** Delete the `.env` file - the build will skip automatically
- **Need to update icons?** Verify your credentials are correct and you have access to the Figma file

## Scripts

The package provides a dev script that you can run with `pnpm dev`. This script processes icons from Figma and generates the icon packages.
