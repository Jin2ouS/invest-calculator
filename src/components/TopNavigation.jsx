import { Link, useLocation } from 'react-router-dom'
import './TopNavigation.css'

function TopNavigation() {
  const location = useLocation()

  return (
    <nav className="top-navigation">
      <Link to="/" className="top-nav-logo">
        투자 계산기
      </Link>
      <div className="top-nav-menu">
        <Link 
          to="/calculator"
          className={`top-nav-item ${location.pathname === '/calculator' ? 'active' : ''}`}
        >
          <span className="top-nav-icon">💰</span>
          <span className="top-nav-label">투자 목표 계산기</span>
        </Link>
        <Link 
          to="/assets"
          className={`top-nav-item ${location.pathname === '/assets' ? 'active' : ''}`}
        >
          <span className="top-nav-icon">📊</span>
          <span className="top-nav-label">현재 자산 돌아보기</span>
        </Link>
      </div>
    </nav>
  )
}

export default TopNavigation
