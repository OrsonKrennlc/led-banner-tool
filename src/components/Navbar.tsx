import { Maximize2, RotateCcw, Zap, Download } from 'lucide-react';
import { useLEDStore } from '../store/ledStore';

interface NavbarProps {
  onExportClick: () => void;
}

export function Navbar({ onExportClick }: NavbarProps) {
  const { setFullscreen, resetConfig } = useLEDStore();

  return (
    <header className="flex items-center justify-between py-4 px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center shadow-neon-purple">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-orbitron font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
            LED BANNER
          </h1>
          <p className="text-xs text-white/40 font-inter hidden sm:block">LED滚动字幕制作工具</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={resetConfig}
          className="w-10 h-10 rounded-xl bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-white/60 hover:text-white transition-colors btn-neon"
          title="重置"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={onExportClick}
          className="w-10 h-10 sm:w-auto sm:px-4 rounded-xl bg-dark-700 hover:bg-dark-600 flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors btn-neon"
          title="导出视频"
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">导出</span>
        </button>
        <button
          onClick={() => setFullscreen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium text-sm shadow-neon-purple hover:opacity-90 transition-opacity btn-neon"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">全屏播放</span>
        </button>
      </div>
    </header>
  );
}
