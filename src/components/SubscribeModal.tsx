import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribed
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'intro' | 'annual'>('intro');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSubscribed();
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3.5 animate-fade-in">
      <div className="bg-white max-w-sm w-full rounded-xs border-2 border-[#121212] overflow-hidden shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5a5a5a] hover:text-[#121212] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="p-5 text-center border-b border-[#e2e2e2] bg-[#fbfbfb]">
          <div className="nyt-logo text-[24px] text-[#121212] mb-1">
            The New York Times
          </div>
          <span className="inline-block bg-[#121212] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs mt-1">
            Special Limited-Time Offer
          </span>
          <h2 className="headline-serif text-[26px] font-bold text-[#121212] mt-2 leading-tight">
            Understand the world with independent journalism.
          </h2>
        </div>

        {/* Plan Selector */}
        <div className="p-5">
          <div className="space-y-3 mb-5">
            <button
              onClick={() => setSelectedPlan('intro')}
              className={`w-full text-left p-3.5 border-2 rounded-xs transition-all relative ${
                selectedPlan === 'intro'
                  ? 'border-[#121212] bg-[#f9f9f9]'
                  : 'border-[#e2e2e2] hover:border-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[15px] text-[#121212]">
                  Basic Digital Access
                </span>
                <span className="font-bold text-[16px] text-[#121212]">
                  $1/week
                </span>
              </div>
              <p className="text-[12px] text-[#5a5a5a]">
                Billed every 4 weeks for the first year. Cancel anytime.
              </p>
            </button>

            <button
              onClick={() => setSelectedPlan('annual')}
              className={`w-full text-left p-3.5 border-2 rounded-xs transition-all relative ${
                selectedPlan === 'annual'
                  ? 'border-[#121212] bg-[#f9f9f9]'
                  : 'border-[#e2e2e2] hover:border-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[15px] text-[#121212]">
                  All Access Annual
                </span>
                <span className="font-bold text-[16px] text-[#121212]">
                  $4/month
                </span>
              </div>
              <p className="text-[12px] text-[#5a5a5a]">
                Includes News, Games, Cooking, Wirecutter and The Athletic.
              </p>
            </button>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-5 text-[12px] text-[#333]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2b6cb0]" />
              <span>Unlimited subscriber-only reporting and investigations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2b6cb0]" />
              <span>Daily games: Wordle, Connections, The Mini, Spelling Bee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2b6cb0]" />
              <span>Listen to narrated audio versions of front-page articles</span>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubscribe}
            disabled={isSuccess}
            className="w-full bg-[#121212] text-white py-3 rounded-xs font-bold text-[14px] hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
          >
            {isSuccess ? (
              <>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                <span>Activating Subscription...</span>
              </>
            ) : (
              <span>Get Access for $1/week</span>
            )}
          </button>

          <p className="text-[10px] text-center text-[#727272] mt-3">
            Secure checkout. You can easily cancel online at any time.
          </p>
        </div>
      </div>
    </div>
  );
};
