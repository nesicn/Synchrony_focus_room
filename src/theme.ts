export type ThemeType = 'light' | 'rose' | 'midnight' | 'sage';

export interface ThemeConfig {
  mainBg: string;
  cardBg: string;
  primaryText: string;
  secondaryText: string;
  accentTargetBg: string;
  accentTargetText: string;
  accentText: string;
  accentBorder: string;
  border: string;
  borderMuted: string;
  inputBg: string;
  bubbleUser: string;
  bubbleAI: string;
  buttonHover: string;
  secondaryHover: string;
  inputBox: string;
  shadow: string;
  ring: string;
  ringBg: string;
  iconBg: string;
  iconText: string;
  presetBg: string;
  presetText: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  light: {
    mainBg: 'bg-zinc-50',
    cardBg: 'bg-white',
    primaryText: 'text-zinc-900',
    secondaryText: 'text-zinc-400',
    accentTargetBg: 'bg-zinc-900',
    accentTargetText: 'text-white',
    accentText: 'text-zinc-900',
    accentBorder: 'border-zinc-900',
    border: 'border-zinc-200',
    borderMuted: 'border-zinc-100',
    inputBg: 'bg-transparent',
    bubbleUser: 'bg-zinc-900 text-white border border-zinc-900',
    bubbleAI: 'bg-white border border-zinc-200 text-zinc-700',
    buttonHover: 'hover:bg-zinc-800',
    secondaryHover: 'hover:bg-zinc-50',
    inputBox: 'bg-zinc-100',
    shadow: 'shadow-sm',
    ring: 'text-zinc-900',
    ringBg: 'bg-zinc-100',
    iconBg: 'bg-zinc-900',
    iconText: 'text-white',
    presetBg: 'bg-white hover:bg-zinc-50 focus:bg-zinc-50 text-zinc-600',
    presetText: 'text-zinc-600',
  },
  rose: {
    mainBg: 'bg-[#AB8882]',
    cardBg: 'bg-[#E0CBB9]',
    primaryText: 'text-[#3A0E1E]',
    secondaryText: 'text-[#6E4A4C]',
    accentTargetBg: 'bg-[#3A0E1E]',
    accentTargetText: 'text-[#E0CBB9]',
    accentText: 'text-[#3A0E1E]',
    accentBorder: 'border-[#3A0E1E]',
    border: 'border-[#3A0E1E]/20',
    borderMuted: 'border-[#3A0E1E]/10',
    inputBg: 'bg-transparent',
    bubbleUser: 'bg-[#3A0E1E] text-[#E0CBB9] border border-[#3A0E1E]',
    bubbleAI: 'bg-[#E0CBB9] border border-[#3A0E1E]/20 text-[#3A0E1E]',
    buttonHover: 'hover:bg-[#3A0E1E]/90',
    secondaryHover: 'hover:bg-[#3A0E1E]/10',
    inputBox: 'bg-[#3A0E1E]/5',
    shadow: 'shadow-lg shadow-[#3A0E1E]/10',
    ring: 'text-[#3A0E1E]',
    ringBg: 'bg-[#3A0E1E]/20',
    iconBg: 'bg-[#3A0E1E]',
    iconText: 'text-[#E0CBB9]',
    presetBg: 'bg-[#3A0E1E]/5 hover:bg-[#3A0E1E]/10 focus:bg-[#3A0E1E]/10 text-[#3A0E1E]',
    presetText: 'text-[#3A0E1E]',
  },
  midnight: {
    mainBg: 'bg-[#13121C]',
    cardBg: 'bg-[#1D1B2B]',
    primaryText: 'text-[#E4E2F0]',
    secondaryText: 'text-[#7E7A9C]',
    accentTargetBg: 'bg-[#A2D2FF]',
    accentTargetText: 'text-[#13121C]',
    accentText: 'text-[#A2D2FF]',
    accentBorder: 'border-[#A2D2FF]',
    border: 'border-[#E4E2F0]/10',
    borderMuted: 'border-[#E4E2F0]/5',
    inputBg: 'bg-transparent',
    bubbleUser: 'bg-[#A2D2FF]/20 border border-[#A2D2FF]/30 text-[#A2D2FF]',
    bubbleAI: 'bg-[#1D1B2B] border border-[#E4E2F0]/10 text-[#E4E2F0]',
    buttonHover: 'hover:bg-[#A2D2FF]/90',
    secondaryHover: 'hover:bg-[#E4E2F0]/10',
    inputBox: 'bg-[#13121C]',
    shadow: 'shadow-lg shadow-[#000000]/50',
    ring: 'text-[#A2D2FF]',
    ringBg: 'bg-[#E4E2F0]/10',
    iconBg: 'bg-[#A2D2FF]/20',
    iconText: 'text-[#A2D2FF]',
    presetBg: 'bg-[#E4E2F0]/5 hover:bg-[#E4E2F0]/10 focus:bg-[#E4E2F0]/10 text-[#A2D2FF]/80',
    presetText: 'text-[#E4E2F0]',
  },
  sage: {
    mainBg: 'bg-[#2D3A34]',
    cardBg: 'bg-[#3A4B43]',
    primaryText: 'text-[#F4F6F5]',
    secondaryText: 'text-[#93A39B]',
    accentTargetBg: 'bg-[#E9D8A6]',
    accentTargetText: 'text-[#2D3A34]',
    accentText: 'text-[#E9D8A6]',
    accentBorder: 'border-[#E9D8A6]',
    border: 'border-[#F4F6F5]/10',
    borderMuted: 'border-[#F4F6F5]/5',
    inputBg: 'bg-transparent',
    bubbleUser: 'bg-[#E9D8A6]/20 border border-[#E9D8A6]/30 text-[#E9D8A6]',
    bubbleAI: 'bg-[#3A4B43] border border-[#F4F6F5]/10 text-[#F4F6F5]',
    buttonHover: 'hover:bg-[#E9D8A6]/90',
    secondaryHover: 'hover:bg-[#F4F6F5]/10',
    inputBox: 'bg-[#2D3A34]',
    shadow: 'shadow-lg shadow-[#000000]/20',
    ring: 'text-[#E9D8A6]',
    ringBg: 'bg-[#F4F6F5]/10',
    iconBg: 'bg-[#E9D8A6]',
    iconText: 'text-[#2D3A34]',
    presetBg: 'bg-[#F4F6F5]/5 hover:bg-[#F4F6F5]/10 focus:bg-[#F4F6F5]/10 text-[#E9D8A6]/80',
    presetText: 'text-[#F4F6F5]',
  }
};
