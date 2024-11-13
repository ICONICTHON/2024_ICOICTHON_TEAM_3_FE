import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // 외부 접속을 허용
    port: 5173,      // 5173번 포트에서 실행
  },
});
