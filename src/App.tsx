import React, { useState, useEffect, useCallback } from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { SessionHistoryPanel, SessionItem } from './components/SessionHistoryPanel';
import { THEMES, ThemeType } from './theme';

// Safe LocalStorage writing utility to prevent QuotaExceededError and permission exceptions
const safeLocalStorageSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`[Storage Warning] Failed to write key "${key}" to LocalStorage:`, e);
  }
};

// Fallback UUID generator in case crypto.randomUUID is not supported in the hosting context or secure frame
export const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Secure fallback random identifier
  return 'uid-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
};

export default function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const [theme, setTheme] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem('focus_theme');
      return (saved as ThemeType) || 'light';
    } catch (e) {
      console.error('Failed to load focus theme from storage:', e);
      return 'light';
    }
  });

  const [sessionsHistory, setSessionsHistory] = useState<SessionItem[]>(() => {
    try {
      const saved = localStorage.getItem('focus_sessions_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse focus session history from storage:', e);
      return [];
    }
  });

  useEffect(() => {
    safeLocalStorageSetItem('focus_theme', theme);
  }, [theme]);

  useEffect(() => {
    safeLocalStorageSetItem('focus_sessions_history', JSON.stringify(sessionsHistory));
  }, [sessionsHistory]);

  const t = THEMES[theme];
  
  const handleTimerStart = useCallback((goal: string) => {
    // Timer started hook - can be connected to analytics or local session tracking
  }, []);

  const handleTimerComplete = useCallback((task: string, durationSeconds: number) => {
    const newSession: SessionItem = {
      id: generateUUID(),
      date: new Date().toISOString(),
      task: task || 'General Focus',
      duration: durationSeconds,
    };
    
    setSessionsHistory(prev => {
      const updated = [newSession, ...prev];
      // Cap at 100 historical records to protect LocalStorage capacity limit and keep DOM renders highly performant
      return updated.slice(0, 100);
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    setSessionsHistory([]);
  }, []);

  const handleDeleteSession = useCallback((id: string) => {
    setSessionsHistory(prev => prev.filter(session => session.id !== id));
  }, []);

  return (
    <div className={`flex flex-col w-full min-h-screen font-sans overflow-y-auto transition-colors duration-500 relative ${t.mainBg}`}>
      
      {/* Header / Status Bar */}
      <header className={`h-16 border-b flex items-center justify-between px-4 md:px-8 shrink-0 relative z-10 transition-colors duration-500 ${t.cardBg} ${t.borderMuted}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${t.iconBg} ${t.iconText}`}>
            S
          </div>
          <span className={`font-semibold tracking-tight hidden sm:block ${t.primaryText}`}>
            SYNCHRONY <span className={`font-normal underline underline-offset-4 ml-1 ${t.secondaryText}`}>Focus Room</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {isTimerRunning && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${t.inputBox} ${t.border}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${t.accentTargetBg}`}></div>
              <span className={`text-xs font-medium uppercase tracking-wider hidden sm:inline-block ${t.primaryText}`}>Active Session</span>
              <span className={`text-xs font-medium uppercase tracking-wider sm:hidden ${t.primaryText}`}>Active</span>
            </div>
          )}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200/20">
             <button 
                onClick={() => setTheme(theme === 'rose' ? 'light' : 'rose')} 
                className={`w-6 h-6 rounded-full bg-[#AB8882] shadow-inner focus:outline-none transition-all ${theme === 'rose' ? 'ring-2 ring-offset-2 ring-[#AB8882] ring-offset-white/20' : 'hover:scale-110'}`} 
                aria-label="Cozy Rose Earth Theme"
             />
             <button 
                onClick={() => setTheme(theme === 'midnight' ? 'light' : 'midnight')} 
                className={`w-6 h-6 rounded-full bg-[#13121C] shadow-inner focus:outline-none transition-all ${theme === 'midnight' ? 'ring-2 ring-offset-2 ring-[#13121C] ring-offset-white/20' : 'hover:scale-110'}`}
                aria-label="Midnight Hydrangea Theme" 
             />
             <button 
                onClick={() => setTheme(theme === 'sage' ? 'light' : 'sage')} 
                className={`w-6 h-6 rounded-full bg-[#2D3A34] shadow-inner focus:outline-none transition-all ${theme === 'sage' ? 'ring-2 ring-offset-2 ring-[#2D3A34] ring-offset-white/20' : 'hover:scale-110'}`} 
                aria-label="Sage Sanctuary Theme"
             />
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-8 min-h-0 relative z-10 max-w-[1300px] mx-auto w-full items-stretch justify-center">
        
        {/* Left Side: Focus Timer (Bento Grid Style) */}
        <div className="w-full md:w-[60%] lg:w-[65%] flex flex-col gap-6 shrink-0 md:shrink">
          <PomodoroTimer 
            onTimerStart={handleTimerStart}
            onTimerComplete={handleTimerComplete}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            t={t}
          />
        </div>

        {/* Right Side: Session History Panel */}
        <div className={`w-full md:w-[40%] lg:w-[35%] rounded-3xl shrink-0 md:shrink border flex flex-col overflow-hidden h-[500px] md:h-auto transition-colors duration-500 ${t.cardBg} ${t.border} ${t.shadow}`}>
          <SessionHistoryPanel 
            sessionsHistory={sessionsHistory}
            onClearHistory={handleClearHistory}
            onDeleteSession={handleDeleteSession}
            t={t}
          />
        </div>
      </main>

      {/* Footer / Branding */}
      <footer className={`hidden md:flex h-12 border-t items-center justify-center px-8 text-[10px] font-medium tracking-widest uppercase shrink-0 transition-colors duration-500 ${t.cardBg} ${t.borderMuted} ${t.secondaryText}`}>
        Deep Work Mode Active • No Distractions Policy Enabled • Session v1.2
      </footer>
    </div>
  );
}

