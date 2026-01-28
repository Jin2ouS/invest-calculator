import { Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import InvestmentCalculator from './components/InvestmentCalculator'
import AssetReview from './components/AssetReview'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <InvestmentCalculator />
          </>
        } />
        <Route path="/assets" element={
          <>
            <Hero />
            <AssetReview />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
