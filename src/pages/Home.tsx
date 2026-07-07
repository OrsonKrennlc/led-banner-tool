import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LEDPreview } from '@/components/Preview/LEDPreview';
import { FullscreenPlayer } from '@/components/Preview/FullscreenPlayer';
import { TabBar } from '@/components/UI/TabBar';
import { TextPanel } from '@/components/Panels/TextPanel';
import { BackgroundPanel } from '@/components/Panels/BackgroundPanel';
import { ControlPanel } from '@/components/Panels/ControlPanel';
import { EffectPanel } from '@/components/Panels/EffectPanel';
import { ExportModal } from '@/components/UI/ExportModal';
import { useLEDStore } from '@/store/ledStore';
import { useExportVideo } from '@/hooks/useExportVideo';

export default function Home() {
  const { activeTab, config } = useLEDStore();
  const [showExportModal, setShowExportModal] = useState(false);
  const { exportVideo, isExporting, progress } = useExportVideo();

  const handleExport = (cfg: Parameters<typeof exportVideo>[0], options: Parameters<typeof exportVideo>[1]) => {
    exportVideo(cfg, options);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'text':
        return <TextPanel />;
      case 'background':
        return <BackgroundPanel />;
      case 'control':
        return <ControlPanel />;
      case 'effect':
        return <EffectPanel />;
      default:
        return <TextPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 led-dot-bg">
      <FullscreenPlayer />
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        isExporting={isExporting}
        progress={progress}
        onExport={handleExport}
        currentConfig={config}
      />

      <div className="max-w-7xl mx-auto">
        <Navbar onExportClick={() => setShowExportModal(true)} />

        <main className="px-4 lg:px-6 pb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2 xl:w-3/5 flex flex-col gap-4">
              <LEDPreview />

              <div className="glass-panel rounded-2xl p-4 lg:hidden">
                <TabBar />
              </div>
            </div>

            <div className="lg:w-1/2 xl:w-2/5 flex flex-col gap-4">
              <div className="hidden lg:block">
                <TabBar />
              </div>

              <div className="glass-panel rounded-2xl p-5 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-200px)] scrollbar-hide">
                {renderPanel()}
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-4 text-white/30 text-xs font-inter">
          LED Banner Tool - 专业LED滚动字幕制作工具
        </footer>
      </div>
    </div>
  );
}
