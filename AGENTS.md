# AGENTS.md — AI 코딩 도구 작업 지침 (경량 정적 대시보드)

이 파일은 Claude Code 등 AI 코딩 도구가 본 프로젝트에서 작업할 때 따르는 규칙입니다. 본 프로젝트는 **퍼시스홀딩스 사내 표준 스캐폴드 `@fursys/create-app`** 의 **경량 대시보드(Vite)** 프리셋으로 생성되었고, 사내 Coolify 배포 정책을 따릅니다.

---

## 1. 프로젝트 정체

- **이름**: `outsourcing-claim-dashboard`
- **스택**: Vite 6 + React 19 + TypeScript + Tailwind CSS
- **형태**: **정적(static)** — 빌드된 HTML/JS/CSS 를 nginx 가 서빙. **실행 서버가 없습니다.**
- **배포**: 사내 Coolify (비루트 nginx 컨테이너, 8080 포트)
- **외부 호스팅 의존성**: 0 (Vercel 등 외부 호스팅 사용 금지 — 사내 정책)

---

## 2. 가장 중요한 제약 — "서버가 없다"

이 프리셋에는 시크릿을 안전하게 다룰 **서버가 없습니다.** 따라서:

### 절대 금지

- ❌ 코드나 `VITE_*` 환경변수에 시크릿(비밀번호·API Key·DB 자격증명·토큰) 넣기
  - `VITE_*` 는 빌드 시 브라우저 번들에 그대로 박혀 누구나 F12 로 볼 수 있어요 (= `NEXT_PUBLIC_*` 과 동일 위험)
- ❌ 클라이언트에서 DB·데이터 웨어하우스에 직접 접속
- ❌ 시크릿이 필요한 외부 API 를 브라우저에서 직접 호출

### 데이터 연결이 필요해지면

→ 이 프리셋으로는 **안전하게 불가능**합니다. 다음 중 하나로 전환하거나 별도 백엔드를 두세요:
- **웹 서비스**(`web-next`): Next.js + `pages/api/*` 에서 시크릿 처리
- **데이터 분석**(`data-fastapi`): FastAPI 서버에서 처리
- 또는 사내에 이미 있는 백엔드의 **공개 엔드포인트**만 `fetch`

`VITE_*` 에는 **공개해도 되는 값**(앱 제목, 공개 URL 등)만 두세요.

---

## 3. UI 작성 규칙

1. **Tailwind 유틸리티 우선** 으로 조립
2. 복잡한 컴포넌트가 필요하면 shadcn/ui 패턴(`React.forwardRef`)을 따라 `src/components/` 에 추가
3. 자체 CSS 는 마지막 수단 (`src/index.css` 의 `@layer` 정도)

### 디자인 토큰
- 브랜드 색상: `brand` (`bg-brand`, `text-brand`) = `#2272eb` (`tailwind.config.ts`)
- 폰트: Pretendard (`index.html` CDN)
- 반응형: 모바일 우선 (`sm:`, `md:`, `lg:`)

### 차트
- 기본 템플릿은 외부 차트 라이브러리 없이 CSS 로 막대를 그립니다.
- 본격적인 차트가 필요하면 `recharts` 를 추가하세요(`npm i recharts`).

### 금지
- ❌ `dangerouslySetInnerHTML` (XSS 위험). 꼭 필요하면 검증 후 주석으로 사유 명시

---

## 4. Coolify 배포 표준 유지

### 절대 깨뜨리지 말 것
- ✅ `Dockerfile` 의 2-stage 구조 유지 (build → nginx)
- ✅ `nginxinc/nginx-unprivileged` (비루트) 유지
- ✅ `nginx.conf` 의 **`/healthz`** 라우트 유지 (Coolify Health Check). 200 + `{"status":"ok"}`
- ✅ `listen 8080` / `EXPOSE 8080` 유지 (Coolify 포트 호환)
- ✅ SPA fallback (`try_files ... /index.html`) 유지

### Docker Compose 금지
사내 Coolify 정책상 `docker-compose.yml` 사용 불가. 추가 서비스가 필요하면 별도 Coolify Application 으로 분리.

---

## 5. 응답 톤 (AI 가 사람에게 답할 때)

본 프로젝트 사용자는 사내 비개발자 또는 주니어 가능성이 큽니다.

- **한국어로 응답**, 정중하고 부드러운 어조 (`~해주시면 좋아요`)
- 기술 용어는 풀어쓰기
- 위험한 작업(운영 환경 변경 등)은 명확히 경고 후 사용자 확인

---

## 6. 변경 시 함께 업데이트할 파일

| 변경 사항 | 함께 업데이트 |
|---------|-------------|
| 공개 환경변수 추가 | `.env.example` (`VITE_` + 주석) |
| 새 페이지/뷰 추가 | `README.md` 페이지 안내 |
| 의존성 추가 | `package.json` + `docker build` 확인 |
| nginx 설정 변경 | `nginx.conf` + Health Check 동작 확인 |

---

> 본 파일은 `@fursys/create-app` 스캐폴드가 자동 생성했어요. 프로젝트가 진화하면 규칙을 추가/갱신하셔도 좋습니다.
