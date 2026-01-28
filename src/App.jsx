import { Routes, Route } from 'react-router-dom'
import './App.css'
import TopNavigation from './components/TopNavigation'
import Hero from './components/Hero'
import InvestmentCalculator from './components/InvestmentCalculator'
import AssetReview from './components/AssetReview'

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/calculator" element={<InvestmentCalculator />} />
        <Route path="/assets" element={<AssetReview />} />
      </Routes>
    </div>
  )
}

export default App
