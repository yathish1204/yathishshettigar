'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Profile } from '@/types';

export function HeroVideoPlayer({ profile }: { profile: Profile }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const activeVideoUrl = isDark
    ? profile.heroVideoUrl || profile.heroVideoUrlLight
    : profile.heroVideoUrlLight || profile.heroVideoUrl;

  const activeVideoPoster = isDark
    ? profile.heroVideoPoster || profile.profileImage
    : profile.heroVideoPosterLight || profile.heroVideoPoster || profile.profileImage;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 1.0;
    }
  }, [isMuted, activeVideoUrl]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      video.volume = 1.0;
      if (!nextMuted) {
        video.play().catch(() => {});
      }
      setIsMuted(nextMuted);
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-[45vh] sm:h-full sm:absolute sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[70%] shrink-0 overflow-hidden aspect-[16/9] sm:aspect-auto">
      {activeVideoUrl ? (
        <video
          key={activeVideoUrl}
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          poster={activeVideoPoster}
          className="w-full h-full object-cover object-center md:object-right opacity-100 dark:opacity-90 pointer-events-none transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.2)_15%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.2)_15%,black_100%)]"
        >
          <source src={activeVideoUrl} type="video/mp4" />
        </video>
      ) : activeVideoPoster ? (
        <div
          className="w-full h-full bg-cover bg-center md:bg-right opacity-100 dark:opacity-85 pointer-events-none transition-all duration-500 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.2)_15%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.2)_15%,black_100%)]"

          style={{ backgroundImage: `url(${activeVideoPoster})` }}
        />
      ) : (
        /* Subtle Background Glow Fallback */
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#B45309]/10 dark:bg-[#FBBF24]/10 blur-[120px] rounded-full pointer-events-none" />
      )}

      {/* Video Controls */}
      {profile.heroVideoUrl && (
        <div className="absolute bottom-6 right-4 sm:right-6 lg:right-8 z-30 flex items-center gap-2.5">
          {/* Mute/Unmute Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] hover:border-[#B45309] dark:hover:border-[#FBBF24] transition-all shadow-sm backdrop-blur-md cursor-pointer hover:scale-110 flex items-center justify-center"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              aria-pressed={!isMuted}
            >
              {isMuted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <div aria-hidden="true" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              {isMuted ? 'Unmute' : 'Mute'}
            </div>
          </div>

          {/* Replay Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={replayVideo}
              className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] hover:border-[#B45309] dark:hover:border-[#FBBF24] transition-all shadow-sm backdrop-blur-md cursor-pointer hover:scale-110 flex items-center justify-center"
              aria-label="Replay video"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <div aria-hidden="true" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Replay
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
