import React from 'react';
import { Menu, User, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenProfile: () => void;
  onOpenSubscribe: () => void;
  isSubscriber: boolean;
  viewMode: 'mobile' | 'fluid';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenProfile,
  onOpenSubscribe,
  isSubscriber,
  viewMode,
  onToggleViewMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2]">
      {/* Device Frame View Switcher Floating Badge (Top subtle bar) */}
      <div className="bg-[#121212] text-white px-3 py-1 text-[11px] flex items-center justify-between font-sans">
        <span className="flex items-center gap-1.5 opacity-90">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>NYT Live Digital Edition</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleViewMode}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer text-[10px] uppercase font-bold"
            title="Toggle between Mobile iOS frame and Fluid view"
          >
            {viewMode === 'mobile' ? (
              <>
                <Smartphone className="w-3 h-3 text-amber-400" />
                <span>Mobile Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3 text-blue-400" />
                <span>Fluid Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Masthead Mobile Row */}
      <div className="flex items-center justify-between px-3.5 h-12">
        {/* Left: Hamburger Menu Icon */}
        <button
          onClick={onOpenMenu}
          aria-label="Open Menu"
          className="p-1 -ml-1 text-[#121212] focus:outline-none cursor-pointer hover:opacity-70 transition-opacity"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>

        {/* Center: Iconic NYT Logo */}
        <a
          className="nyt-logo text-[28px] sm:text-[32px] tracking-normal font-normal select-none leading-none pt-0.5 text-center text-[#121212] cursor-pointer hover:opacity-90"
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          The New York Times
        </a>

        {/* Right: User Profile Icon */}
        <button
          onClick={onOpenProfile}
          aria-label="User Account"
          className="p-1 -mr-1 text-[#121212] focus:outline-none cursor-pointer hover:opacity-70 transition-opacity relative"
          type="button"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              clipRule="evenodd"
              d="M12 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm-8 16.25c0-3.175 4.03-5.25 8-5.25s8 2.075 8 5.25V21H4v-2.25z"
              fillRule="evenodd"
            ></path>
          </svg>
          {isSubscriber && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Secondary Meta Bar: Date & Subscribe Button */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-[#e2e2e2] text-[11px] bg-white">
        <span className="font-bold tracking-tight text-[#121212] uppercase sm:normal-case font-sans">
          Wednesday, October 14, 2026
        </span>
        {isSubscriber ? (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
            Subscriber Edition
          </span>
        ) : (
          <button
            onClick={onOpenSubscribe}
            className="border border-[#121212] rounded-xs px-2.5 py-1 text-[11px] font-bold text-[#121212] hover:bg-[#121212] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Subscribe for $1/week
          </button>
        )}
      </div>
    </header>
  );
};
