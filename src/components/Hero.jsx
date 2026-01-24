import './Hero.css'

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-main">투자 목표 계산기</span>
            <span className="hero-title-sub">Above and Beyond</span>
          </h1>
          <p className="hero-description">
            당신의 재무 목표를 달성하기 위한 정확한 투자 수익률을 계산하세요.
            <br />
            데이터 기반의 스마트한 투자 계획을 시작하세요.
          </p>
          <button className="hero-cta" onClick={() => {
            document.querySelector('.calculator-container')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }}>
            시작하기 →
          </button>
        </div>
        <div className="hero-visual">
          <iframe 
            src='https://my.spline.design/aboveandbeyond-F6DKYvVp9hqffVN4J3d9QJgT/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            title="3D Animation"
          />
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  )
}

export default Hero
