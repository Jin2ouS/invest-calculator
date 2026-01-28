import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const title = '투자 계산기'
  const subtitle = 'Above and Beyond'
  const description = '당신의 재무 목표를 달성하기 위한 정확한 투자 수익률을 계산하세요.\n데이터 기반의 스마트한 투자 계획을 시작하세요.'
  const [isMuted, setIsMuted] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef(null)

  // iframe 로드 후 기본 음소거 설정
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const sendMuteMessage = (muted) => {
      try {
        const targetOrigin = 'https://my.spline.design'
        const iframeWindow = iframe.contentWindow
        
        if (!iframeWindow) return

        // 여러 형식의 메시지 시도 (Spline이 지원하는 형식 확인 필요)
        const messages = [
          { type: 'mute', value: muted },
          { type: 'setMuted', muted: muted },
          { action: 'mute', muted: muted },
          { method: 'mute', arg: muted },
          { event: 'mute', data: { muted } },
          { command: 'mute', muted: muted },
          JSON.stringify({ type: 'mute', value: muted }),
          JSON.stringify({ action: 'mute', muted: muted })
        ]

        // 모든 메시지 형식 시도
        messages.forEach((msg, index) => {
          setTimeout(() => {
            try {
              iframeWindow.postMessage(msg, targetOrigin)
              // 와일드카드 오리진도 시도
              iframeWindow.postMessage(msg, '*')
            } catch (error) {
              // 개별 메시지 실패는 무시
            }
          }, index * 100)
        })
      } catch (error) {
        console.log('Spline audio control error:', error)
      }
    }

    const handleLoad = () => {
      // iframe이 완전히 로드된 후 약간의 지연을 두고 음소거 설정
      setTimeout(() => {
        sendMuteMessage(true)
        // 추가 재시도
        setTimeout(() => sendMuteMessage(true), 1000)
        setTimeout(() => sendMuteMessage(true), 2000)
      }, 500)
    }

    // 로드 이벤트 리스너 추가
    iframe.addEventListener('load', handleLoad)
    
    // 이미 로드된 경우 즉시 실행
    if (iframe.contentWindow) {
      setTimeout(() => {
        sendMuteMessage(true)
        setTimeout(() => sendMuteMessage(true), 1000)
      }, 1000)
    }

    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [])

  // 음소거 상태 변경 시 iframe에 전달
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !iframe.contentWindow) return

    // 상태 변경 시 약간의 지연을 두고 메시지 전송
    const timeoutId = setTimeout(() => {
      try {
        const targetOrigin = 'https://my.spline.design'
        const iframeWindow = iframe.contentWindow
        
        if (!iframeWindow) return

        // 여러 형식의 메시지 시도
        const messages = [
          { type: 'mute', value: isMuted },
          { type: 'setMuted', muted: isMuted },
          { action: 'mute', muted: isMuted },
          { method: 'mute', arg: isMuted },
          { event: 'mute', data: { muted: isMuted } },
          { command: 'mute', muted: isMuted },
          JSON.stringify({ type: 'mute', value: isMuted }),
          JSON.stringify({ action: 'mute', muted: isMuted })
        ]

        // 모든 메시지 형식 시도
        messages.forEach((msg, index) => {
          setTimeout(() => {
            try {
              iframeWindow.postMessage(msg, targetOrigin)
              // 와일드카드 오리진도 시도
              iframeWindow.postMessage(msg, '*')
            } catch (error) {
              // 개별 메시지 실패는 무시
            }
          }, index * 50)
        })
      } catch (error) {
        console.log('Spline audio control error:', error)
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuted = !prev
      // iframe을 재로드하여 음소거 상태 적용
      if (newMuted) {
        setIframeKey(prev => prev + 1)
      }
      return newMuted
    })
  }

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-main">{title}</span>
            <span className="hero-title-sub">{subtitle}</span>
          </h1>
          <p className="hero-description">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="hero-quick-links">
            <Link 
              to="/calculator"
              className="hero-quick-link"
            >
              <span className="quick-link-icon">💰</span>
              <span className="quick-link-text">
                <span className="quick-link-label">투자목표 계산기</span>
                <span className="quick-link-arrow">→ 바로 가기</span>
              </span>
            </Link>
            <Link 
              to="/assets"
              className="hero-quick-link"
            >
              <span className="quick-link-icon">📊</span>
              <span className="quick-link-text">
                <span className="quick-link-label">현재자산 돌아보기</span>
                <span className="quick-link-arrow">→ 바로가기</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <iframe 
            key={iframeKey}
            ref={iframeRef}
            src={`https://my.spline.design/aboveandbeyond-F6DKYvVp9hqffVN4J3d9QJgT/${isMuted ? '?muted=true' : ''}`}
            frameBorder='0' 
            width='100%' 
            height='100%'
            title="3D Animation"
            allow="autoplay"
            style={{ pointerEvents: 'auto' }}
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
    </div>
  )
}

export default Hero
