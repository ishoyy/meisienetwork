'use client';
import { useEffect } from 'react';

export default function ScrollHandler() {

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-scroll-to]') as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      const name = target.getAttribute('data-scroll-to');
      if (!name) return;
      const section = document.querySelector<HTMLElement>(`[data-section="${name}"]`) || document.getElementById(name);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // optional: close mobile menu if link has data-close-menu
      if (target.hasAttribute('data-close-menu')) {
        document.querySelector('.navigator-header')?.classList.remove('active');
        document.querySelector('.menu-overlay')?.classList.remove('active');
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}