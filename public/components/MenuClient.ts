'use client';
import { useEffect } from 'react';

export default function MenuClient() {
  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.navigator-header');
    const overlay = document.querySelector('.menu-overlay');
    const closeLinks = document.querySelectorAll('[data-close-menu]');

    if (!menuToggle || !menu || !overlay) return;

    const toggle = () => {
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
    };
    const close = () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    };

    menuToggle.addEventListener('click', toggle);
    overlay.addEventListener('click', close);
    closeLinks.forEach(link => link.addEventListener('click', close));

    return () => {
      menuToggle.removeEventListener('click', toggle);
      overlay.removeEventListener('click', close);
      closeLinks.forEach(link => link.removeEventListener('click', close));
    };
  }, []);

  return null;
}