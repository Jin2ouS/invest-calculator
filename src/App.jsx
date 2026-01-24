import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import InvestmentCalculator from './components/InvestmentCalculator'

function App() {
  return (
    <div className="App">
      <Hero />
      <InvestmentCalculator />
    </div>
  )
}

export default App
