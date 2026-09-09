import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

try {
  const toolsDir = path.resolve(__dirname, 'src/assets/tools');
  const files = fs.readdirSync(toolsDir);
  const info: Record<string, any> = {};
  for (const f of files) {
    const buf = fs.readFileSync(path.join(toolsDir, f));
    // PNG IHDR color type is at byte offset 25
    info[f] = { size: buf.length, colorType: buf[25] };
  }
  fs.writeFileSync(path.resolve(__dirname, 'src/assets/tools/info.json'), JSON.stringify(info, null, 2));
} catch (e) {}


export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/.aistudio/**', '**/*.mp4', '**/*.mov', '**/*.avi'],
      },
    },
  };
});
