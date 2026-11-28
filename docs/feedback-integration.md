# Feedback storage

The current site is a project presentation with illustrative assessment demos. It has no account registration or child-record backend. This integration collects website feedback only; it must not collect child or health records.

Both feedback tabs use one published Google Form: optional name, required role, required rating (1–5), and required feedback. The owner has linked a private Google Sheets response destination through Forms. Email collection, sign-in requirement, and public response summaries were disabled when configured. Do not enable public response summaries or publish the response sheet.

`src/data/feedbackConfig.ts` contains only public respondent endpoints and field IDs. Editor links and response-sheet links must not be added to frontend code. If a question is deleted/recreated, re-check its field ID and perform a labelled test submission before deploying.

The quick form uses a native HTTPS POST in a new tab. Feedback is not placed in URL query parameters or stored in browser storage. Google validates and acknowledges the submission on its own page. The site deliberately does not show a saved-success state, since it cannot read Google's cross-origin result. If popups are blocked or Google rejects the submission, the user can retry with the retained text or use the embedded Google Form / full-window link. No credentials, Apps Script deployment, or server secrets are required.

## Verification (2026-11-28)

- `npm ci`: passed; audit reported zero vulnerabilities.
- `npm run build`: passed (TypeScript and Vite production build).
- `npm run lint`: passed (oxlint).
- No test script is defined in package.json.
- Published Google Form: submitted a clearly labelled technical test and verified it in the owner's response dashboard.
- Quick website form: empty required message blocked submission without displaying a status; populated form submitted successfully and Google's confirmation was observed. Tested Arabic plus `&` and `+`, role selection, and non-default rating.
- Embedded form loaded with all four questions; full-window link points to the published respondent form.
- Desktop layout inspected in the browser; existing site identity and animation code are unchanged.
- Mobile verification remains incomplete: the browser viewport override did not change the measured desktop viewport, and subsequent native browser control was stopped because the tool could not verify the current URL. No mobile pass is claimed.

Two clearly labelled technical test responses were submitted during verification. Keep or remove them through the owner's Forms dashboard as appropriate; they are not real visitor feedback.
