import React from 'react';
import chromeIcon from '../assets/icon-chrome.png';
import firefoxIcon from '../assets/icon-firefox.png';
import safariIcon from '../assets/icon-safari.png';
import edgeIcon from '../assets/Microsoft_Edge_logo.png';
import ieIcon from '../assets/icon-explorer.png';
import './BrowserSupport.css';

interface BrowserSupportProps {
  support: {
    chrome: string;
    firefox: string;
    safari: string;
    edge: string;
    ie?: string;
  };
}

const BrowserSupport: React.FC<BrowserSupportProps> = ({ support }) => {
  const getSupportClass = (version: string) => {
    if (version === 'Полная поддержка') return 'full';
    if (version === 'Частичная поддержка') return 'partial';
    if (version === 'Без поддержки') return 'none';
    return 'version';
  };

  const getSupportText = (version: string) => {
    if (version === 'Полная поддержка') return '✓';
    if (version === 'Частичная поддержка') return '⚠';
    if (version === 'Без поддержки') return '✗';
    return version;
  };

  return (
    <section className="browser-support-section">
      <h2>Поддержка браузеров</h2>
      <div className="browser-support-grid">
        <div className="browser-item">
          <div className="browser-icon chrome">
            <img src={chromeIcon} alt="Chrome" />
          </div>
          <div className="browser-name">Chrome</div>
          <div className={`support-status ${getSupportClass(support.chrome)}`}>
            {getSupportText(support.chrome)}
          </div>
        </div>
        
        <div className="browser-item">
          <div className="browser-icon firefox">
            <img src={firefoxIcon} alt="Firefox" />
          </div>
          <div className="browser-name">Firefox</div>
          <div className={`support-status ${getSupportClass(support.firefox)}`}>
            {getSupportText(support.firefox)}
          </div>
        </div>
        
        <div className="browser-item">
          <div className="browser-icon safari">
            <img src={safariIcon} alt="Safari" />
          </div>
          <div className="browser-name">Safari</div>
          <div className={`support-status ${getSupportClass(support.safari)}`}>
            {getSupportText(support.safari)}
          </div>
        </div>
        
        <div className="browser-item">
          <div className="browser-icon edge">
            <img src={edgeIcon} alt="Edge" />
          </div>
          <div className="browser-name">Edge</div>
          <div className={`support-status ${getSupportClass(support.edge)}`}>
            {getSupportText(support.edge)}
          </div>
        </div>
        
        {support.ie && (
          <div className="browser-item">
            <div className="browser-icon ie">
              <img src={ieIcon} alt="Internet Explorer" />
            </div>
            <div className="browser-name">IE</div>
            <div className={`support-status ${getSupportClass(support.ie)}`}>
              {getSupportText(support.ie)}
            </div>
          </div>
        )}
      </div>
      
      <div className="support-legend">
        <div className="legend-item">
          <span className="legend-icon full">✓</span>
          <span>Полная поддержка</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon partial">⚠</span>
          <span>Частичная поддержка</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon none">✗</span>
          <span>Без поддержки</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon version">1.0</span>
          <span>Версия с поддержкой</span>
        </div>
      </div>
    </section>
  );
};

export default BrowserSupport;
