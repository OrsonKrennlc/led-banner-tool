import { useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import { useLEDStore } from '../../store/ledStore';
import { useLEDRender } from '../../hooks/useLEDRender';
import { getBorderStyle } from '../../utils/borderStyles';

export function LEDPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { config, isPaused, setFullscreen } = useLEDStore();

  useLEDRender(canvasRef, config, isPaused, false);

  const borderStyle = getBorderStyle(config.borderStyle, config.borderColor);

  return (
    <div className="relative w-full">
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer"
        style={{
          ...borderStyle,
          backgroundColor: config.backgroundColor,
        }}
        onClick={() => setFullscreen(true)}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
          <Maximize2 className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-xs text-white/70 font-inter">点击全屏播放</span>
        </div>
      </div>
    </div>
  );
}
