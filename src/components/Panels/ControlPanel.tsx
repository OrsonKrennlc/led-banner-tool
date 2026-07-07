import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Pause, Zap } from 'lucide-react';
import { useLEDStore } from '../../store/ledStore';
import type { ScrollDirection } from '../../types';

export function ControlPanel() {
  const { config, updateConfig } = useLEDStore();

  const dirBtn = (dir: ScrollDirection, icon: typeof ArrowLeft, label: string) => {
    const Icon = icon;
    const active = config.scrollDirection === dir;
    return (
      <button
        key={dir}
        onClick={() => updateConfig({ scrollDirection: dir })}
        className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all btn-neon ${
          active
            ? 'bg-gradient-to-br from-neon-purple to-neon-pink text-white shadow-neon-purple'
            : 'bg-dark-700 text-white/60 hover:bg-dark-600 hover:text-white/80'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-xs">{label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">滚动方向</label>
        <div className="grid grid-cols-5 gap-2">
          {dirBtn('left', ArrowLeft, '向左')}
          {dirBtn('right', ArrowRight, '向右')}
          {dirBtn('up', ArrowUp, '向上')}
          {dirBtn('down', ArrowDown, '向下')}
          {dirBtn('static', Pause, '静止')}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          滚动速度: {config.scrollSpeed}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={config.scrollSpeed}
          onChange={(e) => updateConfig({ scrollSpeed: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>慢</span>
          <span>快</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-yellow" />
          闪烁效果
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateConfig({ blink: !config.blink })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-neon ${
              config.blink
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                : 'bg-dark-700 text-white/60 hover:bg-dark-600'
            }`}
          >
            {config.blink ? '已开启' : '已关闭'}
          </button>
          {config.blink && (
            <div className="flex-1">
              <span className="text-xs text-white/50">闪烁速度</span>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={config.blinkSpeed}
                onChange={(e) => updateConfig({ blinkSpeed: Number(e.target.value) })}
                className="w-full mt-1"
              />
            </div>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-xl p-4 mt-4">
        <div className="text-sm text-white/60 mb-2">💡 使用提示</div>
        <ul className="text-xs text-white/40 space-y-1">
          <li>• 点击预览区域进入全屏播放模式</li>
          <li>• 全屏时按空格键暂停/继续，双击退出</li>
          <li>• 向上/向下滚动适合竖屏手机使用</li>
          <li>• 演唱会应援建议使用向左滚动</li>
        </ul>
      </div>
    </div>
  );
}
