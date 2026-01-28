import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import './AssetReview.css'

function AssetReview() {
  const [assets, setAssets] = useState({
    cash: 0,
    stocks: 0,
    realEstate: 0,
    bonds: 0,
    other: 0
  })

  const [expenses, setExpenses] = useState({
    housing: 0,
    food: 0,
    transport: 0,
    communication: 0,
    insurance: 0,
    other: 0
  })

  const clampNumber = (value) => {
    const num = Number(value)
    if (!Number.isFinite(num)) return 0
    return Math.max(0, num)
  }

  const handleAssetChange = (category, value) => {
    setAssets(prev => ({
      ...prev,
      [category]: clampNumber(value)
    }))
  }

  const handleExpenseChange = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: clampNumber(value)
    }))
  }

  const formatNumber = (num) => new Intl.NumberFormat('ko-KR').format(num)

  const STEP_AMOUNT_MANWON = 10
  const adjustAsset = (category, delta) => {
    setAssets(prev => ({
      ...prev,
      [category]: Math.max(0, (prev[category] || 0) + delta * STEP_AMOUNT_MANWON)
    }))
  }

  const adjustExpense = (category, delta) => {
    setExpenses(prev => ({
      ...prev,
      [category]: Math.max(0, (prev[category] || 0) + delta * STEP_AMOUNT_MANWON)
    }))
  }

  // 자산 합계 계산
  const totalAssets = Object.values(assets).reduce((sum, val) => {
    return sum + (val || 0)
  }, 0)

  // 지출 합계 계산
  const totalExpenses = Object.values(expenses).reduce((sum, val) => {
    return sum + (val || 0)
  }, 0)

  // 월 지출 계산
  const monthlyExpenses = totalExpenses

  // 자산 카테고리별 비율 계산
  const assetCategories = [
    { key: 'cash', label: '현금', value: assets.cash },
    { key: 'stocks', label: '주식', value: assets.stocks },
    { key: 'realEstate', label: '부동산', value: assets.realEstate },
    { key: 'bonds', label: '채권', value: assets.bonds },
    { key: 'other', label: '기타', value: assets.other }
  ].filter(item => (item.value || 0) > 0)

  // 지출 카테고리별 비율 계산
  const expenseCategories = [
    { key: 'housing', label: '주거비', value: expenses.housing },
    { key: 'food', label: '식비', value: expenses.food },
    { key: 'transport', label: '교통비', value: expenses.transport },
    { key: 'communication', label: '통신비', value: expenses.communication },
    { key: 'insurance', label: '보험', value: expenses.insurance },
    { key: 'other', label: '기타', value: expenses.other }
  ].filter(item => (item.value || 0) > 0)

  const assetPieData = assetCategories.map((c) => ({ name: c.label, value: c.value || 0 }))
  const expensePieData = expenseCategories.map((c) => ({ name: c.label, value: c.value || 0 }))

  const PIE_COLORS = ['#667eea', '#764ba2', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#94a3b8']

  const formatManwon = (value) => `${formatNumber(value)}만원`

  const PieTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const item = payload[0]
    return (
      <div className="pie-tooltip">
        <div className="pie-tooltip-title">{item.name}</div>
        <div className="pie-tooltip-value">{formatManwon(item.value)}</div>
      </div>
    )
  }

  return (
    <div id="asset-review" className="asset-review-container">
      <header className="asset-review-header">
        <h1>📊 현재 자산 돌아보기</h1>
        <p className="subtitle">나의 자산과 고정지출을 입력하고 분석해보세요</p>
      </header>

      <div className="asset-review-content">
        {/* 좌측: 입력 섹션 */}
        <div className="asset-review-inputs">
          {/* 자산 입력 섹션 */}
          <section className="input-section">
            <h2 className="section-title">💰 자산 입력</h2>
            <div className="input-grid">
            <div className="asset-input-group">
                <label className="input-label">현금</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={assets.cash}
                  onChange={(e) => handleAssetChange('cash', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustAsset('cash', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustAsset('cash', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">주식</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={assets.stocks}
                  onChange={(e) => handleAssetChange('stocks', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustAsset('stocks', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustAsset('stocks', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">부동산</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={assets.realEstate}
                  onChange={(e) => handleAssetChange('realEstate', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustAsset('realEstate', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustAsset('realEstate', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">채권</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={assets.bonds}
                  onChange={(e) => handleAssetChange('bonds', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustAsset('bonds', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustAsset('bonds', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">기타</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={assets.other}
                  onChange={(e) => handleAssetChange('other', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustAsset('other', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustAsset('other', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>
            </div>

            <div className="total-display">
              <span className="total-label">총 자산</span>
            <span className="total-value">{formatNumber(totalAssets)}만원</span>
            </div>
          </section>

          {/* 고정지출 입력 섹션 */}
          <section className="input-section">
            <h2 className="section-title">💸 고정지출 입력</h2>
            <div className="input-grid">
            <div className="asset-input-group">
                <label className="input-label">주거비</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.housing}
                  onChange={(e) => handleExpenseChange('housing', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('housing', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('housing', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">식비</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.food}
                  onChange={(e) => handleExpenseChange('food', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('food', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('food', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">교통비</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.transport}
                  onChange={(e) => handleExpenseChange('transport', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('transport', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('transport', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">통신비</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.communication}
                  onChange={(e) => handleExpenseChange('communication', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('communication', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('communication', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">보험</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.insurance}
                  onChange={(e) => handleExpenseChange('insurance', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('insurance', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('insurance', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>

            <div className="asset-input-group">
                <label className="input-label">기타</label>
              <div className="asset-input-row">
                <div className="asset-input-wrapper">
                  <input
                  type="number"
                  className="asset-form-input"
                    placeholder="0"
                  value={expenses.other}
                  onChange={(e) => handleExpenseChange('other', e.target.value)}
                  min="0"
                  />
                  <div className="asset-input-buttons">
                    <button type="button" className="asset-input-btn asset-input-btn-up" aria-label="증가" onClick={() => adjustExpense('other', 1)}>▲</button>
                    <button type="button" className="asset-input-btn asset-input-btn-down" aria-label="감소" onClick={() => adjustExpense('other', -1)}>▼</button>
                  </div>
                </div>
                <span className="asset-input-suffix">만원</span>
                </div>
              </div>
            </div>

            <div className="total-display">
              <span className="total-label">월 총 지출</span>
            <span className="total-value">{formatNumber(monthlyExpenses)}만원</span>
            </div>
          </section>
        </div>

        {/* 우측: 분석 결과 섹션 */}
        <div className="asset-review-results">
          {(totalAssets > 0 || totalExpenses > 0) ? (
            <section className="analysis-section">
              <h2 className="section-title">📈 분석 결과</h2>
              
              {totalAssets > 0 && (
                <div className="analysis-card">
                  <h3 className="analysis-title">자산 구성</h3>
                  <div className="pie-layout">
                    <div className="pie-chart">
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={assetPieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                            {assetPieData.map((_, idx) => (
                              <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="pie-legend">
                      {assetCategories.map((category, idx) => {
                        const value = category.value || 0
                        const percentage = ((value / totalAssets) * 100).toFixed(1)
                        return (
                          <div key={category.key} className="pie-legend-row">
                            <span className="pie-dot" style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                            <span className="pie-name">{category.label}</span>
                            <span className="pie-percent">{percentage}%</span>
                            <span className="pie-value">{formatManwon(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {totalExpenses > 0 && (
                <div className="analysis-card">
                  <h3 className="analysis-title">지출 구성</h3>
                  <div className="pie-layout">
                    <div className="pie-chart">
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={expensePieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                            {expensePieData.map((_, idx) => (
                              <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="pie-legend">
                      {expenseCategories.map((category, idx) => {
                        const value = category.value || 0
                        const percentage = ((value / totalExpenses) * 100).toFixed(1)
                        return (
                          <div key={category.key} className="pie-legend-row">
                            <span className="pie-dot" style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                            <span className="pie-name">{category.label}</span>
                            <span className="pie-percent">{percentage}%</span>
                            <span className="pie-value">{formatManwon(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {totalAssets > 0 && totalExpenses > 0 && (
                <div className="analysis-card highlight">
                  <h3 className="analysis-title">자산 대비 지출 비율</h3>
                  <div className="ratio-display">
                    <div className="ratio-value">
                      {((totalExpenses / totalAssets) * 100).toFixed(2)}%
                    </div>
                    <div className="ratio-description">
                      월 지출이 총 자산의 {((totalExpenses / totalAssets) * 100).toFixed(2)}%를 차지합니다
                    </div>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <div className="empty-results">
              <div className="empty-results-content">
                <div className="empty-icon">📊</div>
                <h3>분석 결과가 여기에 표시됩니다</h3>
                <p>좌측에서 자산과 지출 정보를 입력하시면<br />실시간으로 분석 결과를 확인할 수 있습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssetReview
