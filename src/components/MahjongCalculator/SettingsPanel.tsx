// src/components/MahjongCalculator/SettingsPanel.tsx
'use client'

import React from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { SettingsPanelProps } from '@/types/mahjong';
import { RATE_OPTIONS, UMA_PRESETS } from '@/constants/mahjong';

interface AccordionSettingsPanelProps extends SettingsPanelProps {
  onToggle: () => void;
}

const SettingsPanel: React.FC<AccordionSettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isVisible,
  onToggle
}) => {
  // ウマプリセット変更時の処理
  const handleUmaPresetChange = (presetId: string) => {
    const preset = UMA_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onSettingsChange({
        ...settings,
        umaPreset: presetId,
        uma: preset.uma
      });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg mb-6 border border-purple-100">
      {/* アコーディオンヘッダー（常に表示） */}
      <div 
        className="p-6 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-purple-800 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            ゲーム設定
          </h2>
          <div className="flex items-center space-x-2">
            {isVisible ? (
              <ChevronUp className="w-5 h-5 text-purple-600 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-600 transition-transform duration-200" />
            )}
          </div>
        </div>
      </div>

      {/* アコーディオン内容（条件付き表示） */}
      <div className={`transition-all duration-300 ease-in-out ${
        isVisible ? 'max-h-none opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            

            {/* レート設定 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <label className="block text-sm font-medium text-blue-800 mb-2">
                レート
              </label>
              <select
                value={settings.rate}
                onChange={(e) => onSettingsChange({
                  ...settings, 
                  rate: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {RATE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 持ち点・返し点設定 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
              <label className="block text-sm font-medium text-orange-800 mb-2">
                点数設定
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-orange-700">持ち点:</span>
                  <input
                    type="number"
                    value={settings.startingPoints}
                    onChange={(e) => onSettingsChange({
                      ...settings, 
                      startingPoints: parseInt(e.target.value) || 0
                    })}
                    className="w-full px-2 py-1 border border-yellow-200 rounded text-xs"
                  />
                </div>
                <div>
                  <span className="text-xs text-orange-700">返し点:</span>
                  <input
                    type="number"
                    value={settings.returnPoints}
                    onChange={(e) => onSettingsChange({
                      ...settings, 
                      returnPoints: parseInt(e.target.value) || 0
                    })}
                    className="w-full px-2 py-1 border border-yellow-200 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            {/* ウマ設定 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <label className="block text-sm font-medium text-green-800 mb-2">
                ウマ設定
              </label>
              <select
                value={settings.umaPreset}
                onChange={(e) => handleUmaPresetChange(e.target.value)}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {UMA_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-xs text-green-600">
                {UMA_PRESETS.find(p => p.id === settings.umaPreset)?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;