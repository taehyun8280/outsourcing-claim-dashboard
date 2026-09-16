// 경량 정적 대시보드 샘플.
//
// ⚠️ 중요: 이 프리셋은 "정적(static)"입니다 — 실행되는 서버가 없습니다.
//    · 시크릿(비밀번호·API Key·DB 자격증명)을 이 코드(클라이언트)에 절대 넣지 마세요.
//      빌드 시 브라우저 번들에 그대로 박혀 누구나 F12로 볼 수 있습니다.
//    · DB·데이터 웨어하우스·외부 API 연결이 필요하면 이 프리셋이 아니라
//      '웹 서비스(web-next)' 또는 '데이터 분석(data-fastapi)' 프리셋을 사용하세요.
//
// 아래 데이터는 데모용 정적 값입니다. 실제로는 빌드 시점에 가진 공개 데이터만 사용하세요.

const stats = [
  { label: '오늘 방문', value: '1,284', delta: '+12%', up: true },
  { label: '처리 건수', value: '342', delta: '+4%', up: true },
  { label: '대기', value: '17', delta: '-8%', up: false },
];

const rows = [
  { name: '항목 A', value: 72 },
  { name: '항목 B', value: 48 },
  { name: '항목 C', value: 91 },
  { name: '항목 D', value: 33 },
];

export default function App() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{'outsourcing-claim-dashboard'} 대시보드</h1>
        <p className="mt-1 text-sm text-slate-500">
          퍼시스 사내 표준 경량 대시보드 (정적 · 외부 연결 없음)
        </p>
      </header>

      {/* 통계 카드 */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                s.up ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {s.delta}
            </p>
          </div>
        ))}
      </section>

      {/* 간단 막대 (외부 차트 라이브러리 없이 CSS 로) */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">항목별 현황</h2>
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-sm text-slate-600">{r.name}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand" style={{ width: `${r.value}%` }} />
              </div>
              <span className="w-10 shrink-0 text-right text-sm tabular-nums text-slate-500">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        차트가 필요하면 <code className="text-slate-500">npm i recharts</code> 로 추가할 수 있어요.
      </footer>
    </div>
  );
}
