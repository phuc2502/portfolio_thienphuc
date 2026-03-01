
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { t, toggleLanguage, language } = useTranslation();

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-end items-center p-6 md:p-10 pointer-events-none">
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] hover:italic transition-all duration-300 pointer-events-auto mix-blend-difference bg-white/5 backdrop-blur-md md:bg-white/5 md:backdrop-blur-md py-2 px-4 sm:px-5 rounded-full border border-white/10 flex items-center gap-2 group"
          title={language === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
        >
          <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span className="relative">
            <span className="inline-block transition-transform duration-300 group-hover:scale-110">{language === 'en' ? 'EN' : 'VI'}</span>
          </span>
        </button>

        {/* Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:italic transition-all duration-300 pointer-events-auto mix-blend-difference bg-white/5 backdrop-blur-md md:bg-transparent md:backdrop-blur-none py-2 px-5 sm:px-6 rounded-full md:p-0 border border-white/10 md:border-none"
        >
          {isMenuOpen ? `[ ${t('header.close')} ]` : `[ ${t('header.moreInfo')} ]`}
        </button>
      </div>
    </header>
  );
};

export default Header;
