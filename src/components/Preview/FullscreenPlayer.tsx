import { useRef, useEffect, useCallback, useState } from 'react';
import { Pause, Play, X } from 'lucide-react';
import { useLEDStore } from '../../store/ledStore';
import { useLEDRender } from '../../hooks/useLEDRender';

export function FullscreenPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const { config, isFullscreen, isPaused, setFullscreen, togglePaused } = useLEDStore();

  useLEDRender(canvasRef, config, isPaused, true);

  const exitFullscreen = useCallback(() => {
    setFullscreen(false);
    setIsReady(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [setFullscreen]);

  const enterFullscreen = useCallback(async () => {
    try {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      }
    } catch (e) {
      // 全屏API可能被阻止，模拟全屏继续运行
    }
    setTimeout(() => setIsReady(true), 200);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      setIsReady(false);
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitFullscreen();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePaused();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setFullscreen(false);
        setIsReady(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, exitFullscreen, togglePaused, setFullscreen]);

  useEffect(() => {
    if (isFullscreen && !document.fullscreenElement) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  if (!isFullscreen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50"
      style={{ backgroundColor: config.backgroundColor }}
      onDoubleClick={exitFullscreen}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ backgroundColor: config.backgroundColor }}
      />

      <div className="absolute top-4 right-4 flex gap-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePaused();
          }}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors btn-neon"
        >
          {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            exitFullscreen();
          }}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors btn-neon"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-inter z-10 select-none">
        双击退出 · 空格键暂停/播放
      </div>
    </div>
  );
}
