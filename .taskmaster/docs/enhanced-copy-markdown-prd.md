# Enhanced Copy Markdown Feature - Product Requirements Document (PRD)

## Executive Summary

Enhance the current copy markdown functionality in the Nimiq VitePress theme to provide users with multiple copy options through a modern dropdown interface. The current single "Copy MD" button will be expanded into a comprehensive copy system with multiple formats and integrations.

## Current State Analysis

### Existing Implementation
- **Location**: `packages/nimiq-vitepress-theme/src/layout/PageContent.vue:40-47`
- **Composable**: `packages/nimiq-vitepress-theme/src/composables/useSourceCode.ts`
- **Current Functionality**:
  - Single "Copy MD" button that fetches and copies raw markdown content
  - Uses `@vueuse/core` clipboard functionality
  - Shows temporary "Copied!" state with checkmark icon
  - Positioned alongside "View Source" GitHub link

### Current Dependencies
- **Reka UI**: Already installed (`reka-ui: catalog:frontend`)
- **@vueuse/core**: Already installed for clipboard functionality
- **Vue 3**: Framework
- **UnoCSS**: For styling

## Product Requirements

### 1. Enhanced Copy Button System

#### 1.1 Primary Copy Button
- **Behavior**: Copy page markdown content (current functionality)
- **Visual**:
  - Icon changes from `i-nimiq:copy` to `i-nimiq:checkmark` when any copy action is successful
  - Button text shows "Copied!" temporarily after any copy operation
  - Returns to normal state after 2 seconds
- **Position**: Left side of the button group

#### 1.2 Dropdown Menu
- **Component**: Reka UI Dropdown Menu
- **Trigger**: Chevron-down button attached to the primary copy button
- **Position**: Right side of the primary copy button
- **Visual**: Card-like dropdown with shadows and rounded corners

#### 1.3 Dropdown Options

##### Option 1: Copy Markdown Link
- **Action**: Copy the current page URL in markdown link format: `[Page Title](URL)`
- **Icon**: `i-nimiq:link`
- **Label**: "Copy Markdown Link"

##### Option 2: View as Markdown
- **Action**: Redirect to GitHub source view (current "View Source" functionality)
- **Icon**: `i-nimiq:logos-github-mono`
- **Label**: "View as Markdown"
- **Behavior**: Opens in new tab

##### Option 3: Open in ChatGPT
- **Action**: Open ChatGPT with pre-filled message containing page content
- **Icon**: Custom ChatGPT icon (to be designed or sourced)
- **Label**: "Open in ChatGPT"
- **URL Format**: `https://chatgpt.com/?q=` + encoded message
- **Pre-filled Message**: "Analyze this documentation page: [Page Title]\n\n[Markdown Content]"

##### Option 4: Open in Claude
- **Action**: Open Claude.ai with pre-filled message containing page content
- **Icon**: Custom Claude icon (to be designed or sourced)
- **Label**: "Open in Claude"
- **URL Format**: `https://claude.ai/chat?q=` + encoded message
- **Pre-filled Message**: "Help me understand this documentation: [Page Title]\n\n[Markdown Content]"

### 2. Notification System

#### 2.1 Sonner Toast Integration
- **Library**: `@unocss/vue` (UnoVue) - Sonner notification component
- **Installation Required**: Yes, new dependency
- **Trigger**: All copy actions (primary button + dropdown options)
- **Message Variants**:
  - "Page content copied to clipboard"
  - "Markdown link copied to clipboard"
  - "Opening in ChatGPT..."
  - "Opening in Claude..."

#### 2.2 Visual Feedback
- **Duration**: 3 seconds
- **Position**: Top-right corner
- **Style**: Success toast with green accent
- **Animation**: Slide-in from right

### 3. Technical Requirements

#### 3.1 New Dependencies
```json
{
  "@unocss/vue": "latest", // For Sonner notifications
}
```

#### 3.2 Component Architecture
- **Enhanced Composable**: Extend `useSourceCode.ts` with new copy methods
- **New Methods**:
  - `copyMarkdownLink()`: Generate and copy markdown link
  - `openInChatGPT()`: Generate and open ChatGPT URL
  - `openInClaude()`: Generate and open Claude URL
  - `showToast(message)`: Display notification

#### 3.3 Reka UI Components Required
- **DropdownMenu**: Main dropdown container
- **DropdownMenuTrigger**: Chevron button
- **DropdownMenuContent**: Dropdown panel
- **DropdownMenuItem**: Individual options
- **DropdownMenuSeparator**: Optional visual separators

### 4. User Interface Specifications

#### 4.1 Button Group Layout
```
[Copy MD 🔗] [▼]
```
- Primary button: Rounded left corners only
- Dropdown trigger: Rounded right corners only, border-left removed
- Combined appearance as single button group

#### 4.2 Dropdown Menu Design
- **Width**: Min 200px, max-content
- **Max Height**: Scrollable if needed
- **Spacing**: 8px padding, 4px between items
- **Typography**: Nimiq design system text sizes
- **Icons**: 16px, left-aligned in each option

#### 4.3 Responsive Behavior
- **Mobile**: Stack vertically or show simplified dropdown
- **Tablet**: Full functionality
- **Desktop**: Full functionality with hover states

### 5. Content Generation Logic

#### 5.1 Markdown Link Format
```javascript
const pageTitle = document.title || page.value.title || 'Documentation Page'
const currentURL = window.location.href
const markdownLink = `[${pageTitle}](${currentURL})`
```

#### 5.2 AI Platform Messages
- **Character Limit**: Respect URL length limits (~2000 chars)
- **Content Truncation**: If markdown content > 1500 chars, truncate with "..." and add note
- **Encoding**: Proper URL encoding for special characters

### 6. Error Handling

#### 6.1 Copy Failures
- **Clipboard API not supported**: Show error toast
- **Network failures**: Graceful fallback for content fetching
- **Large content**: Warn user about truncation

#### 6.2 External Integrations
- **AI Platform Unavailable**: Still attempt to open, let platform handle errors
- **Invalid URLs**: Validate before opening

### 7. Accessibility Requirements

#### 7.1 Keyboard Navigation
- **Tab Order**: Primary button → Dropdown trigger → Dropdown items
- **Arrow Keys**: Navigate through dropdown options
- **Enter/Space**: Activate selected option
- **Escape**: Close dropdown

#### 7.2 Screen Reader Support
- **ARIA Labels**: Clear descriptions for all buttons
- **Live Regions**: Announce copy success to screen readers
- **Role Attributes**: Proper menu/menuitem roles

### 8. Implementation Phases

#### Phase 1: Core Infrastructure
- Install UnoVue Sonner dependency
- Create enhanced dropdown button group component
- Extend useSourceCode composable with new methods

#### Phase 2: Dropdown Menu
- Implement Reka UI dropdown menu
- Add all four copy/open options
- Implement copy feedback system

#### Phase 3: Notifications & Polish
- Integrate Sonner toast notifications
- Add proper error handling
- Implement accessibility features

#### Phase 4: Testing & Documentation
- Test across different page types and content sizes
- Verify mobile responsiveness
- Document new frontmatter options for customization

### 9. Success Metrics

#### 9.1 User Experience
- **Copy Success Rate**: >95% successful clipboard operations
- **User Adoption**: Track which copy options are most popular
- **Error Rate**: <2% of operations result in errors

#### 9.2 Technical Performance
- **Load Time Impact**: <50ms additional load time
- **Bundle Size**: <10KB increase in total theme size
- **Accessibility Score**: Maintain or improve current accessibility rating

### 10. Future Enhancements

#### 10.1 Additional AI Platforms
- **Gemini**: Google's AI platform integration
- **Perplexity**: Research-focused AI integration
- **Custom Prompts**: Allow users to configure AI platform messages

#### 10.2 Advanced Copy Options
- **Copy as HTML**: Convert markdown to HTML for copying
- **Copy Selection**: Allow users to copy only selected text
- **Export Options**: PDF, Word, or other format exports

### 11. Risk Assessment

#### 11.1 Technical Risks
- **Clipboard API Compatibility**: Some browsers may not support advanced clipboard features
- **Third-party Dependencies**: UnoVue Sonner stability and maintenance
- **Content Size Limits**: Large documentation pages may exceed URL limits

#### 11.2 Mitigation Strategies
- **Progressive Enhancement**: Provide fallbacks for unsupported features
- **Dependency Monitoring**: Regular updates and security audits
- **Content Intelligence**: Smart truncation and summarization for large content

---

## Reference Implementation

This PRD is inspired by the [Docus documentation theme](https://github.com/nuxt-content/docus/blob/main/layer/app/components/docs/DocsPageHeaderLinks.vue) implementation, adapted for the Nimiq UI ecosystem and enhanced with additional functionality.

## Approval Requirements

- [ ] UX/UI Design Review
- [ ] Technical Architecture Review
- [ ] Accessibility Compliance Check
- [ ] Performance Impact Assessment
- [ ] Security Review (external URL generation)