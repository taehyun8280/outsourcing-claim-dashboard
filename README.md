# outsourcing-claim-dashboard

퍼시스 사내 표준 **경량 정적 대시보드** (Vite + React + Tailwind). 외부 연결 없이 화면을 보여주는 용도이며, 사내 Coolify의 nginx 컨테이너로 배포됩니다.

## 시작하기

```bash
npm install
npm run dev          # → http://localhost:5173
```

## 빌드 / 미리보기

```bash
npm run build        # dist/ 에 정적 파일 생성
npm run preview      # 빌드 결과 로컬 확인
```

## ⚠️ 이 프리셋의 제약 (중요)

이 프로젝트는 **정적(static)** 입니다 — 실행되는 서버가 없습니다.

- 시크릿(비밀번호·API Key·DB 자격증명)을 코드나 `VITE_*` 에 **넣을 수 없습니다.** 브라우저에 그대로 노출됩니다.
- DB·데이터 웨어하우스·외부 API 연결이 필요하면 이 프리셋이 아니라 다음을 사용하세요:
  - **웹 서비스** (`--type web-next`) — Next.js + API Routes
  - **데이터 분석** (`--type data-fastapi`) — FastAPI + pandas

## 배포하기 (사내 Coolify)

1. 이 저장소를 사내 GitLab 에 push
2. Coolify 에서 **Dockerfile** 빌드 방식으로 애플리케이션 생성
3. 포트 **8080**, Health Check Path **`/healthz`** 설정
4. (외부 호스팅 PaaS 는 사내 정책상 사용 불가 — Coolify 자체 호스팅만)

## 만들어진 것

- Vite 6 + React 19 + TypeScript
- Tailwind CSS (브랜드 색상 `brand` = `#2272eb`, Pretendard 폰트)
- 통계 카드 + CSS 막대 샘플 대시보드 (`src/App.tsx`)
- 비루트 nginx 정적 서빙 Dockerfile + `nginx.conf` (`/healthz` 포함)
- AI 코딩 지침 (`AGENTS.md`, `CLAUDE.md`)

---

문의: IT본부 AI추진팀
