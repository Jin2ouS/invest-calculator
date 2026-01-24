import { useState, useEffect } from 'react'
import './InputForm.css'

function InputForm({ inputs, onInputChange, onCalculate, onReset }) {
  const [previewAsset, setPreviewAsset] = useState(null)
  const [gap, setGap] = useState(null)
  const [requiredReturnPreview, setRequiredReturnPreview] = useState(null)

  // 월 현금흐름 입력 시 필요 자산 미리보기
  useEffect(() => {
    if (inputs.monthlyIncome && inputs.dividendRate) {
      // 인플레이션 고려한 미래 월 현금흐름
      const inflationRate = inputs.inflation / 100
      const years = inputs.targetYears || 0
      const futureMonthlyIncome = inputs.monthlyIncome * Math.pow(1 + inflationRate, years)
      
      const requiredAsset = (futureMonthlyIncome * 12) / (inputs.dividendRate / 100)
      setPreviewAsset(requiredAsset)
      
      // 현재 자산이 입력된 경우 갭 계산
      if (inputs.currentAssets) {
        setGap(requiredAsset - inputs.currentAssets)
      }
    } else {
      setPreviewAsset(null)
      setGap(null)
    }
  }, [inputs.monthlyIncome, inputs.dividendRate, inputs.currentAssets, inputs.inflation, inputs.targetYears])

  // STEP 2와 STEP 3 입력 시 필요 수익율 미리 계산
  useEffect(() => {
    if (inputs.monthlyIncome && inputs.currentAssets && inputs.targetYears) {
      // 인플레이션 고려
      const inflationRate = inputs.inflation / 100
      const futureMonthlyIncome = inputs.monthlyIncome * Math.pow(1 + inflationRate, inputs.targetYears)
      
      // 다양한 수익율에 대한 필요 자산 계산하여 평균적인 필요 수익율 추정
      // 더 정확한 계산: 각 수익율별로 필요한 CAGR 계산
      const yieldRates = [4, 6, 10, 20, 30, 50]
      let minRequiredReturn = Infinity
      
      yieldRates.forEach(rate => {
        const targetAsset = (futureMonthlyIncome * 12) / (rate / 100)
        if (targetAsset > inputs.currentAssets) {
          const requiredReturn = (Math.pow(targetAsset / inputs.currentAssets, 1 / inputs.targetYears) - 1) * 100
          if (requiredReturn < minRequiredReturn) {
            minRequiredReturn = requiredReturn
          }
        }
      })
      
      if (minRequiredReturn !== Infinity) {
        setRequiredReturnPreview(minRequiredReturn)
      }
    } else {
      setRequiredReturnPreview(null)
    }
  }, [inputs.monthlyIncome, inputs.currentAssets, inputs.targetYears, inputs.inflation])

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ko-KR').format(num)
  }

  const isFormValid = () => {
    return inputs.targetYears && 
           inputs.monthlyIncome && 
           inputs.dividendRate > 0 &&
           inputs.currentAssets
  }

  const targetYearOptions = [
    { value: 1, label: '1년 후' },
    { value: 3, label: '3년 후' },
    { value: 5, label: '5년 후' },
    { value: 10, label: '10년 후' },
    { value: 15, label: '15년 후' },
    { value: 20, label: '20년 후' }
  ]

  return (
    <div className="input-form">
      <div className="form-section">
        <div className="step-indicator">STEP 1</div>
        <label className="form-label">
          <span className="label-text">목표 시점</span>
          <span className="label-required">*</span>
        </label>
        <select 
          className="form-select"
          value={inputs.targetYears}
          onChange={(e) => onInputChange('targetYears', Number(e.target.value))}
        >
          <option value="">선택해주세요</option>
          {targetYearOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {inputs.targetYears && (
          <div className="feedback-message success">
            {inputs.targetYears}년 후를 목표로 하셨군요! 👍
          </div>
        )}
      </div>

      <div className="form-section">
        <div className="step-indicator">STEP 2</div>
        <label className="form-label">
          <span className="label-text">목표 월 현금흐름</span>
          <span className="label-required">*</span>
        </label>
        <div className="input-group">
          <input 
            type="number"
            className="form-input"
            placeholder="예) 300"
            value={inputs.monthlyIncome}
            onChange={(e) => onInputChange('monthlyIncome', Number(e.target.value))}
            min="0"
          />
          <span className="input-suffix">만원</span>
        </div>
        {inputs.monthlyIncome > 0 && (
          <div className="annual-income-display">
            📅 연간 목표: <strong>{formatNumber(inputs.monthlyIncome * 12)}만원</strong>
          </div>
        )}
      </div>

      <div className="form-section">
        <div className="step-indicator">STEP 3</div>
        <label className="form-label">
          <span className="label-text">목표 수익율</span>
          <span className="label-required">*</span>
        </label>
        <select 
          className="form-select"
          value={inputs.dividendRate}
          onChange={(e) => onInputChange('dividendRate', Number(e.target.value))}
        >
          <option value={4}>4% (예적금)</option>
          <option value={6}>6% (고배당주)</option>
          <option value={10}>10% (인덱스펀드)</option>
          <option value={20}>20% (워렌 버핏)</option>
          <option value={30}>30% (트레이더)</option>
          <option value={50}>50% (투자의신?)</option>
        </select>
        <div className="help-text">
          목표 자산에서 받을 연 배당/분배 수익률 (기본값: 4%)
        </div>
        
        {inputs.monthlyIncome > 0 && inputs.targetYears && (
          <div className="dividend-comparison">
            <div className="comparison-title">💰 수익율별 필요 자산</div>
            <div className="comparison-grid">
              {[4, 6, 10, 20, 30, 50].map(rate => {
                const inflationRate = inputs.inflation / 100
                const futureMonthlyIncome = inputs.monthlyIncome * Math.pow(1 + inflationRate, inputs.targetYears)
                const requiredAsset = (futureMonthlyIncome * 12) / (rate / 100)
                const isSelected = rate === inputs.dividendRate
                return (
                  <div 
                    key={rate} 
                    className={`comparison-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => onInputChange('dividendRate', rate)}
                  >
                    <div className="rate">{rate}%</div>
                    <div className="asset">{formatNumber(Math.round(requiredAsset))}만원</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {previewAsset && (
          <div className="feedback-message info">
            💡 월 {formatNumber(inputs.monthlyIncome)}만원을 받으시려면
            <br />
            약 <strong>{formatNumber(Math.round(previewAsset))}만원</strong>의 자산이 필요합니다
            <br />
            <span className="small-text">(수익율 {inputs.dividendRate}% 기준{inputs.inflation > 0 ? `, 인플레이션 ${inputs.inflation}% 반영` : ''})</span>
          </div>
        )}
      </div>

      <div className="form-section">
        <div className="step-indicator">STEP 4</div>
        <label className="form-label">
          <span className="label-text">현재 투자자산 금액</span>
          <span className="label-required">*</span>
        </label>
        <div className="input-group">
          <input 
            type="number"
            className="form-input"
            placeholder="예) 5000"
            value={inputs.currentAssets}
            onChange={(e) => onInputChange('currentAssets', Number(e.target.value))}
            min="0"
          />
          <span className="input-suffix">만원</span>
        </div>
        
        {gap !== null && inputs.currentAssets && (
          <div className="feedback-message info">
            📊 현재 {formatNumber(inputs.currentAssets)}만원 → 목표 {formatNumber(Math.round(previewAsset))}만원
            <br />
            약 <strong>{formatNumber(Math.round(gap))}만원</strong>을 더 증식해야 합니다
          </div>
        )}
        
        {requiredReturnPreview !== null && inputs.currentAssets && (
          <div className="required-return-preview">
            <div className="preview-icon">🎯</div>
            <div className="preview-content">
              <strong>필요 수익율 미리보기:</strong>
              <br />
              목표를 달성하려면 최소 <strong>{requiredReturnPreview.toFixed(2)}%</strong>의 연평균 수익률이 필요합니다.
              <br />
              <span className="small-text">
                (가장 높은 수익율 50% 기준, {inputs.inflation > 0 ? `인플레이션 ${inputs.inflation}% 반영` : '인플레이션 미반영'})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="form-section">
        <div className="step-indicator">STEP 5</div>
        <label className="form-label">
          <span className="label-text">인플레이션</span>
          <span className="label-optional">(선택사항)</span>
        </label>
        <select 
          className="form-select"
          value={inputs.inflation}
          onChange={(e) => onInputChange('inflation', Number(e.target.value))}
        >
          <option value={0}>0% (미반영)</option>
          <option value={1}>1% (낮음)</option>
          <option value={2}>2% (보통)</option>
          <option value={3}>3% (높음)</option>
          <option value={4}>4% (매우 높음)</option>
        </select>
        <div className="help-text">
          인플레이션을 고려하여 미래 가치를 조정합니다 (기본값: 0%)
        </div>
        
        {inputs.inflation > 0 && inputs.monthlyIncome > 0 && inputs.targetYears && (
          <div className="inflation-info">
            <div className="info-icon">📈</div>
            <div className="info-content">
              <strong>인플레이션 반영 시:</strong>
              <br />
              {inputs.targetYears}년 후 월 {formatNumber(inputs.monthlyIncome)}만원의 가치는
              <br />
              현재 약 <strong>{formatNumber(Math.round(inputs.monthlyIncome / Math.pow(1 + inputs.inflation/100, inputs.targetYears)))}만원</strong>과 같습니다.
            </div>
          </div>
        )}
      </div>

      <div className="button-group">
        <button 
          className="btn btn-primary"
          onClick={onCalculate}
          disabled={!isFormValid()}
        >
          계산하기 📊
        </button>
        <button 
          className="btn btn-secondary"
          onClick={onReset}
        >
          초기화
        </button>
      </div>
    </div>
  )
}

export default InputForm
