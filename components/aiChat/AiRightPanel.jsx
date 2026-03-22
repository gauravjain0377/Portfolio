import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AiChat.module.scss';

export default function AiRightPanel({
  activeSite,
  setActiveSite,
  isVoiceCallActive,
  voiceHistory,
  voiceTranscript,
  captionsEndRef
}) {
  return (
    <AnimatePresence>
      {(activeSite || isVoiceCallActive) && (
        <motion.div
          className={styles.rightPanel}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '65%' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeSite ? (
            <>
              <div className={styles.browserHeader}>
                <div className={styles.macDots}>
                  <span className={styles.dotRed} onClick={() => setActiveSite(null)} title="Close Browser" />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <div className={styles.addressBar}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  {activeSite.url || activeSite.name}
                </div>
                <div className={styles.externalLinkContainer}>
                  {activeSite.github && (
                    <a href={activeSite.github} target="_blank" rel="noopener noreferrer" className={styles.externalLinkBtn} title="View on GitHub">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {activeSite.url && (
                    <a href={activeSite.url} target="_blank" rel="noopener noreferrer" className={styles.externalLinkBtn} title="Open in New Tab">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      <span>Open Details</span>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.browserBody}>
                 <div className={styles.autoScrollWrapper}>
                    {activeSite.name.toLowerCase().includes('all proj') ? (
                      <div className={styles.projectsCollage}>
                        {[
                          { title: 'InboxPilot AI', img: '/images/inboxpilotai.png', url: 'https://inboxpilot-ai.vercel.app/' },
                          { title: 'HackZen', img: '/images/HackZen.png', url: 'https://hackzen.vercel.app/' },
                          { title: 'CodeType Arena', img: '/images/codetypearena.png', url: 'https://github.com/gauravjain0377/codetypearena' },
                          { title: 'SvaraGPT', img: '/images/SvaraGPT.png', url: 'https://svaragpt.vercel.app/' },
                          { title: 'StockSathi', img: '/images/StoxDashboard.png', url: 'https://github.com/gauravjain0377/StockSathi' },
                          { title: 'Understanding Caching', img: '/images/understanding.png', url: 'https://github.com/gauravjain0377/Understanding-Next.js' }
                        ].map((p, i) => (
                          <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.collageItem}>
                            <img src={p.img} alt={p.title} draggable="false" />
                            <div className={styles.collageOverlay}>
                              <h4>{p.title}</h4>
                              <p>Click to view</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a href={activeSite.url} target="_blank" rel="noopener noreferrer" className={styles.clickableImageWrapper}>
                        <img src={activeSite.image} alt={activeSite.name} className={styles.siteImage} draggable="false" />
                      </a>
                    )}
                 </div>
              </div>
            </>
          ) : (
            <div className={styles.teleprompterCaptions}>
              <div className={styles.voiceCaptionsContainerHuge}>
                {voiceHistory.map(item => (
                  <div key={item.id} className={item.type === 'user' ? styles.userCaptionHuge : styles.aiCaptionHuge}>
                     <span>{item.type === 'user' ? 'You' : 'AI'}</span> {item.text}
                  </div>
                ))}
                {voiceTranscript && !voiceTranscript.toLowerCase().includes('stopped') && (
                  <div className={styles.userCaptionHuge} style={{ opacity: 0.6 }}>
                     <span>You (Listening...)</span> {voiceTranscript}
                  </div>
                )}
                <div ref={captionsEndRef} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
