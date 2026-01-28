import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import TabNavigation from './components/TabNavigation'
import InvestmentCalculator from './components/InvestmentCalculator'
import AssetReview from './components/AssetReview'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  const getTabInfo = () => {
    switch (activeTab) {
      case 'calculator':
        return {
          title: '투자 목표 계산기',
          subtitle: 'Above and Beyond',
          description: '당신의 재무 목표를 달성하기 위한 정확한 투자 수익률을 계산하세요.\n데이터 기반의 스마트한 투자 계획을 시작하세요.'
        }
      case 'assets':
        return {
          title: '현재 자산 돌아보기',
          subtitle: 'Asset Review',
          description: '나의 자산과 고정지출을 입력하고 분석해보세요.\n카테고리별로 구분하여 한눈에 파악하세요.'
        }
      default:
        return {
          title: '투자 계산기',
          subtitle: 'Investment Calculator',
          description: '당신의 재무 목표를 달성하기 위한 정확한 투자 수익률을 계산하세요.\n데이터 기반의 스마트한 투자 계획을 시작하세요.'
        }
    }
  }

  const tabInfo = getTabInfo()

  return (
    <div className="App">
      <Hero 
        title={tabInfo.title}
        subtitle={tabInfo.subtitle}
        description={tabInfo.description}
      />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'calculator' && <InvestmentCalculator />}
      {activeTab === 'assets' && <AssetReview />}
    </div>
  )
}

export default App
