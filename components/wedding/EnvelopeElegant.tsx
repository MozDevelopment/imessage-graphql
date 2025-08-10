'use client'

import React, { useCallback, useMemo, useState } from 'react';

export type EnvelopeCommonProps = {
  titleLeft?: string;
  titleRight?: string;
  dateISO?: string; // e.g. '2025-08-30'
  ctaLabel?: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  openDelayMs?: number; // time to wait before calling onOpenComplete to let the animation play
  onOpenStart?: () => void;
  onOpenComplete?: () => void;
};

/**
 * Elegant animated envelope with hearts and rotating seal text.
 * Self-contained styles; no dialog or reset logic. Use callbacks to react to the reveal.
 */
export default function EnvelopeElegant({
  titleLeft = 'Assa',
  titleRight = 'Eleutério',
  dateISO = '2025-08-30',
  ctaLabel = 'Toque aqui para abrir',
  ariaLabel = 'Toque aqui para abrir a carta',
  className = '',
  disabled = false,
  openDelayMs = 1200,
  onOpenStart,
  onOpenComplete,
}: EnvelopeCommonProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = useCallback(() => {
    if (disabled || isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    onOpenStart?.();
    window.setTimeout(() => {
      onOpenComplete?.();
    }, openDelayMs);
  }, [disabled, isEnvelopeOpen, onOpenStart, onOpenComplete, openDelayMs]);

  const cssStyles = useMemo(() => `
    .heart {
      position: absolute;
      bottom: 0;
      right: 10%;
      pointer-events: none;
      filter: drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3));
    }

    .heart:before,
    .heart:after {
      position: absolute;
      content: '';
      left: 50px;
      top: 0;
      width: 50px;
      height: 80px;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      border-radius: 50px 50px 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
      pointer-events: none;
    }
    .heart:after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }

    .close .heart { opacity: 0; animation: none; }
    .open .heart { animation-fill-mode: forwards; animation-delay: .8s; }

    .a1 { left: 15%; transform: scale(0.5); opacity: 1; animation: floatUp 4s ease-out forwards, gentleSway 3s ease-in-out infinite alternate; animation-delay: .8s; }
    .a2 { left: 50%; transform: scale(0.8); opacity: 1; animation: floatUp 5s ease-out forwards, gentleSway 4s ease-in-out infinite alternate; animation-delay: 1s; }
    .a3 { left: 75%; transform: scale(0.6); opacity: 1; animation: floatUp 6s ease-out forwards, gentleSway 2.5s ease-in-out infinite alternate; animation-delay: .9s; }

    @keyframes floatUp { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: -700px; opacity: 0; } }
    @keyframes gentleSway { 0% { margin-left: 0px; } 100% { margin-left: 30px; } }

    .envelope-container { perspective: 1000px; transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .envelope-container:hover { transform: translateY(-8px); }

    .open .flap { transform: rotateX(180deg); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1; }
    .close .flap { transform: rotateX(0deg); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); z-index: 5; }

    .close .letter { transform: translateY(0px); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1; }
    .open .letter { transform: translateY(-80px); transition: transform 0.6s 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 2; }

    .seal-button {
      background: linear-gradient(135deg, #ec4899, #db2777);
      box-shadow: 0 10px 20px rgba(236, 72, 153, 0.3), 0 6px 6px rgba(236, 72, 153, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.1);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .seal-button:hover {
      background: linear-gradient(135deg, #f472b6, #ec4899);
      box-shadow: 0 15px 30px rgba(236, 72, 153, 0.4), 0 10px 10px rgba(236, 72, 153, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px) scale(1.05);
    }
    .seal-button:active { transform: translateY(0px) scale(0.98); box-shadow: 0 5px 10px rgba(236, 72, 153, 0.3), 0 3px 3px rgba(236, 72, 153, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.15); }

    .button-text-outer { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 140px; height: 140px; pointer-events: none; }
    .text-circle { animation: rotate 15s linear infinite; transform-origin: center; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .sparkle { animation: sparkle 2s ease-in-out infinite; }
    @keyframes sparkle { 0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(180deg); } }

    .letter-content { background: linear-gradient(135deg, #ffffff, #f1f5f9); backdrop-filter: blur(10px); border: 1px solid #e2e8f0; }
    .words { background: linear-gradient(90deg, #f1f5f9, #64748b); border-radius: 4px; animation: shimmer 3s ease-in-out infinite; }
    @keyframes shimmer { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

    .envelope-shadow { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1); }
    .envelope-body { background: linear-gradient(135deg, #f1f5f9, #94a3b8); }
    .envelope-flap { background: linear-gradient(135deg, #64748b, #475569); }
  `, []);

  return (
    <div className={`flex flex-col items-center relative overflow-visible ${className}`}>
      <style>{cssStyles}</style>

      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-1">
          {titleLeft}
        </h1>
        <div className="flex items-center justify-center gap-4 mb-1">
          <div className="h-px bg-muted-foreground/40 flex-1 max-w-16" />
          <span className="text-xl text-muted-foreground">&amp;</span>
          <div className="h-px bg-muted-foreground/40 flex-1 max-w-16" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {titleRight}
        </h2>
        {dateISO && (
          <div className="mt-3">
            <time dateTime={dateISO} className="text-base font-medium text-muted-foreground">
              {new Date(dateISO).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </time>
          </div>
        )}
      </header>

      <main className="envelope-container h-[400px] my-2 relative" role="group" aria-label="Envelope elegante">
        <div
          className={`${isEnvelopeOpen ? 'open' : 'close'} relative w-[320px] h-[200px] rounded-bl-lg rounded-br-lg mx-auto top-[150px] envelope-shadow envelope-body`}
        >
          <div
            className="front flap absolute w-0 h-0 z-3 pointer-events-none transform-origin-top envelope-flap"
            style={{
              borderLeft: '160px solid transparent',
              borderRight: '160px solid transparent',
              borderTop: '110px solid #64748b',
              borderBottom: '90px solid transparent',
            }}
          />

          <div
            className="front pocket absolute w-0 h-0 z-3 rounded-bl-lg rounded-br-lg"
            style={{
              borderLeft: '160px solid #f1f5f9',
              borderRight: '160px solid #f1f5f9',
              borderBottom: '100px solid #94a3b8',
              borderTop: '100px solid transparent',
            }}
          />

          <div className="letter relative letter-content w-[90%] mx-auto h-[90%] top-[5%] rounded-lg shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/50 opacity-70" />
            <div className="words line1 absolute left-[10%] w-[30%] h-[6%] top-[20%]" />
            <div className="words line2 absolute left-[10%] w-[85%] h-[8%] top-[32%]" />
            <div className="words line3 absolute left-[10%] w-[80%] h-[8%] top-[45%]" />
            <div className="words line4 absolute left-[10%] w-[75%] h-[8%] top-[58%]" />
            <div className="words line5 absolute left-[10%] w-[60%] h-[6%] top-[70%]" />
            <div className="absolute top-2 right-2 w-8 h-8">
              <svg className="w-full h-full sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.546 3.132L17 7l-3.454.868L12 11l-1.546-3.132L7 7l3.454-.868L12 3z" />
              </svg>
            </div>
          </div>

          <div className="hearts absolute top-[100px] left-0 right-0 z-2">
            <div className="heart a1" />
            <div className="heart a2" />
            <div className="heart a3" />
          </div>

          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <div className="button-text-outer" aria-hidden="true">
              <svg className="text-circle w-full h-full" viewBox="0 0 140 140">
                <defs>
                  <path id="circle" d="M 70,70 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                </defs>
                <text className="fill-primary" style={{ fontSize: '11px', fontWeight: 700 }}>
                  <textPath href="#circle" startOffset="0%">
                    {ctaLabel.toUpperCase()} • {ctaLabel.toUpperCase()} •
                  </textPath>
                </text>
              </svg>
            </div>

            <button
              onClick={handleOpenEnvelope}
              className="seal-button w-20 h-20 rounded-full p-0 border-2 border-primary/20 relative flex items-center justify-center"
              disabled={disabled || isEnvelopeOpen}
              aria-label={ariaLabel}
            >
              <svg className="h-8 w-8 text-primary-foreground drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}