# CLAUDE.md

본 프로젝트(`outsourcing-claim-dashboard`) 의 AI 작업 지침은 [`AGENTS.md`](./AGENTS.md) 를 참조해주세요.

## 가장 중요한 3가지 (반드시 준수)

1. **이 프로젝트는 정적(static) — 서버가 없습니다.** 시크릿(비밀번호·API Key·DB 자격증명)을 코드나 `VITE_*` 에 절대 넣지 마세요 (브라우저 노출됨). 데이터 연결이 필요하면 `web-next`/`data-fastapi` 프리셋으로 전환하세요.
2. **UI 는 Tailwind 우선**, 복잡하면 shadcn/ui 패턴으로 `src/components/` 에 추가.
3. **Coolify 표준 유지** — `nginx.conf` 의 `/healthz`, 8080 포트, 비루트 nginx, SPA fallback 을 깨뜨리지 마세요.

자세한 규칙은 `AGENTS.md` 에 정리되어 있어요.
