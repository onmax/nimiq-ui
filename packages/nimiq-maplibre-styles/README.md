# nimiq-maplibre-styles

MapLibre style definitions for Nimiq applications.

## Features

- Pre-configured map styles for Nimiq branding
- Light mode styling
- MapLibre GL compatible

## Usage

Import the style JSON in your MapLibre configuration:

```ts
import nimiqMapStyle from 'nimiq-maplibre-styles/nimiq-maplibre-light.json'

const map = new maplibregl.Map({
  style: nimiqMapStyle,
  // ...other options
})
```

## Available Styles

- `nimiq-maplibre-light.json` - Light theme map style

## License

MIT
