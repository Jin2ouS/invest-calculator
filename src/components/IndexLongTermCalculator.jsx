import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './IndexLongTermCalculator.css'

const PERIOD_OPTIONS = [1, 3, 5, 10, 20, 30]
const INDEX_OPTIONS = [
  { id: 'sp500', label: 'S&P 500' },
  { id: 'nasdaq', label: '나스닥' },
  { id: 'schd', label: 'SCHD' },
  { id: 'kospi', label: '코스피' },
  { id: 'kosdaq', label: '코스닥' },
]
const PURCHASE_METHODS = [
  { id: 'dca', label: '분할매수' },
  { id: 'lump', label: '일괄매수' },
]

const getYearMonthFromMonths = (monthsFromBase) => {
  const baseYear = 2000
  const baseMonth = 1
  const totalMonths = baseYear * 12 + (baseMonth - 1) + monthsFromBase
  const y = Math.floor(totalMonths / 12)
  const m = (totalMonths % 12) || 12
  return { year: y, month: m }
}

const getMonthsFromYearMonth = (year, month) => {
  const baseYear = 2000
  const baseMonth = 1
  return (year - baseYear) * 12 + (month - baseMonth)
}

function IndexLongTermCalculator() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const minMonths = getMonthsFromYearMonth(2000, 1)
  const maxMonths = getMonthsFromYearMonth(currentYear, currentMonth)

  const [periodYears, setPeriodYears] = useState(5)
  const [startMonths, setStartMonths] = useState(getMonthsFromYearMonth(currentYear - 5, 1))
  const [endMonths, setEndMonths] = useState(getMonthsFromYearMonth(currentYear, currentMonth))
  const [indexId, setIndexId] = useState('sp500')
  const [purchaseMethod, setPurchaseMethod] = useState('dca')
  const [calculated, setCalculated] = useState(false)

  const startYM = getYearMonthFromMonths(startMonths)
  const endYM = getYearMonthFromMonths(endMonths)
  const durationMonths = Math.max(0, endMonths - startMonths)

  const handlePeriodChange = (years) => {
    setPeriodYears(years)
    const end = getMonthsFromYearMonth(currentYear, currentMonth)
    const start = end - years * 12
    setStartMonths(Math.max(minMonths, start))
    setEndMonths(end)
  }

  const handleStartChange = (e) => {
    const v = Number(e.target.value)
    setStartMonths(v)
    if (v >= endMonths) setEndMonths(Math.min(maxMonths, v + periodYears * 12))
  }

  const handleEndChange = (e) => {
    const v = Number(e.target.value)
    setEndMonths(v)
    if (v <= startMonths) setStartMonths(Math.max(minMonths, v - periodYears * 12))
  }

  // 샘플 수익률/MDD (실제로는 API 또는 히스토리 데이터 연동)
  const sampleReturnPct = 10
  const sampleMDD = -20
  const sampleCagr = durationMonths >= 12
    ? (Math.pow(1 + sampleReturnPct / 100, 12 / (durationMonths / 12)) - 1) * 100
    : 0

  const handleCalculate = () => setCalculated(true)

  const yearsCount = Math.floor(durationMonths / 12) || 1
  const chartData = Array.from({ length: yearsCount + 1 }, (_, i) => {
    const value = 100 * Math.pow(1 + sampleReturnPct / 100, i)
    return { year: startYM.year + i, value: Math.round(value * 10) / 10 }
  })

  const formatNumber = (n) => new Intl.NumberFormat('ko-KR').format(Math.round(n))

  return (
    <div id="index-longterm-calculator" className="calculator-container index-longterm">
      <header className="calculator-header">
        <h1>📈 지수 장투 계산기</h1>
        <p className="subtitle">투자 기간과 지수를 선택해 수익률·MDD를 확인하세요</p>
      </header>

      <div className="calculator-content">
        <div className="calculator-input-panel">
          <section className="input-section">
            <h2 className="section-title">투자 기간</h2>
            <div className="period-buttons">
              {PERIOD_OPTIONS.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`period-btn ${periodYears === y ? 'active' : ''}`}
                  onClick={() => handlePeriodChange(y)}
                >
                  {y}년
                </button>
              ))}
            </div>

            <div className="range-section">
              <label className="input-label">시작 시점</label>
              <input
                type="range"
                min={minMonths}
                max={maxMonths}
                value={startMonths}
                onChange={handleStartChange}
                className="range-input"
              />
              <div className="range-value">
                {startYM.year}년 {startYM.month}월
              </div>
            </div>
            <div className="range-section">
              <label className="input-label">종료 시점</label>
              <input
                type="range"
                min={minMonths}
                max={maxMonths}
                value={endMonths}
                onChange={handleEndChange}
                className="range-input"
              />
              <div className="range-value">
                {endYM.year}년 {endYM.month}월
              </div>
            </div>
            <div className="duration-display">
              실제 기간: {Math.floor(durationMonths / 12)}년 {durationMonths % 12}개월
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title">대상 지수</h2>
            <div className="index-options">
              {INDEX_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`index-btn ${indexId === opt.id ? 'active' : ''}`}
                  onClick={() => setIndexId(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title">매수 방법</h2>
            <div className="purchase-options">
              {PURCHASE_METHODS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`purchase-btn ${purchaseMethod === opt.id ? 'active' : ''}`}
                  onClick={() => setPurchaseMethod(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <button type="button" className="index-calc-btn" onClick={handleCalculate}>
            계산하기
          </button>
        </div>

        <div className="calculator-result-panel">
          <section className="result-section">
            <h2 className="section-title">분석 결과</h2>
            {calculated ? (
              <>
                <div className="result-cards">
                  <div className="result-card">
                    <div className="result-label">기간 수익률</div>
                    <div className="result-value primary">{sampleReturnPct.toFixed(1)}%</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">CAGR (연환산)</div>
                    <div className="result-value">{sampleCagr.toFixed(1)}%</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">MDD (최대 낙폭)</div>
                    <div className="result-value negative">{sampleMDD.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="index-chart-wrap">
                  <h3 className="chart-title">기간별 수익 추이 (지수 100 기준)</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" tickFormatter={(v) => `${v}`} />
                      <Tooltip formatter={(v) => [v, '지수']} labelFormatter={(y) => `${y}년`} />
                      <Line type="monotone" dataKey="value" stroke="#667eea" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="result-note">
                  * 위 수치는 해당 지수·기간의 예시이며, 실제 데이터 연동 시 정확한 값으로 표시됩니다.
                </p>
              </>
            ) : (
              <p className="result-placeholder">좌측에서 조건을 선택한 뒤 「계산하기」를 눌러주세요.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default IndexLongTermCalculator
