import './App.css'
import Hero from './components/Hero'
import TabNavigation from './components/TabNavigation'
import InvestmentCalculator from './components/InvestmentCalculator'
import AssetReview from './components/AssetReview'

function App() {
  return (
    <div className="App">
      <Hero />
      <TabNavigation />
      <InvestmentCalculator />
      <AssetReview />
    </div>
  )
}

export default App
