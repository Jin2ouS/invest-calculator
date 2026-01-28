import { useState, useRef, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef(null)

  // iframe 로드 후 기본 음소거 설정
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      // iframe이 로드된 후 음소거 설정 시도
      try {
        // Spline postMessage API를 통한 음소거 설정
        iframe.contentWindow?.postMessage(
          { type: 'mute', value: true },
          'https://my.spline.design'
        )
      } catch (error) {
        console.log('Spline audio control:', error)
      }
    }

    iframe.addEventListener('load', handleLoad)
    
    // 이미 로드된 경우 즉시 실행
    if (iframe.contentDocument?.readyState === 'complete') {
      handleLoad()
    }

    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [])

  // 음소거 상태 변경 시 iframe에 전달
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      iframe.contentWindow?.postMessage(
        { type: 'mute', value: isMuted },
        'https://my.spline.design'
      )
    } catch (error) {
      console.log('Spline audio control:', error)
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

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
            ref={iframeRef}
            src='https://my.spline.design/aboveandbeyond-F6DKYvVp9hqffVN4J3d9QJgT/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            title="3D Animation"
            allow="autoplay"
          />
          <button 
            className="audio-toggle-btn"
            onClick={toggleMute}
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <div className="spline-logo-overlay" />
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
