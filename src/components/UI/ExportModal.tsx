import { useState } from 'react';
import { X, Download, Video, Loader2 } from 'lucide-react';
import type { LEDConfig } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isExporting: boolean;
  progress: number;
  onExport: (config: LEDConfig, options: { duration: number; width: number; height: number; fps: number }) => void;
  currentConfig: LEDConfig;
}

const DURATION_OPTIONS = [
  { label: '5秒', value: 5 },
  { label: '10秒', value: 10 },
  { label: '15秒', value: 15 },
  { label: '30秒', value: 30 },
];

const RESOLUTION_OPTIONS = [
  { label: '横屏 1280×400', value: '1280x400', width: 1280, height: 400 },
  { label: '横屏 1920×600', value: '1920x600', width: 1920, height: 600 },
  { label: '竖屏 400×800', value: '400x800', width: 400, height: 800 },
  { label: '正方形 800×800', value: '800x800', width: 800, height: 800 },
];

export function ExportModal({
  isOpen,
  onClose,
  isExporting,
  progress,
  onExport,
  currentConfig,
}: ExportModalProps) {
  const [duration, setDuration] = useState(10);
  const [resolution, setResolution] = useState(RESOLUTION_OPTIONS[0]);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(currentConfig, {
      duration,
      width: resolution.width,
      height: resolution.height,
      fps: 30,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md glass-panel rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-orbitron font-bold text-white">导出视频</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="w-8 h-8 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white/60 hover:text-white transition-colors btn-neon disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isExporting ? (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-neon-purple animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">正在导出视频...</p>
              <p className="text-white/50 text-sm mt-1">请稍候，渲染中</p>
            </div>
            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-pink transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-white/60 text-sm">{progress}%</p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">分辨率</label>
                <div className="grid grid-cols-2 gap-2">
                  {RESOLUTION_OPTIONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setResolution(r)}
                      className={`py-2.5 px-3 rounded-xl text-sm transition-all btn-neon ${
                        resolution.value === r.value
                          ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                          : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white/80'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">时长</label>
                <div className="grid grid-cols-4 gap-2">
                  {DURATION_OPTIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={`py-2.5 px-3 rounded-xl text-sm transition-all btn-neon ${
                        duration === d.value
                          ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                          : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white/80'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <p className="text-xs text-white/50 leading-relaxed">
                  💡 导出格式为 WebM 视频，支持在浏览器、VLC 等播放器中播放，也可转换为 GIF。
                  导出时长越长，文件越大，等待时间越久。竖向滚动建议选择竖屏分辨率。
                </p>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium flex items-center justify-center gap-2 shadow-neon-purple hover:opacity-90 transition-opacity btn-neon"
            >
              <Download className="w-5 h-5" />
              开始导出
            </button>
          </>
        )}
      </div>
    </div>
  );
}
