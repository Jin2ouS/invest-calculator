import { Routes, Route } from 'react-router-dom'
import './App.css'
import TopNavigation from './components/TopNavigation'
import Hero from './components/Hero'
import InvestmentCalculator from './components/InvestmentCalculator'
import AssetReview from './components/AssetReview'
import IndexLongTermCalculator from './components/IndexLongTermCalculator'
import CompoundCalculator from './components/CompoundCalculator'
import WinRateCalculator from './components/WinRateCalculator'

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/goal-calc" element={<InvestmentCalculator />} />
        <Route path="/assets" element={<AssetReview />} />
        <Route path="/index-longterm" element={<IndexLongTermCalculator />} />
        <Route path="/compound" element={<CompoundCalculator />} />
        <Route path="/winrate" element={<WinRateCalculator />} />
      </Routes>
    </div>
  )
}

export default App
