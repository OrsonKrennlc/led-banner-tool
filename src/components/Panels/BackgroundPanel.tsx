import { useLEDStore } from '../../store/ledStore';
import { COLOR_PRESETS, BG_EFFECT_PRESETS } from '../../utils/constants';

export function BackgroundPanel() {
  const { config, updateConfig } = useLEDStore();

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">背景颜色</label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="color"
            value={config.backgroundColor}
            onChange={(e) => updateConfig({ backgroundColor: e.target.value, backgroundImage: null })}
          />
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => updateConfig({ backgroundColor: c, backgroundImage: null })}
                className={`w-8 h-8 rounded-lg border-2 transition-transform btn-neon ${
                  config.backgroundColor === c && !config.backgroundImage
                    ? 'border-white scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">背景效果</label>
        <div className="grid grid-cols-3 gap-2">
          {BG_EFFECT_PRESETS.map((bg) => {
            const isSelected =
              bg.id === 'solid'
                ? !config.backgroundImage
                : config.backgroundImage === bg.gradient;
            return (
              <button
                key={bg.id}
                onClick={() => {
                  if (bg.id === 'solid') {
                    updateConfig({ backgroundImage: null });
                  } else {
                    updateConfig({ backgroundImage: bg.gradient });
                  }
                }}
                className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all btn-neon ${
                  isSelected ? 'border-white scale-105' : 'border-transparent hover:border-white/30'
                }`}
                style={{
                  background: bg.gradient || bg.color,
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium drop-shadow-lg">
                  {bg.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">LED点阵效果</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateConfig({ ledDotEffect: !config.ledDotEffect })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-neon ${
              config.ledDotEffect
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                : 'bg-dark-700 text-white/60 hover:bg-dark-600'
            }`}
          >
            {config.ledDotEffect ? '已开启' : '已关闭'}
          </button>
          {config.ledDotEffect && (
            <div className="flex-1">
              <span className="text-xs text-white/50">点阵密度: {config.ledDotSize}</span>
              <input
                type="range"
                min="1"
                max="8"
                value={config.ledDotSize}
                onChange={(e) => updateConfig({ ledDotSize: Number(e.target.value) })}
                className="w-full mt-1"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          亮度: {config.brightness}%
        </label>
        <input
          type="range"
          min="20"
          max="150"
          value={config.brightness}
          onChange={(e) => updateConfig({ brightness: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">发光效果</label>
        <button
          onClick={() => updateConfig({ glowEffect: !config.glowEffect })}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-neon ${
            config.glowEffect
              ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
              : 'bg-dark-700 text-white/60 hover:bg-dark-600'
          }`}
        >
          {config.glowEffect ? '已开启' : '已关闭'}
        </button>
      </div>
    </div>
  );
}
