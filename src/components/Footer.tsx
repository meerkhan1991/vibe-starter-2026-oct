import React from 'react';

interface FooterProps {
  onOpenSubscribe: () => void;
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubscribe, onOpenLegal }) => {
  return (
    <footer className="max-w-md mx-auto px-3.5 border-t border-[#e2e2e2] pt-6 pb-12 text-center text-[11px] text-[#727272] font-sans">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="nyt-logo text-[24px] text-[#121212] mb-3 cursor-pointer select-none"
      >
        The New York Times
      </div>

      {/* Legal Links */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[#5a5a5a] mb-4">
        <span>© 2026 The New York Times Company</span>
        <button onClick={() => onOpenLegal('NYTCo')} className="hover:underline cursor-pointer">
          NYTCo
        </button>
        <button onClick={() => onOpenLegal('Contact Us')} className="hover:underline cursor-pointer">
          Contact Us
        </button>
        <button onClick={() => onOpenLegal('Accessibility')} className="hover:underline cursor-pointer">
          Accessibility
        </button>
        <button onClick={() => onOpenLegal('Privacy Policy')} className="hover:underline cursor-pointer">
          Privacy Policy
        </button>
        <button onClick={() => onOpenLegal('Terms of Service')} className="hover:underline cursor-pointer">
          Terms of Service
        </button>
        <button onClick={onOpenSubscribe} className="hover:underline cursor-pointer text-[#121212] font-semibold">
          Subscriptions
        </button>
      </div>

      <p className="text-[10px] text-gray-400">
        Mobile Web iOS Edition
      </p>
    </footer>
  );
};
