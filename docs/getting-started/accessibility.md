---
title: Accessibility
category: Getting Started
order: 5
---

## Accessibility
We aim to make our software accessible to everyone, including those with vision, hearing, cognitive, or motor impairments. Having an accessible design allows people of all abilities to interact with, understand, and navigate our products. This means that components are [Perceivable, Operable, Understandable, and Robust](https://www.w3.org/TR/2016/NOTE-UNDERSTANDING-WCAG20-20161007/intro.html#introduction-fourprincs-head). It’s important for us to design and develop products that support a wide range of needs and experiences.

### Color Contrast

Our [default theme](#canvas) colors meet at least a [3:1](http://www.w3.org/TR/WCAG20-TECHS/G183.html) ratio between foreground and background, and our [high contrast theme](#canvas-high-contrast) colors maintain a minimum [4.5:1](http://www.w3.org/TR/WCAG20-TECHS/G18.html) ratio to ensure we comply with WCAG 2.1 AA contrast requirements. This ensures sufficient color contrast between elements so that users with low vision or color blindness can view and use our components.

### Keyboard Navigation

Some users are unable to use a mouse, and instead navigate through applications using tools such as a keyboard, mouth wand, or eye tracking software.  Our components are navigable using these technologies without mouse assistance.  Keyboard focus follows the page as an eye would scan it (top to bottom, left to right).  We also ensure that focus indication is clear and apparent so users are always aware of where their current keyboard focus is within the page.  Our components can be interacted with using [standard keystrokes](https://webaim.org/techniques/keyboard/#testing), so there is no need to learn any new shortcuts.

### Assistive Technologies

Our components are [tested in VoiceOver for Mac, and NVDA/JAWS for Windows](https://www.canvaslms.com/accessibility), which are the highest utilized screenreaders (according to [WebAim’s user survey](https://webaim.org/projects/screenreadersurvey7/)).  We utilize many different tools to ensure this compatibility, such as features from the Accessible Rich Internet Applications (WAI-ARIA or ARIA) specification to build functionality that is not available with native HTML, and alternative text for images/icons to ensure all users have the same experience when utilizing our components.

### Web Content Accessibility Guidelines (WCAG)

Instructure-UI targets WCAG 2.1 Level A and Level AA success criteria, and seeks to provide a highly usable experience for everyone.

For more information, see the following resources:

[WCAG 2.1](https://www.w3.org/TR/WCAG21/)

[ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/)

### Feedback

If you notice any issues with the accessibility of our components, please reach out by creating a [GitHub](https://github.com/instructure/instructure-ui) issue and help us make it better.
