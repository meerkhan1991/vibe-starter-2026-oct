import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  active: boolean;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children, active }) => {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className="relative mx-auto my-0 sm:my-6 transition-all duration-300">
      {/* Outer Phone Bezel (Only visible on larger screens) */}
      <div className="hidden sm:block absolute -inset-[12px] rounded-[52px] bg-[#222222] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] pointer-events-none z-50">
        {/* Subtle camera lens reflection on dynamic island */}
      </div>

      {/* Main Screen Container */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[880px] bg-white sm:rounded-[42px] overflow-hidden shadow-2xl relative flex flex-col z-10 border border-neutral-300 sm:border-transparent">
        {/* iOS Status Bar (Visible on desktop frame) */}
        <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 bg-white text-[#121212] select-none text-[13px] font-semibold tracking-tight z-40">
          <span>9:41</span>
          
          {/* Dynamic Island */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#1e1e1e]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Content Inside Screen */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="hidden sm:flex justify-center pb-2 pt-1 bg-white select-none pointer-events-none">
          <div className="w-32 h-1 bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};
