# Lab 7 - Unit & E2E Testing

**Name:** Yannis Smith

## Check Your Understanding

1. Within a GitHub action that runs whenever code is pushed — this way tests run automatically on every change, catching bugs before they affect the main branch.

2. No — E2E tests check user-facing behavior in the browser, not individual function outputs. Unit tests are better for that.

3. Navigation mode analyzes the page right after it loads and gives overall performance metrics, but can't analyze interactions. Snapshot mode analyzes the page in its current state and is best for accessibility issues, but can't measure JS performance or DOM changes.

4. Three improvements based on Lighthouse:
   - Add alt text to images for better accessibility
   - Minimize/compress CSS and JS files to improve load performance
   - Add meta description tags to improve SEO score