import './TabNavigation.css'

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'calculator', label: '투자 목표 계산기', icon: '💰' },
    { id: 'assets', label: '현재 자산 돌아보기', icon: '📊' }
  ]

  return (
    <div className="tab-navigation">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation
