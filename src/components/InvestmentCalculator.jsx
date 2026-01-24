import { useState } from 'react'
import InputForm from './InputForm'
import ResultDisplay from './ResultDisplay'
import { calculateInvestmentGoal } from '../utils/calculator'
import './InvestmentCalculator.css'

function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    targetYears: '',
    monthlyIncome: '',
    dividendRate: 4,
    currentAssets: '',
    inflation: 0
  })

  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCalculate = () => {
    const calculatedResult = calculateInvestmentGoal(inputs)
    setResult(calculatedResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setInputs({
      targetYears: '',
      monthlyIncome: '',
      dividendRate: 4,
      currentAssets: '',
      inflation: 0
    })
    setResult(null)
    setShowResult(false)
  }

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <h1>💰 투자 목표 계산기</h1>
        <p className="subtitle">목표 달성을 위한 필요 수익률을 계산해보세요</p>
      </header>

      <div className="calculator-content">
        <InputForm 
          inputs={inputs}
          onInputChange={handleInputChange}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {showResult && result && (
          <ResultDisplay result={result} inputs={inputs} />
        )}
      </div>
    </div>
  )
}

export default InvestmentCalculator
