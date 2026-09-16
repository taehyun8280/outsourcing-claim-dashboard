import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 정적 빌드 → 사내 Coolify의 nginx 컨테이너에서 서빙.
// 외부 호스팅(Vercel 등)이나 외부 데이터 연결을 전제로 하지 않습니다.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
