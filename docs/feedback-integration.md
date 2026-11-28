# Feedback integration

One native SADA feedback form replaces the Google Forms iframe. No Google form interface or branding is embedded in the site. Name, role, rating and message submit via a native HTTPS POST to the existing published form. The name is required both locally (including whitespace validation) and in Google Forms.

Submission opens Google's confirmation in a new tab. The site cannot read the cross-origin result and deliberately does not claim that a response was saved. Values remain in the native form so the visitor can retry. A direct fallback link appears after submission. No hidden iframe, fetch with no-cors, credentials, local storage or false success state is used.

The existing field IDs were verified in the earlier integration. The existing form and private response destination remain unchanged. The prior update verified that an empty name is rejected and a complete response is stored. This update was authored through the GitHub connector without controlling the user's computer. Build/deployment checks must be verified remotely; no local browser or build is claimed.
