import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function serveDevVoiceAuditions(): Plugin {
  const archiveRoot = path.resolve(process.cwd(), 'docs/voice-auditions-archive');
  return {
    name: 'sada-dev-voice-auditions',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = (req.url || '').split('?')[0];
        if (cleanUrl === '/audio/audition-manifest.json' || cleanUrl.startsWith('/audio/auditions/')) {
          const rel = cleanUrl.replace(/^\/audio\//, '');
          const abs = path.join(archiveRoot, rel);
          if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
            res.setHeader('Content-Type', abs.endsWith('.json') ? 'application/json; charset=utf-8' : 'audio/mpeg');
            fs.createReadStream(abs).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveDevVoiceAuditions()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
});
