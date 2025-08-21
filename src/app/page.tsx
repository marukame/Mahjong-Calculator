// src/app/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Player, Settings as SettingsType, Result } from '@/types/mahjong';
import { DEFAULT_PLAYERS, DEFAULT_SETTINGS, UMA_PRESETS, DEFAULT_UMA_PRESET } from '@/constants/mahjong';
import SettingsPanel from '@/components/MahjongCalculator/SettingsPanel';
import PlayerInput from '@/components/MahjongCalculator/PlayerInput';
import ActionButtons from '@/components/MahjongCalculator/ActionButtons';
import ResultsDisplay from '@/components/MahjongCalculator/ResultsDisplay';
import { calculateMahjongResults, validateCalculationSum, debugCalculation } from '@/utils/calculationUtils';

export default function Home() {
  // State管理
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [results, setResults] = useState<Result[] | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでマウント完了を待つ
  useEffect(() => {
    setMounted(true);
  }, []);

  // ウマプリセットの初期化
  useEffect(() => {
    if (mounted && !settings.umaPreset) {
      const defaultPreset = UMA_PRESETS.find(p => p.id === DEFAULT_UMA_PRESET);
      if (defaultPreset) {
        setSettings(prev => ({
          ...prev,
          umaPreset: DEFAULT_UMA_PRESET,
          uma: defaultPreset.uma
        }));
      }
    }
  }, [mounted, settings.umaPreset]);

  // サーバーレンダリング時は何も表示しない
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-4 rounded-full inline-block mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // プレイヤー名変更
  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  // プレイヤースコア変更
  const handlePlayerScoreChange = (index: number, score: string) => {
    const newPlayers = [...players];
    newPlayers[index].score = parseInt(score) || 0;
    setPlayers(newPlayers);
  };

  // 設定変更
  const handleSettingsChange = (newSettings: SettingsType) => {
    setSettings(newSettings);
  };

  // 設定パネル表示切り替え
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // 精算計算
  const handleCalculate = () => {
    const calculations = calculateMahjongResults(players, settings);
    
    // デバッグ出力（開発時のみ）
    debugCalculation(calculations, settings);
    
    // 計算結果の検証
    if (!validateCalculationSum(calculations)) {
      console.warn('計算結果の合計がゼロになっていません。計算式を確認してください。');
    } else {
      console.log('✅ 計算結果の合計は正しくゼロです。');
    }
    
    setResults(calculations);
  };

  // リセット
  const handleReset = () => {
    setPlayers(players.map(player => ({ ...player, score: settings.startingPoints })));
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-pink-100">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  麻雀精算アプリ
                </h1>
                <p className="text-gray-800 text-sm">点数を入力して精算を計算しましょう</p>
              </div>
            </div>
          </div>
        </div>

        {/* 設定パネル（アコーディオン形式） */}
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          isVisible={showSettings}
          onToggle={handleToggleSettings}
        />

        {/* プレイヤー入力 */}
        <PlayerInput
          players={players}
          onPlayerNameChange={handlePlayerNameChange}
          onPlayerScoreChange={handlePlayerScoreChange}
        />

        {/* 操作ボタン */}
        <ActionButtons
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {/* 結果表示 */}
        {results && (
          <ResultsDisplay
            results={results}
            settings={settings}
          />
        )}
      </div>
    </div>
  );
}