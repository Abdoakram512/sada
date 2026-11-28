# Feedback storage

The feedback section displays one embedded published Google Form directly, with a full-window fallback link. The duplicate quick form, tab switcher, POST endpoint and entry IDs have been removed. There is no separate feedback route.

Google Forms stores responses in the existing owner-linked private Google Sheet. All four questions are required: name, role, rating and feedback. The description says the name is required. No editor URL, response data or credentials belong in the frontend.

## Verification â€” 2026-11-28

- npm ci: passed, zero reported vulnerabilities.
- npm run build: passed.
- npm run lint: passed.
- No automated test script is defined.
- Existing published form: completing role, rating and feedback while leaving name empty blocked submission and displayed the required-question error at the name field.
- Adding a labelled technical test name allowed submission; Google displayed its recorded-response confirmation. Owner response count increased from 3 to 4.
- One labelled technical test response was added in this update.
- Responsive wrapper uses full width, wrapping fallback link and responsive iframe height. Published site visually verified at 390×844 and 1280×900. The section and fallback link fit both viewports; exactly one iframe and zero duplicate feedback buttons are present.
