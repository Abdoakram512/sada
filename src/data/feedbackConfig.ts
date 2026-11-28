// Public respondent endpoints only. Never add editor links, credentials, or response data here.
const formBase = 'https://docs.google.com/forms/d/e/1FAIpQLSd7vgeQGLH3Qp0rsWIb17Vd3uDmVjF6cjNiR2_UjuBbQCGlWQ';

export const FEEDBACK_CONFIG = {
  googleFormUrl: `${formBase}/viewform`,
  submitUrl: `${formBase}/formResponse`,
  fields: {
    name: 'entry.2140136021',
    role: 'entry.113083260',
    rating: 'entry.355970353',
    message: 'entry.1211818827',
  },
};
