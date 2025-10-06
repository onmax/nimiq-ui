# Layout Types

The Nimiq VitePress theme provides three distinct layout types to accommodate different content needs and use cases. Each layout offers a unique combination of navigation elements, content structure, and styling approach.

## Overview

| Layout       | Use Case            | Sidebar | Secondary Sidebar | Breadcrumbs | Container     | Static Content CSS |
| ------------ | ------------------- | ------- | ----------------- | ----------- | ------------- | ------------------ |
| **docs**     | Documentation pages | ✅      | ✅                | ✅          | ✅ Padded     | ❌                 |
| **home**     | Landing pages       | ❌      | ❌                | ❌          | ❌            | ❌                 |
| **overview** | Module entry pages  | ✅      | ❌                | ❌          | ❌ Full-width | ✅                 |

## Documentation Layout (Default)

The standard layout for documentation pages with full navigation features and optimized reading experience.

### Features

- **Primary sidebar** with navigation menu
- **Secondary sidebar** with table of contents and widgets
- **Breadcrumbs** navigation at the top
- **Page actions** (Copy MD, View Source buttons)
- **Container padding** for optimal reading width
- **Responsive design** with mobile navigation

### Usage

```yaml
---
# Default layout - no layout specified
title: Documentation Page
---

# Your Documentation Content

This will render with the full documentation layout including sidebars, breadcrumbs, and page actions.
```

### Best For

- API documentation
- Guides and tutorials
- Reference materials
- Technical documentation

## Home Layout

A clean, minimal layout designed for landing pages and home screens.

### Features

- **No sidebars** for clean presentation
- **Desktop header** with navigation
- **No breadcrumbs** or page actions
- **Mobile navigation** at the bottom
- **Full creative control** over layout

### Usage

```yaml
---
layout: home
title: Welcome to Our Documentation
---

# Welcome

Landing page content with full design freedom.
```

### Best For

- Project landing pages
- Welcome screens
- Marketing content
- Overview dashboards

## Overview Layout

Perfect for module entry pages that need navigation but maximum content flexibility.

### Features

- **Primary sidebar** for navigation context
- **No secondary sidebar** for clean content area
- **No breadcrumbs** or page actions for minimal UI
- **Full-width content** without container constraints
- **Static content CSS** for enhanced typography and sections
- **Mobile navigation** with outline accordion

### Usage

```yaml
---
layout: overview
title: Module Overview
---

# Module Name

<section bg-neutral-100>
<h2>Getting Started</h2>
<p>This content uses static-content CSS for enhanced typography and section styling.</p>
</section>

<section bg-darkblue>
<h2>Features</h2>
<p>Full-width sections with fluid spacing and typography.</p>
</section>
```

### Best For

- Module landing pages
- Feature overviews
- Product showcases
- Marketing sections within documentation

## Customizing Layouts

### Sidebar Control

All layouts support sidebar customization via frontmatter:

```yaml
---
layout: overview
sidebar: false # Hide the primary sidebar
---
```

```yaml
---
layout: docs
secondarySidebar: false # Hide the secondary sidebar only
---
```

## Static Content CSS

The overview layout automatically imports the static-content CSS module which provides:

### Enhanced Typography

- Fluid font sizing that scales with viewport
- Optimized line heights and spacing
- Consistent heading hierarchy

### Section Styling

- Automatic section padding and margins
- Background color transitions
- Responsive spacing system

### Usage Examples

```html
<!-- Fluid sections with automatic spacing -->
<section bg-neutral-100>
  <h1>Main Heading</h1>
  <p>Automatic typography scaling</p>
</section>

<section bg-darkblue>
  <h2>Feature Section</h2>
  <p>Enhanced section spacing</p>
</section>

<!-- Wide sections without constraints -->
<section nq-wide bg-neutral-0>
  <h2>Full Width Content</h2>
</section>
```

## Responsive Behavior

### Desktop (≥1224px)

- **docs**: Full sidebar layout with secondary sidebar
- **home**: Header navigation with full content
- **overview**: Sidebar + full-width main content

### Mobile/Tablet (<1224px)

- **docs**: Collapsible navigation with bottom mobile nav
- **home**: Mobile nav at bottom
- **overview**: Outline accordion + mobile nav at bottom

## Migration Guide

### From docs to overview

```yaml
# Before
---
layout: docs # or no layout specified
title: Module Guide
---

# After
---
layout: overview
title: Module Guide
---
```

This changes:

- ❌ Removes secondary sidebar and breadcrumbs
- ❌ Removes container padding
- ✅ Adds static-content CSS styling
- ✅ Enables full-width design flexibility

### From home to overview

```yaml
# Before
---
layout: home
title: Module Landing
---

# After
---
layout: overview
title: Module Landing
---
```

This changes:

- ✅ Adds primary sidebar for navigation
- ✅ Adds static-content CSS styling
- ✅ Maintains clean, container-free design
