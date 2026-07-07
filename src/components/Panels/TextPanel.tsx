import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useLEDStore } from '../../store/ledStore';
import { FONT_OPTIONS, COLOR_PRESETS } from '../../utils/constants';
import type { TextAlign } from '../../types';

export function TextPanel() {
  const { config, updateConfig } = useLEDStore();

  const toggleBtn = (active: boolean) =>
    `w-11 h-11 rounded-xl flex items-center justify-center transition-all btn-neon ${
      active
        ? 'bg-gradient-to-br from-neon-purple to-neon-pink text-white shadow-neon-purple'
        : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white/80'
    }`;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">文字内容</label>
        <input
          type="text"
          value={config.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="输入LED文字..."
          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">字体</label>
        <select
          value={config.font}
          onChange={(e) => updateConfig({ font: e.target.value })}
          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple/50 appearance-none cursor-pointer"
          style={{ fontFamily: config.font }}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.name} value={f.family} style={{ fontFamily: f.family }}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          字号: {config.fontSize}px
        </label>
        <input
          type="range"
          min="20"
          max="200"
          value={config.fontSize}
          onChange={(e) => updateConfig({ fontSize: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">文字样式</label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => updateConfig({ bold: !config.bold })}
            className={toggleBtn(config.bold)}
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateConfig({ italic: !config.italic })}
            className={toggleBtn(config.italic)}
          >
            <Italic className="w-5 h-5" />
          </button>
          <div className="w-px bg-white/10 mx-1" />
          <button
            onClick={() => updateConfig({ textAlign: 'left' as TextAlign })}
            className={toggleBtn(config.textAlign === 'left')}
          >
            <AlignLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateConfig({ textAlign: 'center' as TextAlign })}
            className={toggleBtn(config.textAlign === 'center')}
          >
            <AlignCenter className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateConfig({ textAlign: 'right' as TextAlign })}
            className={toggleBtn(config.textAlign === 'right')}
          >
            <AlignRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">文字颜色</label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="color"
            value={config.textColor}
            onChange={(e) => updateConfig({ textColor: e.target.value })}
          />
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => updateConfig({ textColor: c })}
                className={`w-8 h-8 rounded-lg border-2 transition-transform btn-neon ${
                  config.textColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">描边效果</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateConfig({ outline: !config.outline })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-neon ${
              config.outline
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                : 'bg-dark-700 text-white/60 hover:bg-dark-600'
            }`}
          >
            {config.outline ? '已开启' : '已关闭'}
          </button>
          {config.outline && (
            <input
              type="color"
              value={config.outlineColor}
              onChange={(e) => updateConfig({ outlineColor: e.target.value })}
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">发光阴影</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateConfig({ shadow: !config.shadow })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-neon ${
              config.shadow
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                : 'bg-dark-700 text-white/60 hover:bg-dark-600'
            }`}
          >
            {config.shadow ? '已开启' : '已关闭'}
          </button>
          {config.shadow && (
            <input
              type="color"
              value={config.shadowColor}
              onChange={(e) => updateConfig({ shadowColor: e.target.value })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
