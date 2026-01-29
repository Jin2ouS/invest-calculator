import { useState, useEffect } from 'react'
import './WinRateCalculator.css'

function WinRateCalculator() {
  const [winRate, setWinRate] = useState(50)
  const [riskReward, setRiskReward] = useState(2)
  const [trades, setTrades] = useState(20)
  const [riskPerTrade, setRiskPerTrade] = useState(1)
  const [mdd, setMdd] = useState(20)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const wr = Number(winRate) / 100
    const rr = Number(riskReward)
    const n = Number(trades) || 1
    const rpt = Number(riskPerTrade) / 100

    const winTrades = wr * n
    const loseTrades = n - winTrades
    const avgReturnPerTrade = wr * rr - (1 - wr) * 1
    const totalReturnPct = avgReturnPerTrade * n * rpt
    const expectancy = avgReturnPerTrade * rpt * 100

    const mddVal = Number(mdd) / 100
    const recoveryNeeded = mddVal === 0 ? 0 : (1 / (1 - mddVal) - 1) * 100

    setResult({
      winTrades: Math.round(winTrades * 10) / 10,
      loseTrades: Math.round(loseTrades * 10) / 10,
      expectancy: expectancy.toFixed(1),
      totalReturnPct: totalReturnPct.toFixed(1),
      recoveryNeeded: recoveryNeeded.toFixed(1),
    })
  }, [winRate, riskReward, trades, riskPerTrade, mdd])

  return (
    <div id="winrate-calculator" className="calculator-container winrate">
      <header className="calculator-header">
        <h1>🎯 승률 손익비 계산기</h1>
        <p className="subtitle">승률과 손익비에 따른 기대 수익, MDD 만회 수익률을 확인하세요</p>
      </header>

      <div className="calculator-content">
        <div className="calculator-input-panel">
          <section className="input-section">
            <h2 className="section-title">승률 (%)</h2>
            <div className="input-row">
              <input
                type="number"
                className="form-input"
                value={winRate}
                onChange={(e) => setWinRate(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                min="0"
                max="100"
              />
              <span className="input-suffix">%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={winRate}
              onChange={(e) => setWinRate(Number(e.target.value))}
              className="range-input"
            />
          </section>

          <section className="input-section">
            <h2 className="section-title">손익비 (승리 시 수익 / 패배 시 손실)</h2>
            <div className="input-row">
              <input
                type="number"
                className="form-input"
                value={riskReward}
                onChange={(e) => setRiskReward(Math.max(0.1, Number(e.target.value) || 0))}
                min="0.1"
                step="0.1"
              />
              <span className="input-desc">: 1</span>
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title">거래 횟수</h2>
            <div className="input-row">
              <input
                type="number"
                className="form-input"
                value={trades}
                onChange={(e) => setTrades(Math.max(1, Number(e.target.value) || 0))}
                min="1"
              />
              <span className="input-suffix">회</span>
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title">거래당 위험 (원금 대비 %)</h2>
            <div className="input-row">
              <input
                type="number"
                className="form-input"
                value={riskPerTrade}
                onChange={(e) => setRiskPerTrade(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                min="0"
                max="100"
                step="0.5"
              />
              <span className="input-suffix">%</span>
            </div>
          </section>

          <section className="input-section">
            <h2 className="section-title">MDD (최대 낙폭, %)</h2>
            <div className="input-row">
              <input
                type="number"
                className="form-input"
                value={mdd}
                onChange={(e) => setMdd(Math.min(99, Math.max(0, Number(e.target.value) || 0)))}
                min="0"
                max="99"
              />
              <span className="input-suffix">%</span>
            </div>
            <p className="input-hint">MDD 발생 시 원금 회복에 필요한 수익률을 계산합니다.</p>
          </section>
        </div>

        <div className="calculator-result-panel">
          <section className="result-section">
            <h2 className="section-title">계산 결과</h2>
            {result ? (
              <>
                <div className="result-cards">
                  <div className="result-card">
                    <div className="result-label">승리 거래</div>
                    <div className="result-value">{result.winTrades}회</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">패배 거래</div>
                    <div className="result-value">{result.loseTrades}회</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">거래당 기대값</div>
                    <div className="result-value primary">{result.expectancy}%</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">총 기대 수익률</div>
                    <div className="result-value">{result.totalReturnPct}%</div>
                  </div>
                </div>
                <div className="mdd-recovery-card">
                  <h3 className="recovery-title">MDD 만회 필요 수익률</h3>
                  <p className="recovery-desc">
                    {mdd}% 하락 후 원금을 회복하려면 <strong>{result.recoveryNeeded}%</strong> 수익이 필요합니다.
                  </p>
                </div>
              </>
            ) : (
              <p className="result-placeholder">승률과 손익비를 입력하세요.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default WinRateCalculator
