'use client';

import React, { useState, useEffect } from 'react';

export function GreetingText() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 16) {
      setGreeting('Good Afternoon');
    } else if (hour >= 16 && hour < 24) {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <span className="text-sm sm:text-xl md:text-2xl font-semibold text-zinc-600 dark:text-zinc-400 font-mono tracking-wide block">
      Hi{greeting ? ` ${greeting}` : ''}, I'm
    </span>
  );
}
