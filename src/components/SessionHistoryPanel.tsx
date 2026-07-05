import React, { useState } from 'react';
import { History, Trash2, Calendar, Clock, X, BarChart3 } from 'lucide-react';
import { ThemeConfig } from '../theme';

export interface SessionItem {
  id: string;
  date: string;
  task: string;
  duration: number;
}

interface SessionHistoryPanelProps {
  sessionsHistory: SessionItem[];
  onClearHistory: () => void;
  onDeleteSession: (id: string) => void;
  t: ThemeConfig;
}

export function SessionHistoryPanel({
  sessionsHistory,
  onClearHistory,
  onDeleteSession,
  t
}: SessionHistoryPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatSessionDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Check if it's today
      if (date.toDateString() === now.toDateString()) {
        return `Today at ${timeStr}`;
      }
      
      // Check if it's yesterday
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${timeStr}`;
      }

      // Check if it's within the same year
      if (date.getFullYear() === now.getFullYear()) {
        const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        return `${dateStr} at ${timeStr}`;
      }

      // Otherwise show full date
      const dateStr = date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
      return `${dateStr} at ${timeStr}`;
    } catch (e) {
      return 'Completed Session';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (secs === 0) {
      return `${mins}m`;
    }
    return `${mins}m ${secs}s`;
  };

  const totalFocusSeconds = sessionsHistory.reduce((sum, item) => sum + item.duration, 0);
  
  const formatTotalTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) {
      return `${mins}m`;
    }
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (remainingMins === 0) {
      return `${hrs}h`;
    }
    return `${hrs}h ${remainingMins}m`;
  };

  const handleClearAll = () => {
    if (showConfirm) {
      onClearHistory();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`p-4 md:p-6 border-b shrink-0 flex items-center justify-between transition-colors duration-500 ${t.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${t.borderMuted} ${t.primaryText}`}>
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className={`text-xs font-bold uppercase tracking-wide transition-colors ${t.primaryText}`}>Focus History</div>
            <div className={`text-[10px] flex items-center gap-1 transition-colors ${t.secondaryText}`}>
              Past Sessions & Progress
            </div>
          </div>
        </div>

        {sessionsHistory.length > 0 && (
          <div className="flex items-center gap-2">
            {showConfirm ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearAll}
                  className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Confirm Clear
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className={`px-2 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${t.border} ${t.primaryText} hover:bg-black/5`}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className={`p-2 rounded-xl transition-all border bg-transparent opacity-60 hover:opacity-100 ${t.border} ${t.primaryText} hover:bg-opacity-10`}
                title="Clear all sessions"
                aria-label="Clear all focus history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stats Summary Panel (Only shown when there is history) */}
      {sessionsHistory.length > 0 && (
        <div className={`px-4 py-3 border-b flex items-center justify-between gap-4 transition-colors duration-500 bg-black/5 ${t.border}`}>
          <div className="flex items-center gap-2">
            <BarChart3 className={`w-3.5 h-3.5 ${t.accentText}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${t.secondaryText}`}>Focus Stats</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <div className="flex items-center gap-1.5">
              <span className={t.secondaryText}>Total:</span>
              <span className={t.primaryText}>{formatTotalTime(totalFocusSeconds)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={t.secondaryText}>Sessions:</span>
              <span className={t.primaryText}>{sessionsHistory.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sessions Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar flex flex-col gap-3">
        {sessionsHistory.length > 0 ? (
          sessionsHistory.map((session) => (
            <div
              key={session.id}
              className={`group relative flex flex-col gap-2 p-4 rounded-xl border transition-all ${t.border} hover:shadow-sm bg-black/[0.01]`}
            >
              {/* Delete Button */}
              <button
                onClick={() => onDeleteSession(session.id)}
                className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded-md ${t.secondaryText} hover:text-red-500 hover:bg-black/5`}
                title="Delete this session record"
                aria-label="Delete session"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Date & Duration Info */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold opacity-70">
                <div className={`flex items-center gap-1 ${t.primaryText}`}>
                  <Calendar className="w-3 h-3 opacity-60" />
                  <span>{formatSessionDate(session.date)}</span>
                </div>
                <span className="opacity-40">•</span>
                <div className={`flex items-center gap-1 ${t.accentText}`}>
                  <Clock className="w-3 h-3" />
                  <span>{formatDuration(session.duration)}</span>
                </div>
              </div>

              {/* Focused Task Description */}
              <p className={`text-sm font-medium leading-relaxed pr-6 ${t.primaryText} break-words`}>
                {session.task}
              </p>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-dashed mb-4 opacity-40 animate-pulse ${t.border} ${t.primaryText}`}>
              <Clock className="w-6 h-6" />
            </div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${t.primaryText}`}>No sessions logged</h3>
            <p className={`text-xs max-w-[200px] leading-relaxed ${t.secondaryText}`}>
              Complete a deep focus interval to see your completed tasks logged here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
