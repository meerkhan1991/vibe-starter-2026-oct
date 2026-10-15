import React from 'react';
import { X, User, Bookmark, CheckCircle, Shield, Award, LogOut } from 'lucide-react';
import { Article } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscriber: boolean;
  onToggleSubscriber: () => void;
  savedArticlesCount: number;
  onViewSaved: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  isSubscriber,
  onToggleSubscriber,
  savedArticlesCount,
  onViewSaved
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white max-w-sm w-full rounded-xs border border-[#121212] p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5a5a5a] hover:text-[#121212] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-[18px]">
            T
          </div>
          <div>
            <h3 className="font-bold text-[16px] text-[#121212]">Times Reader</h3>
            <p className="text-[12px] text-[#5a5a5a]">reader@nytimes-digital.com</p>
          </div>
        </div>

        <div className="border-t border-[#e2e2e2] py-3 space-y-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-[#5a5a5a]">Membership Status:</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              isSubscriber ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isSubscriber ? 'All-Access Digital' : 'Free Reader Access'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <span className="text-[#5a5a5a]">Saved for Later:</span>
            <button
              onClick={() => {
                onViewSaved();
                onClose();
              }}
              className="font-bold text-[#2b6cb0] hover:underline flex items-center gap-1"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{savedArticlesCount} Articles</span>
            </button>
          </div>
        </div>

        <div className="border-t border-[#e2e2e2] pt-4 mt-2 space-y-2">
          <button
            onClick={onToggleSubscriber}
            className={`w-full py-2 px-3 rounded-xs text-[12px] font-bold border transition-colors cursor-pointer ${
              isSubscriber 
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'bg-[#121212] text-white hover:bg-[#333]'
            }`}
          >
            {isSubscriber ? 'Cancel Membership (Demo)' : 'Activate Subscription ($1/week)'}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-[12px] text-[#5a5a5a] hover:text-[#121212] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
