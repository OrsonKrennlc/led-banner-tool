import { useLEDStore } from '../../store/ledStore';
import { BORDER_OPTIONS, COLOR_PRESETS } from '../../utils/constants';

export function EffectPanel() {
  const { config, updateConfig, resetConfig } = useLEDStore();

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">边框样式</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BORDER_OPTIONS.map((border) => {
            const isSelected = config.borderStyle === border.id;
            return (
              <button
                key={border.id}
                onClick={() => updateConfig({ borderStyle: border.id })}
                className={`relative h-20 rounded-xl overflow-hidden transition-all btn-neon ${
                  isSelected
                    ? 'ring-2 ring-white scale-105'
                    : 'ring-1 ring-white/10 hover:ring-white/30'
                }`}
                style={{
                  background: '#0a0a0f',
                }}
              >
                <div
                  className="absolute inset-2 rounded-lg flex items-center justify-center"
                  style={{
                    border:
                      border.style === 'none'
                        ? 'none'
                        : border.style === 'solid'
                        ? `2px solid ${config.borderColor}`
                        : border.style === 'double'
                        ? `4px double ${config.borderColor}`
                        : border.style === 'dashed'
                        ? `2px dashed ${config.borderColor}`
                        : border.style === 'dotted'
                        ? `3px dotted ${config.borderColor}`
                        : `2px solid ${config.borderColor}`,
                    boxShadow:
                      border.style === 'neon-glow'
                        ? `0 0 5px ${config.borderColor}, 0 0 10px ${config.borderColor}, inset 0 0 5px ${config.borderColor}40`
                        : border.style === 'neon-pulse'
                        ? `0 0 5px ${config.borderColor}, 0 0 15px ${config.borderColor}`
                        : border.style === 'gradient'
                        ? '0 0 10px rgba(176,38,255,0.3)'
                        : 'none',
                    animation: border.style === 'neon-pulse' ? 'breathe 2s ease-in-out infinite' : undefined,
                  }}
                >
                  <span className="text-xs text-white/80 font-medium">{border.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">边框颜色</label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="color"
            value={config.borderColor}
            onChange={(e) => updateConfig({ borderColor: e.target.value })}
          />
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => updateConfig({ borderColor: c })}
                className={`w-8 h-8 rounded-lg border-2 transition-transform btn-neon ${
                  config.borderColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}60` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-4">
        <div className="text-sm font-medium text-white/80 mb-3">快速预设</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              updateConfig({
                textColor: '#ff2d92',
                outlineColor: '#b026ff',
                shadowColor: '#ff2d92',
                borderColor: '#b026ff',
                borderStyle: 'neon-glow',
                backgroundColor: '#0a0a0f',
                glowEffect: true,
                ledDotEffect: true,
              })
            }
            className="relative h-16 rounded-lg overflow-hidden btn-neon hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #0a0a0f, #1a0a20)',
              border: '2px solid #b026ff',
              boxShadow: '0 0 15px #b026ff',
            }}
          >
            <span className="text-neon-pink font-orbitron font-bold" style={{ textShadow: '0 0 10px #ff2d92' }}>
              赛博粉
            </span>
          </button>
          <button
            onClick={() =>
              updateConfig({
                textColor: '#00f5ff',
                outlineColor: '#0066ff',
                shadowColor: '#00f5ff',
                borderColor: '#00f5ff',
                borderStyle: 'neon-glow',
                backgroundColor: '#000a0f',
                glowEffect: true,
                ledDotEffect: true,
              })
            }
            className="relative h-16 rounded-lg overflow-hidden btn-neon hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #000a0f, #0a1a25)',
              border: '2px solid #00f5ff',
              boxShadow: '0 0 15px #00f5ff',
            }}
          >
            <span className="text-neon-cyan font-orbitron font-bold" style={{ textShadow: '0 0 10px #00f5ff' }}>
              冰蓝光
            </span>
          </button>
          <button
            onClick={() =>
              updateConfig({
                textColor: '#39ff14',
                outlineColor: '#006600',
                shadowColor: '#39ff14',
                borderColor: '#39ff14',
                borderStyle: 'neon-pulse',
                backgroundColor: '#000a00',
                glowEffect: true,
                ledDotEffect: true,
              })
            }
            className="relative h-16 rounded-lg overflow-hidden btn-neon hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #000a00, #0a1a0a)',
              border: '2px solid #39ff14',
              boxShadow: '0 0 15px #39ff14',
            }}
          >
            <span className="text-neon-green font-orbitron font-bold" style={{ textShadow: '0 0 10px #39ff14' }}>
              黑客绿
            </span>
          </button>
          <button
            onClick={() =>
              updateConfig({
                textColor: '#ffff00',
                outlineColor: '#ff6600',
                shadowColor: '#ffff00',
                borderColor: '#ff6600',
                borderStyle: 'gradient',
                backgroundColor: '#0f0a00',
                glowEffect: true,
                ledDotEffect: true,
              })
            }
            className="relative h-16 rounded-lg overflow-hidden btn-neon hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #0f0a00, #251a0a)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(#0f0a00, #0f0a00), linear-gradient(135deg, #ffff00, #ff6600)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 15px #ff660060',
            }}
          >
            <span className="font-orbitron font-bold" style={{ color: '#ffff00', textShadow: '0 0 10px #ffff00' }}>
              落日橙
            </span>
          </button>
        </div>
      </div>

      <button
        onClick={resetConfig}
        className="w-full py-3 rounded-xl bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white/90 transition-all btn-neon text-sm font-medium"
      >
        重置为默认设置
      </button>
    </div>
  );
}
