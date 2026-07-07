import { Type, Image, Settings, Sparkles } from 'lucide-react';
import { useLEDStore } from '../../store/ledStore';
import type { ActiveTab } from '../../types';

const tabs: { id: ActiveTab; label: string; icon: typeof Type }[] = [
  { id: 'text', label: '文字', icon: Type },
  { id: 'background', label: '背景', icon: Image },
  { id: 'control', label: '控制', icon: Settings },
  { id: 'effect', label: '效果', icon: Sparkles },
];

export function TabBar() {
  const { activeTab, setActiveTab } = useLEDStore();

  return (
    <div className="flex gap-2 p-1 bg-dark-800 rounded-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl font-medium text-sm transition-all btn-neon ${
              isActive
                ? 'tab-active text-white'
                : 'text-white/60 hover:text-white/90 hover:bg-white/5'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
