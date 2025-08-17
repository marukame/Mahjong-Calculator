// src/constants/mahjong.ts
import { Player, Settings } from '@/types/mahjong';

export const DEFAULT_PLAYERS: Player[] = [
  { name: 'プレイヤー1', score: 25000 },
  { name: 'プレイヤー2', score: 25000 },
  { name: 'プレイヤー3', score: 25000 },
  { name: 'プレイヤー4', score: 25000 }
];

export const RATE_OPTIONS = [
  { value: 3, label: '点3' },
  { value: 5, label: '点5' },
  { value: 10, label: '点10' }
];

export const UMA_PRESETS = [
  {
    id: '5-10',
    label: '5-10',
    description: '1位+10, 2位+5, 3位-5, 4位-10',
    uma: { first: 10, second: 5, third: -5, fourth: -10 }
  },
  {
    id: '10-20', 
    label: '10-20',
    description: '1位+20, 2位+10, 3位-10, 4位-20',
    uma: { first: 20, second: 10, third: -10, fourth: -20 }
  },
  {
    id: '10-30',
    label: '10-30',
    description: '1位+30, 2位+10, 3位-10, 4位-30',
    uma: { first: 30, second: 10, third: -10, fourth: -30 }
  }
] as const;

export const DEFAULT_UMA_PRESET = '10-30';

export const DEFAULT_SETTINGS: Settings = {
  uma: { first: 30, second: 10, third: -10, fourth: -30 },
  rate: 3,     // 保持（今回は使用しない）
  startingPoints: 25000,  // 25000点持ち
  returnPoints: 30000,    // 30000点返し
  umaPreset: DEFAULT_UMA_PRESET  // ウマプリセットID
};

export const RANK_COLORS = {
  1: 'bg-gradient-to-r from-pink-200 to-rose-200 border-pink-300',
  2: 'bg-gradient-to-r from-blue-200 to-cyan-200 border-blue-300',
  3: 'bg-gradient-to-r from-green-200 to-emerald-200 border-green-300',
  4: 'bg-gradient-to-r from-purple-200 to-violet-200 border-purple-300'
} as const;

export const RANK_EMOJIS = {
  1: '🏆',
  2: '🥈', 
  3: '🥉',
  4: '🌸'
} as const;