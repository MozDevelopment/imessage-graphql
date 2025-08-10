'use client'

import React, { useCallback, useMemo, useState } from 'react';

import type { EnvelopeCommonProps } from './EnvelopeElegant';

/**
 * Classic animated envelope variant. Simpler visuals, same API.
 */
export default function EnvelopeClassic({
  titleLeft = 'Assa',
  titleRight = 'Eleutério',
  dateISO = '2025-08-30',
  ctaLabel = 'Toque aqui para abrir',
  ariaLabel = 'Toque aqui para abrir a carta',
  className = '',
  disabled = false,
  openDelayMs = 1000,
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

  const css = useMemo(() => `
    .heart { position: absolute; bottom: 0; right: 10%; pointer-events: none; }
    .heart:before, .heart:after { position: absolute; content: ''; left: 50px; top: 0; width: 50px; height: 80px; background: #D00000; border-radius: 50px 50px 0 0; transform: rotate(-45deg); transform-origin: 0 100%; pointer-events: none; }
    .heart:after { left: 0; transform: rotate(45deg); transform-origin: 100% 100%; }

    .close .heart { opacity: 0; animation: none; }
    .open .heart { animation-fill-mode: forwards; animation-delay: .7s; }
    .a1 { left: 20%; transform: scale(0.6); opacity: 1; animation: slideUp 4s linear forwards, sideSway 2s ease-in-out infinite alternate; animation-delay: .7s; }
    .a2 { left: 55%; transform: scale(1); opacity: 1; animation: slideUp 5s linear forwards, sideSway 4s ease-in-out infinite alternate; animation-delay: .7s; }
    .a3 { left: 10%; transform: scale(0.8); opacity: 1; animation: slideUp 7s linear forwards, sideSway 2s ease-in-out infinite alternate; animation-delay: .7s; }

    @keyframes slideUp { 0% { top: 0; } 100% { top: -600px; } }
    @keyframes sideSway { 0% { margin-left: 0px; } 100% { margin-left: 50px; } }

    .open .flap { transform: rotateX(180deg); transition: transform 0.4s ease, z-index 0.6s; z-index: 1; }
    .close .flap { transform: rotateX(0deg); transition: transform 0.4s 0.6s ease, z-index 1s; z-index: 5; }
    .close .letter { transform: translateY(0px); transition: transform 0.4s ease, z-index 1s; z-index: 1; }
    .open .letter { transform: translateY(-60px); transition: transform 0.4s 0.6s ease, z-index 0.6s; z-index: 2; }
  `, []);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <style>{css}</style>

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

      <div className="envlope-wrapper h-[380px] my-2">
        <div
          className={`${isEnvelopeOpen ? 'open' : 'close'} relative w-[280px] h-[180px] rounded-bl-[6px] rounded-br-[6px] mx-auto top-[150px] bg-[#a9c9c0] shadow-[0_4px_20px_rgba(0,0,0,.2)]`}
        >
          <div className="front flap absolute w-0 h-0 z-3 border-l-[140px] border-r-[140px] border-b-[82px] border-b-transparent border-t-[98px] border-t-[#7c918a] transform-origin-top pointer-events-none" />

          <div className="front pocket absolute w-0 h-0 z-3 border-l-[140px] border-l-[#a9c9c0] border-r-[140px] border-r-[#a9c9c0] border-b-[90px] border-b-[#94b2a9] border-t-[90px] border-t-transparent rounded-bl-[6px] rounded-br-[6px]" />

          <div className="letter relative bg-white w-[90%] mx-auto h-[90%] top-[5%] rounded-[6px] shadow-[0_2px_26px_rgba(0,0,0,.12)]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#D7E3EF] opacity-70" />
            <div className="words line1 absolute left-[10%] w-[20%] h-[7%] bg-[#EEEFF0] top-[15%]" />
            <div className="words line2 absolute left-[10%] w-[80%] h-[14%] bg-[#EEEFF0] top-[30%]" />
            <div className="words line3 absolute left-[10%] w-[80%] h-[14%] bg-[#EEEFF0] top-[50%]" />
            <div className="words line4 absolute left-[10%] w-[80%] h-[14%] bg-[#EEEFF0] top-[70%]" />
          </div>

          <div className="hearts absolute top-[90px] left-0 right-0 z-2">
            <div className="heart a1" />
            <div className="heart a2" />
            <div className="heart a3" />
          </div>

          <button
            onClick={handleOpenEnvelope}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-24 h-24 rounded-full p-0 bg-[#d4af37] shadow-xl hover:bg-[#c29c31] transition-all duration-300 transform hover:scale-105 group flex items-center justify-center"
            disabled={disabled || isEnvelopeOpen}
            aria-label={ariaLabel}
          >
            <div className="flex flex-col items-center justify-center space-y-1 text-white">
              <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span className="text-xs font-semibold">{ctaLabel}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}