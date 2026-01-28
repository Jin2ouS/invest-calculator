import { useState } from 'react'
import './AssetReview.css'

function AssetReview() {
  const [assets, setAssets] = useState({
    cash: '',
    stocks: '',
    realEstate: '',
    bonds: '',
    other: ''
  })

  const [expenses, setExpenses] = useState({
    housing: '',
    food: '',
    transport: '',
    communication: '',
    insurance: '',
    other: ''
  })

  const handleAssetChange = (category, value) => {
    setAssets(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleExpenseChange = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const formatNumber = (value) => {
    if (!value) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseNumber = (value) => {
    return value.replace(/,/g, '')
  }

  // 자산 합계 계산
  const totalAssets = Object.values(assets).reduce((sum, val) => {
    return sum + (parseFloat(parseNumber(val)) || 0)
  }, 0)

  // 지출 합계 계산
  const totalExpenses = Object.values(expenses).reduce((sum, val) => {
    return sum + (parseFloat(parseNumber(val)) || 0)
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
  ].filter(item => parseFloat(parseNumber(item.value)) > 0)

  // 지출 카테고리별 비율 계산
  const expenseCategories = [
    { key: 'housing', label: '주거비', value: expenses.housing },
    { key: 'food', label: '식비', value: expenses.food },
    { key: 'transport', label: '교통비', value: expenses.transport },
    { key: 'communication', label: '통신비', value: expenses.communication },
    { key: 'insurance', label: '보험', value: expenses.insurance },
    { key: 'other', label: '기타', value: expenses.other }
  ].filter(item => parseFloat(parseNumber(item.value)) > 0)

  return (
    <div id="asset-review" className="asset-review-container">
      <header className="asset-review-header">
        <h1>📊 현재 자산 돌아보기</h1>
        <p className="subtitle">나의 자산과 고정지출을 입력하고 분석해보세요</p>
      </header>

      <div className="asset-review-content">
        {/* 자산 입력 섹션 */}
        <section className="input-section">
          <h2 className="section-title">💰 자산 입력</h2>
          <div className="input-grid">
            <div className="input-group">
              <label className="input-label">현금</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(assets.cash)}
                  onChange={(e) => handleAssetChange('cash', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">주식</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(assets.stocks)}
                  onChange={(e) => handleAssetChange('stocks', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">부동산</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(assets.realEstate)}
                  onChange={(e) => handleAssetChange('realEstate', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">채권</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(assets.bonds)}
                  onChange={(e) => handleAssetChange('bonds', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">기타</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(assets.other)}
                  onChange={(e) => handleAssetChange('other', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>
          </div>

          <div className="total-display">
            <span className="total-label">총 자산</span>
            <span className="total-value">{formatNumber(totalAssets.toString())}원</span>
          </div>
        </section>

        {/* 고정지출 입력 섹션 */}
        <section className="input-section">
          <h2 className="section-title">💸 고정지출 입력</h2>
          <div className="input-grid">
            <div className="input-group">
              <label className="input-label">주거비</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.housing)}
                  onChange={(e) => handleExpenseChange('housing', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">식비</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.food)}
                  onChange={(e) => handleExpenseChange('food', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">교통비</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.transport)}
                  onChange={(e) => handleExpenseChange('transport', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">통신비</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.communication)}
                  onChange={(e) => handleExpenseChange('communication', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">보험</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.insurance)}
                  onChange={(e) => handleExpenseChange('insurance', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">기타</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="0"
                  value={formatNumber(expenses.other)}
                  onChange={(e) => handleExpenseChange('other', parseNumber(e.target.value))}
                />
                <span className="input-unit">원</span>
              </div>
            </div>
          </div>

          <div className="total-display">
            <span className="total-label">월 총 지출</span>
            <span className="total-value">{formatNumber(monthlyExpenses.toString())}원</span>
          </div>
        </section>

        {/* 분석 결과 섹션 */}
        {(totalAssets > 0 || totalExpenses > 0) && (
          <section className="analysis-section">
            <h2 className="section-title">📈 분석 결과</h2>
            
            {totalAssets > 0 && (
              <div className="analysis-card">
                <h3 className="analysis-title">자산 구성</h3>
                <div className="category-list">
                  {assetCategories.map((category) => {
                    const value = parseFloat(parseNumber(category.value)) || 0
                    const percentage = ((value / totalAssets) * 100).toFixed(1)
                    return (
                      <div key={category.key} className="category-item">
                        <div className="category-header">
                          <span className="category-label">{category.label}</span>
                          <span className="category-percentage">{percentage}%</span>
                        </div>
                        <div className="category-bar">
                          <div 
                            className="category-bar-fill" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="category-value">{formatNumber(category.value)}원</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {totalExpenses > 0 && (
              <div className="analysis-card">
                <h3 className="analysis-title">지출 구성</h3>
                <div className="category-list">
                  {expenseCategories.map((category) => {
                    const value = parseFloat(parseNumber(category.value)) || 0
                    const percentage = ((value / totalExpenses) * 100).toFixed(1)
                    return (
                      <div key={category.key} className="category-item">
                        <div className="category-header">
                          <span className="category-label">{category.label}</span>
                          <span className="category-percentage">{percentage}%</span>
                        </div>
                        <div className="category-bar">
                          <div 
                            className="category-bar-fill" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="category-value">{formatNumber(category.value)}원</div>
                      </div>
                    )
                  })}
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
        )}
      </div>
    </div>
  )
}

export default AssetReview
