---
title: "How to Check Color Contrast Ratio for WCAG Accessibility"
summary: "Learn how to verify if your text and background colors meet WCAG accessibility standards using contrast ratio calculators."
category: "tutorial"
tools: ["color-contrast-checker"]
keywords: ["how to check color contrast ratio for wcag accessibility compliance", "color contrast ratio", "WCAG compliance", "accessibility testing", "contrast checker", "web accessibility", "AA compliance", "AAA compliance"]
published_at: "2026-04-17"
---
# How to Check Color Contrast Ratio for WCAG Accessibility

Last month I redesigned a client's website with a beautiful light gray text on white background. Looked clean and modern. Then their accessibility audit came back flagged for contrast issues. Turns out "looks fine to me" isn't how accessibility works.

WCAG (Web Content Accessibility Guidelines) has specific numerical requirements for color contrast. You can't eyeball it. You need to actually measure the ratio between your text color and background color.

## What is a passing contrast ratio?

WCAG defines two levels: AA and AAA.

For normal text (under 18pt or under 14pt bold), you need:
- AA level: 4.5:1 minimum
- AAA level: 7:1 minimum

For large text (18pt and larger, or 14pt bold and larger), the requirements drop:
- AA level: 3:1 minimum
- AAA level: 4.5:1 minimum

Most websites aim for AA compliance. AAA is stricter and harder to achieve, especially with brand colors that weren't chosen with accessibility in mind.

Here's a real example. Black text (#000000) on white background (#FFFFFF) gives you 21:1, which passes everything easily. But that light gray I used (#CCCCCC) on white? Only 1.6:1. Fails completely.

## The fastest way to check contrast ratios

You need a contrast checker tool. I use [Color Contrast Checker](/tools/color-contrast-checker) because it runs in the browser without uploading anything, but there are several good options.

The process is simple:
1. Enter your text color (hex code, RGB, or HSL)
2. Enter your background color
3. The tool calculates the ratio instantly
4. It tells you if you pass AA or AAA for normal and large text

WebAIM also has a solid contrast checker that many developers use. It works the same way and gives you the same ratios. The math is standardized, so any proper tool will give identical results.

## How to find the exact colors on your website

This is where people get stuck. You need the actual hex codes or RGB values, not just "that blue we use."

If you're working in design tools like Figma or Adobe XD, the color values are right there in the properties panel. Copy them directly.

For existing websites, use your browser's developer tools:
1. Right-click the text element and choose "Inspect"
2. Look at the Styles panel
3. Find the `color` property for text and `background-color` for the background
4. The hex code or RGB value is right there

Chrome DevTools actually has a built-in contrast ratio indicator. When you click a color in the Styles panel, it shows you the contrast ratio and whether it passes WCAG AA. Handy for quick checks, though I still prefer dedicated tools for documentation.

## What if your colors fail?

You have three options: darken the text, lighten the background, or both.

I usually start by darkening text because it's less disruptive to the overall design. That light gray (#CCCCCC) I mentioned? Changing it to #767676 gives you 4.54:1, just barely passing AA for normal text.

Sometimes you can't change colors without breaking brand guidelines. I've been there. In those cases, you need to have a conversation with stakeholders about legal requirements. WCAG AA is required by law in many jurisdictions (ADA in the US, EAA in Europe). Brand colors can be adjusted.

One trick: use the failing color for large headings where the requirements are more lenient, and use a darker shade for body text. This preserves the brand feel while meeting compliance.

## Testing multiple color combinations efficiently

Real websites have dozens of color combinations. Navigation links, buttons, form labels, error messages, footer text. You can't manually check every single one.

I keep a spreadsheet of all color combinations used in a design system. Text color, background color, element type, and whether it passes. Takes an hour to set up initially, but then you have a reference for the entire project.

When you update a color, you only need to recheck the combinations that use it. Much faster than random spot-checking.

## Common mistakes I see

Using opacity instead of solid colors breaks everything. If you have black text at 50% opacity on a white background, you can't just check black against white. The actual rendered color is gray, and that's what you need to test.

To find the actual color, use your browser's color picker on the rendered element, or calculate it manually (which is annoying).

Another mistake: forgetting about hover states and focus indicators. That button might pass in its default state, but what about when someone hovers over it? Check every state.

## Do images and logos need to pass contrast requirements?

Text within images needs to meet contrast requirements. If you have a hero image with white text overlay, that text needs 4.5:1 contrast against the image background.

Logos are exempt. Your brand logo doesn't need to meet contrast ratios, even if it contains text. But any actual text content on your site does.

Icons used as text (like a magnifying glass for search) should meet contrast requirements. Decorative icons don't have to, but you should mark them as decorative in your code with `aria-hidden="true"`.

## Automated testing catches most issues

Once you understand contrast ratios, you can automate the checking. Tools like axe DevTools, WAVE, or Lighthouse will scan your entire page and flag contrast failures.

I run Lighthouse audits on every project. It's built into Chrome DevTools under the Lighthouse tab. The accessibility score includes contrast checking, and it tells you exactly which elements fail.

But automated tools can't catch everything. They might miss text on gradient backgrounds or complex image overlays. Manual checking with a contrast calculator is still necessary for tricky cases.

The math behind contrast ratios involves relative luminance calculations that I won't bore you with. The important part is that the standards are objective and measurable. You either pass or you don't.