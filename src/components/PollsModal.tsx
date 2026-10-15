import React, { useState } from 'react';
import { ArrowLeft, Check, TrendingUp, Info } from 'lucide-react';

interface PollsModalProps {
  initialTab?: 'Senate' | 'House' | 'Governor' | 'Approval';
  onBack: () => void;
}

export const PollsModal: React.FC<PollsModalProps> = ({ initialTab = 'Senate', onBack }) => {
  const [activeTab, setActiveTab] = useState<'Senate' | 'House' | 'Governor' | 'Approval'>(initialTab);

  const senatePolls = [
    {
      state: 'Texas',
      demCandidate: 'James Talarico (D)',
      demPct: 48,
      repCandidate: 'Republican Incumbent (R)',
      repPct: 46,
      pollster: 'NYT / Siena College',
      date: 'Oct 12-14, 2026',
      lead: 'D +2'
    },
    {
      state: 'Georgia',
      demCandidate: 'Jon Ossoff (D)',
      demPct: 50,
      repCandidate: 'Republican Challenger (R)',
      repPct: 47,
      pollster: 'Marist / Atlanta Journal',
      date: 'Oct 10-13, 2026',
      lead: 'D +3'
    },
    {
      state: 'Ohio',
      demCandidate: 'Sherrod Brown (D)',
      demPct: 47,
      repCandidate: 'Republican Nominee (R)',
      repPct: 48,
      pollster: 'Quinnipiac University',
      date: 'Oct 9-12, 2026',
      lead: 'R +1'
    },
    {
      state: 'Montana',
      demCandidate: 'Jon Tester (D)',
      demPct: 46,
      repCandidate: 'Republican Nominee (R)',
      repPct: 49,
      pollster: 'Emerson College',
      date: 'Oct 8-11, 2026',
      lead: 'R +3'
    }
  ];

  const housePolls = [
    {
      label: 'Generic Congressional Ballot',
      demPct: 47.4,
      repPct: 46.1,
      undecided: 6.5,
      lead: 'Dem +1.3',
      source: 'FiveThirtyEight / NYT Average'
    },
    {
      label: 'Key Tossup Districts (42 seats)',
      demSeats: 21,
      repSeats: 21,
      lead: 'Even Split',
      source: 'Cook Political Report Analysis'
    }
  ];

  const governorPolls = [
    {
      state: 'North Carolina',
      demCandidate: 'Josh Stein (D)',
      demPct: 51,
      repCandidate: 'Mark Robinson (R)',
      repPct: 42,
      lead: 'D +9'
    },
    {
      state: 'New Hampshire',
      demCandidate: 'Joyce Craig (D)',
      demPct: 48,
      repCandidate: 'Kelly Ayotte (R)',
      repPct: 47,
      lead: 'D +1'
    }
  ];

  const approvalData = {
    approve: 42.1,
    disapprove: 53.4,
    neutral: 4.5,
    sample: '1,420 Registered Voters',
    margin: '± 2.9 percentage points'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto border-x border-[#e2e2e2]">
      {/* Header */}
      <header className="border-b border-[#e2e2e2] px-3.5 h-12 flex items-center justify-between sticky top-0 bg-white z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-sans font-medium hover:text-[#5a5a5a]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <h1 className="font-bold text-[16px] tracking-tight font-sans">
          Election 2026 Polls
        </h1>

        <div className="w-12"></div>
      </header>

      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-[#121212] bg-[#f7f7f7] text-[11px] font-bold">
        {(['Senate', 'House', 'Governor', 'Approval'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 transition-colors border-r border-[#e2e2e2] last:border-r-0 ${
              activeTab === tab
                ? 'bg-[#121212] text-white'
                : 'text-[#121212] hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#990000]">
            MIDTERM BATTLEGROUND TRACKER
          </span>
          <h2 className="headline-serif text-[22px] font-bold mt-1 leading-snug">
            {activeTab === 'Senate' && 'State of the Senate: Control on the Line'}
            {activeTab === 'House' && 'House Forecast: Battle for the Gavel'}
            {activeTab === 'Governor' && 'Gubernatorial Races: Key Statewide Contests'}
            {activeTab === 'Approval' && 'Presidential & Congressional Job Approval'}
          </h2>
          <p className="summary-serif text-[13px] text-[#5a5a5a] mt-1">
            Grounded in rigorous state and national polling averages weighted for methodology and sample size.
          </p>
        </div>

        {/* Tab Content: SENATE */}
        {activeTab === 'Senate' && (
          <div className="space-y-4">
            {senatePolls.map(poll => (
              <div key={poll.state} className="border border-[#e2e2e2] p-3 rounded-sm bg-white shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[15px] text-[#121212] font-sans">
                    {poll.state} Senate
                  </h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-sm ${
                    poll.lead.startsWith('D') ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {poll.lead}
                  </span>
                </div>

                {/* Bars */}
                <div className="space-y-2 mb-2 text-[12px] font-sans">
                  <div>
                    <div className="flex justify-between font-medium mb-0.5">
                      <span className="text-blue-900">{poll.demCandidate}</span>
                      <span className="font-bold">{poll.demPct}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-xs overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${poll.demPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-0.5">
                      <span className="text-red-900">{poll.repCandidate}</span>
                      <span className="font-bold">{poll.repPct}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-xs overflow-hidden">
                      <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${poll.repPct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-[#727272] flex justify-between border-t border-[#f0f0f0] pt-1.5 mt-2">
                  <span>{poll.pollster}</span>
                  <span>{poll.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: HOUSE */}
        {activeTab === 'House' && (
          <div className="space-y-4">
            <div className="border border-[#e2e2e2] p-3.5 rounded-sm">
              <h3 className="font-bold text-[14px] text-[#121212] mb-1">
                Generic Congressional Ballot
              </h3>
              <p className="text-[12px] text-[#5a5a5a] mb-3">
                "If the election for Congress were held today, which party's candidate would you support?"
              </p>

              <div className="flex h-5 rounded-xs overflow-hidden text-[10px] font-bold text-white mb-2">
                <div className="bg-blue-600 flex items-center justify-center" style={{ width: `${housePolls[0].demPct}%` }}>
                  DEM {housePolls[0].demPct}%
                </div>
                <div className="bg-red-600 flex items-center justify-center" style={{ width: `${housePolls[0].repPct}%` }}>
                  REP {housePolls[0].repPct}%
                </div>
                <div className="bg-gray-400 flex items-center justify-center" style={{ width: `${housePolls[0].undecided}%` }}>
                  6.5%
                </div>
              </div>

              <div className="text-[11px] text-[#727272] flex justify-between">
                <span>Spread: <strong className="text-blue-700">{housePolls[0].lead}</strong></span>
                <span>Source: {housePolls[0].source}</span>
              </div>
            </div>

            <div className="border border-[#e2e2e2] p-3.5 rounded-sm">
              <h3 className="font-bold text-[14px] text-[#121212] mb-1">
                Competitive Districts Map
              </h3>
              <p className="text-[12px] text-[#5a5a5a] mb-2">
                Democrats need a net gain of 4 seats to reclaim the House majority in 2026.
              </p>
              <div className="grid grid-cols-2 gap-2 text-center text-[12px] font-bold">
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <div className="text-blue-800 text-[18px]">213</div>
                  <div className="text-[10px] font-medium text-[#5a5a5a]">Likely / Lean Dem</div>
                </div>
                <div className="bg-red-50 border border-red-200 p-2 rounded">
                  <div className="text-red-800 text-[18px]">218</div>
                  <div className="text-[10px] font-medium text-[#5a5a5a]">Likely / Lean Rep</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: GOVERNOR */}
        {activeTab === 'Governor' && (
          <div className="space-y-4">
            {governorPolls.map(poll => (
              <div key={poll.state} className="border border-[#e2e2e2] p-3 rounded-sm bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[15px]">{poll.state}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                    {poll.lead}
                  </span>
                </div>
                <div className="space-y-1.5 text-[12px]">
                  <div className="flex justify-between">
                    <span>{poll.demCandidate}</span>
                    <span className="font-bold">{poll.demPct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-xs overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${poll.demPct}%` }} />
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>{poll.repCandidate}</span>
                    <span className="font-bold">{poll.repPct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-xs overflow-hidden">
                    <div className="h-full bg-red-600" style={{ width: `${poll.repPct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: APPROVAL */}
        {activeTab === 'Approval' && (
          <div className="border border-[#e2e2e2] p-3.5 rounded-sm space-y-3">
            <h3 className="font-bold text-[15px]">Presidential Job Approval</h3>
            <p className="text-[12px] text-[#5a5a5a]">
              Weighted average of national public surveys conducted Oct. 1–14, 2026.
            </p>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[12px] font-medium mb-1">
                  <span className="text-green-800 font-bold">Approve</span>
                  <span className="font-bold">{approvalData.approve}%</span>
                </div>
                <div className="w-full h-3.5 bg-gray-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${approvalData.approve}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-medium mb-1">
                  <span className="text-red-800 font-bold">Disapprove</span>
                  <span className="font-bold">{approvalData.disapprove}%</span>
                </div>
                <div className="w-full h-3.5 bg-gray-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: `${approvalData.disapprove}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-[#f7f7f7] p-2.5 rounded text-[11px] text-[#5a5a5a] space-y-1">
              <div className="flex justify-between">
                <span>Net Approval:</span>
                <span className="font-bold text-red-700">-11.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Sample Size:</span>
                <span>{approvalData.sample}</span>
              </div>
              <div className="flex justify-between">
                <span>Margin of Error:</span>
                <span>{approvalData.margin}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Return */}
      <div className="p-3.5 border-t border-[#e2e2e2] bg-white">
        <button
          onClick={onBack}
          className="w-full bg-[#121212] text-white py-2.5 rounded-sm font-bold text-[13px] hover:bg-[#333]"
        >
          Return to Front Page
        </button>
      </div>
    </div>
  );
};
