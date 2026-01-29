import { useState, useEffect } from 'react'
import './CompoundCalculator.css'

const PERIOD_OPTIONS = [1, 2, 3, 5, 10, 15, 20, 30]
const RATE_UNITS = [
  { id: 'annual', label: '연', div: 1 },
  { id: 'monthly', label: '월', div: 12 },
  { id: 'daily', label: '일', div: 365 },
]

function CompoundCalculator() {
  const [rateValue, setRateValue] = useState(7)
  const [rateUnit, setRateUnit] = useState('annual')
  const [periodYears, setPeriodYears] = useState(10)
  const [principal, setPrincipal] = useState(1000)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const unit = RATE_UNITS.find((u) => u.id === rateUnit)
    if (!unit || rateValue == null || periodYears <= 0) {
      setResult(null)
      return
    }
    const r = Number(rateValue) / 100
    let annualRate
    if (rateUnit === 'annual') annualRate = r
    else if (rateUnit === 'monthly') annualRate = Math.pow(1 + r, 12) - 1
    else annualRate = Math.pow(1 + r, 365) - 1
    const finalAmount = principal * Math.pow(1 + annualRate, periodYears)
    const totalReturn = finalAmount - principal
    const cagr = (Math.pow(finalAmount / principal, 1 / periodYears) - 1) * 100
    setResult({
      finalAmount,
      totalReturn,
      cagr,
      yearlyData: Array.from({ length: periodYears + 1 }, (_, i) => ({
        year: i,
        amount: principal * Math.pow(1 + annualRate, i),
      }))
    })
  }, [rateValue, rateUnit, periodYears, principal])

  const formatNumber = (n) => new Intl.NumberFormat('ko-KR').format(Math.round(n))

  const handleReset = () => {
    setRateValue(7)
    setRateUnit('annual')
    setPeriodYears(10)
    setPrincipal(1000)
  }

  const handleScrollToResult = () => {
    const el = document.querySelector('#compound-calculator .calculator-result-panel')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="compound-calculator" className="calculator-container compound">
      <header className="calculator-header">
        <h1>🔄 복리 투자 계산기</h1>
        <p className="subtitle">수익률과 기간을 입력하면 투자 결과를 확인할 수 있습니다</p>
      </header>

      <div className="calculator-content">
        <div className="calculator-input-panel">
          <h2 className="panel-title panel-title-input">✏️ 입력하기</h2>
          <section className="input-section">
            <h2 className="section-title"><span className="section-icon" aria-hidden>📈</span> 수익률 (CAGR)</h2>
            <div className="rate-input-row">
              <input
                type="number"
                className="form-input"
                value={rateValue}
                onChange={(e) => setRateValue(Number(e.target.value) || 0)}
                min="0"
                step="0.1"
              />
              <span className="input-suffix">%</span>
            </div>
            <div className="unit-buttons">
              {RATE_UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className={`unit-btn ${rateUnit === u.id ? 'active' : ''}`}
                  onClick={() => setRateUnit(u.id)}
                >
                  {u.label}단위
                </button>
              ))}
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title"><span className="section-icon" aria-hidden>📅</span> 투자 기간</h2>
            <div className="period-buttons">
              {PERIOD_OPTIONS.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`period-btn ${periodYears === y ? 'active' : ''}`}
                  onClick={() => setPeriodYears(y)}
                >
                  {y}년
                </button>
              ))}
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title"><span className="section-icon" aria-hidden>💰</span> 투자 원금 (만원)</h2>
            <div className="rate-input-row">
              <input
                type="number"
                className="form-input"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                min="0"
              />
              <span className="input-suffix">만원</span>
            </div>
          </section>

          <div className="calc-btn-group">
            <button type="button" className="btn btn-primary" onClick={handleScrollToResult}>
              계산하기
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              초기화
            </button>
          </div>
        </div>

        <div className="calculator-result-panel">
          <h2 className="panel-title panel-title-result">📊 결과보기</h2>
          <section className="result-section">
            <h2 className="section-title"><span className="section-icon" aria-hidden>📋</span> 투자 결과</h2>
            {result ? (
              <>
                <div className="result-cards">
                  <div className="result-card">
                    <div className="result-label">최종 자산</div>
                    <div className="result-value primary">{formatNumber(result.finalAmount)}만원</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">총 수익</div>
                    <div className="result-value">{formatNumber(result.totalReturn)}만원</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">연환산 수익률</div>
                    <div className="result-value">{result.cagr.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="yearly-table-wrap">
                  <table className="yearly-table">
                    <thead>
                      <tr>
                        <th>연차</th>
                        <th>잔액 (만원)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((row) => (
                        <tr key={row.year}>
                          <td>{row.year}년</td>
                          <td>{formatNumber(row.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="result-placeholder">수익률과 기간을 입력하세요.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default CompoundCalculator
