import { useCallback, useRef, useState } from 'react';
import type { LEDConfig, ScrollDirection } from '../types';

interface ExportOptions {
  duration: number;
  width: number;
  height: number;
  fps: number;
  format: 'webm' | 'gif';
}

function parseGradientForExport(ctx: CanvasRenderingContext2D, width: number, height: number, gradientStr: string): CanvasGradient | null {
  if (!gradientStr.includes('gradient')) return null;
  const colors = gradientStr.match(/#[0-9a-fA-F]{6}/g) || [];
  if (colors.length === 0) return null;

  let gradient: CanvasGradient;
  if (gradientStr.includes('135deg')) {
    gradient = ctx.createLinearGradient(0, 0, width, height);
  } else if (gradientStr.includes('45deg')) {
    gradient = ctx.createLinearGradient(0, height, width, 0);
  } else if (gradientStr.includes('180deg')) {
    gradient = ctx.createLinearGradient(0, 0, 0, height);
  } else {
    gradient = ctx.createLinearGradient(0, 0, width, 0);
  }
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1 || 1), color);
  });
  return gradient;
}

function getFontString(cfg: LEDConfig, fontSize: number) {
  const parts: string[] = [];
  if (cfg.bold) parts.push('bold');
  if (cfg.italic) parts.push('italic');
  parts.push(`${fontSize}px`);
  parts.push(cfg.font);
  return parts.join(' ');
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cfg: LEDConfig,
  offsetX: number,
  offsetY: number,
  blinkVisible: boolean
) {
  const scale = Math.min(width / 900, height / 300) * 1.2;
  const fontSize = cfg.fontSize * scale;
  const dotSize = cfg.ledDotSize * scale;
  const brightness = cfg.brightness / 100;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.clearRect(0, 0, width, height);

  if (cfg.backgroundImage && cfg.backgroundImage.includes('gradient')) {
    const gradient = parseGradientForExport(ctx, width, height, cfg.backgroundImage);
    ctx.fillStyle = gradient || cfg.backgroundColor;
  } else {
    ctx.fillStyle = cfg.backgroundColor;
  }
  ctx.fillRect(0, 0, width, height);

  if (cfg.ledDotEffect) {
    ctx.fillStyle = `rgba(255, 255, 255, ${0.04 * brightness})`;
    const spacing = dotSize * 3;
    for (let x = dotSize; x < width; x += spacing) {
      for (let y = dotSize; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (cfg.blink && !blinkVisible) {
    return;
  }

  ctx.font = getFontString(cfg, fontSize);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  const metrics = ctx.measureText(cfg.text);
  const textWidth = metrics.width;

  let drawX = width / 2;
  let drawY = height / 2;
  const dir: ScrollDirection = cfg.scrollDirection;

  if (dir !== 'static') {
    const speed = cfg.scrollSpeed * scale * 1.5;
    if (dir === 'left') {
      drawX = offsetX;
    } else if (dir === 'right') {
      drawX = offsetX;
    } else if (dir === 'up') {
      drawY = offsetY;
    } else if (dir === 'down') {
      drawY = offsetY;
    }
  } else {
    if (cfg.textAlign === 'left') {
      ctx.textAlign = 'left';
      drawX = 30 * scale;
    } else if (cfg.textAlign === 'right') {
      ctx.textAlign = 'right';
      drawX = width - 30 * scale;
    }
  }

  ctx.save();

  if (cfg.shadow) {
    ctx.shadowColor = cfg.shadowColor;
    ctx.shadowBlur = (cfg.glowEffect ? 30 : 15) * scale;
  }

  if (cfg.outline) {
    ctx.strokeStyle = cfg.outlineColor;
    ctx.lineWidth = 4 * scale;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(cfg.text, drawX, drawY);
  }

  ctx.fillStyle = cfg.textColor;
  ctx.globalAlpha = brightness;
  ctx.fillText(cfg.text, drawX, drawY);

  if (cfg.shadow && cfg.glowEffect) {
    ctx.shadowBlur = 60 * scale;
    ctx.globalAlpha = brightness * 0.6;
    ctx.fillText(cfg.text, drawX, drawY);
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

export function useExportVideo() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  const exportVideo = useCallback(async (config: LEDConfig, options: Partial<ExportOptions> = {}) => {
    const width = options.width || 1280;
    const height = options.height || 400;
    const duration = options.duration || 10;
    const fps = options.fps || 30;

    setIsExporting(true);
    setProgress(0);

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    offscreenCanvasRef.current = offscreen;
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    const stream = offscreen.captureStream(fps);

    const mimeTypes = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ];
    let mimeType = 'video/webm';
    for (const t of mimeTypes) {
      if (MediaRecorder.isTypeSupported(t)) {
        mimeType = t;
        break;
      }
    }

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 5_000_000,
    });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    const recordPromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        resolve(blob);
      };
    });

    recorder.start();

    const startTime = performance.now();
    const totalFrames = duration * fps;
    let frameCount = 0;
    let offsetX: number;
    let offsetY: number;
    let blinkVisible = true;
    let lastBlinkTime = 0;

    const fontSize = config.fontSize * (Math.min(width / 900, height / 300) * 1.2);
    ctx.font = getFontString(config, fontSize);
    const textWidth = ctx.measureText(config.text).width;
    const textHeight = fontSize * 1.2;

    const dir = config.scrollDirection;
    if (dir === 'left') {
      offsetX = width + textWidth / 2;
    } else if (dir === 'right') {
      offsetX = -textWidth / 2;
    } else if (dir === 'up') {
      offsetY = height + textHeight / 2;
    } else if (dir === 'down') {
      offsetY = -textHeight / 2;
    } else {
      offsetX = width / 2;
      offsetY = height / 2;
    }

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const time = performance.now();

      if (config.blink && time - lastBlinkTime > config.blinkSpeed) {
        blinkVisible = !blinkVisible;
        lastBlinkTime = time;
      }

      const scale = Math.min(width / 900, height / 300) * 1.2;
      if (dir !== 'static') {
        const speed = config.scrollSpeed * scale * 1.5;
        if (dir === 'left') {
          offsetX -= speed;
          if (offsetX < -textWidth / 2) offsetX = width + textWidth / 2;
        } else if (dir === 'right') {
          offsetX += speed;
          if (offsetX > width + textWidth / 2) offsetX = -textWidth / 2;
        } else if (dir === 'up') {
          offsetY -= speed;
          if (offsetY < -textHeight / 2) offsetY = height + textHeight / 2;
        } else if (dir === 'down') {
          offsetY += speed;
          if (offsetY > height + textHeight / 2) offsetY = -textHeight / 2;
        }
      }

      drawFrame(ctx, width, height, config, offsetX, offsetY, blinkVisible);

      frameCount++;
      setProgress(Math.min(100, Math.round((elapsed / (duration * 1000)) * 100)));

      if (elapsed < duration * 1000) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
        stream.getTracks().forEach((t) => t.stop());
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const blob = await recordPromise;
    cancelAnimationFrame(animFrameRef.current);

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `led-banner-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setProgress(100);
    setIsExporting(false);
    return blob;
  }, []);

  const cancelExport = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsExporting(false);
    setProgress(0);
  }, []);

  return {
    exportVideo,
    cancelExport,
    isExporting,
    progress,
  };
}
