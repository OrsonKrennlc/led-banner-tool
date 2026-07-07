import { useRef, useEffect, useCallback } from 'react';
import type { LEDConfig, ScrollDirection } from '../types';

interface AnimationState {
  offsetX: number;
  offsetY: number;
  blinkVisible: boolean;
  lastBlinkTime: number;
  initialized: boolean;
}

function parseGradient(ctx: CanvasRenderingContext2D, width: number, height: number, gradientStr: string): CanvasGradient | null {
  if (!gradientStr.includes('gradient')) return null;

  const colors = gradientStr.match(/#[0-9a-fA-F]{6}/g) || [];
  if (colors.length === 0) return null;

  let gradient: CanvasGradient;
  if (gradientStr.includes('135deg')) {
    gradient = ctx.createLinearGradient(0, 0, width, height);
  } else if (gradientStr.includes('45deg')) {
    gradient = ctx.createLinearGradient(0, height, width, 0);
  } else if (gradientStr.includes('180deg') || gradientStr.includes('to bottom')) {
    gradient = ctx.createLinearGradient(0, 0, 0, height);
  } else {
    gradient = ctx.createLinearGradient(0, 0, width, 0);
  }

  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1 || 1), color);
  });

  return gradient;
}

export function useLEDRender(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  config: LEDConfig,
  isPaused: boolean,
  isFullscreen: boolean
) {
  const animStateRef = useRef<AnimationState>({
    offsetX: 0,
    offsetY: 0,
    blinkVisible: true,
    lastBlinkTime: 0,
    initialized: false,
  });
  const rafRef = useRef<number>(0);
  const configRef = useRef(config);
  const isPausedRef = useRef(isPaused);
  const isFullscreenRef = useRef(isFullscreen);
  configRef.current = config;
  isPausedRef.current = isPaused;
  isFullscreenRef.current = isFullscreen;

  const getFontString = useCallback((cfg: LEDConfig, scaledFontSize: number) => {
    const parts: string[] = [];
    if (cfg.bold) parts.push('bold');
    if (cfg.italic) parts.push('italic');
    parts.push(`${scaledFontSize}px`);
    parts.push(cfg.font);
    return parts.join(' ');
  }, []);

  const drawLED = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, cfg: LEDConfig, time: number) => {
      const scale = isFullscreenRef.current
        ? Math.min(width / 900, height / 300) * 1.2
        : 1;
      const fontSize = cfg.fontSize * scale;
      const dotSize = cfg.ledDotSize * scale;
      const brightness = cfg.brightness / 100;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.clearRect(0, 0, width, height);

      if (cfg.backgroundImage && cfg.backgroundImage.includes('gradient')) {
        const gradient = parseGradient(ctx, width, height, cfg.backgroundImage);
        if (gradient) {
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = cfg.backgroundColor;
        }
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

      if (cfg.blink) {
        if (time - animStateRef.current.lastBlinkTime > cfg.blinkSpeed) {
          animStateRef.current.blinkVisible = !animStateRef.current.blinkVisible;
          animStateRef.current.lastBlinkTime = time;
        }
        if (!animStateRef.current.blinkVisible) {
          return;
        }
      }

      ctx.font = getFontString(cfg, fontSize);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const metrics = ctx.measureText(cfg.text);
      const textWidth = metrics.width;
      const textHeight = fontSize * 1.2;

      let drawX = width / 2;
      let drawY = height / 2;

      const dir: ScrollDirection = cfg.scrollDirection;

      if (!animStateRef.current.initialized) {
        if (dir === 'left') {
          animStateRef.current.offsetX = width + textWidth / 2;
        } else if (dir === 'right') {
          animStateRef.current.offsetX = -textWidth / 2;
        } else if (dir === 'up') {
          animStateRef.current.offsetY = height + textHeight / 2;
        } else if (dir === 'down') {
          animStateRef.current.offsetY = -textHeight / 2;
        } else {
          animStateRef.current.offsetX = width / 2;
          animStateRef.current.offsetY = height / 2;
        }
        animStateRef.current.initialized = true;
      }

      if (dir !== 'static' && !isPausedRef.current) {
        const speed = cfg.scrollSpeed * scale * 1.5;
        if (dir === 'left') {
          drawX = animStateRef.current.offsetX;
          animStateRef.current.offsetX -= speed;
          if (animStateRef.current.offsetX < -textWidth / 2) {
            animStateRef.current.offsetX = width + textWidth / 2;
          }
        } else if (dir === 'right') {
          drawX = animStateRef.current.offsetX;
          animStateRef.current.offsetX += speed;
          if (animStateRef.current.offsetX > width + textWidth / 2) {
            animStateRef.current.offsetX = -textWidth / 2;
          }
        } else if (dir === 'up') {
          drawY = animStateRef.current.offsetY;
          animStateRef.current.offsetY -= speed;
          if (animStateRef.current.offsetY < -textHeight / 2) {
            animStateRef.current.offsetY = height + textHeight / 2;
          }
        } else if (dir === 'down') {
          drawY = animStateRef.current.offsetY;
          animStateRef.current.offsetY += speed;
          if (animStateRef.current.offsetY > height + textHeight / 2) {
            animStateRef.current.offsetY = -textHeight / 2;
          }
        }
      } else {
        drawX = width / 2;
        drawY = height / 2;
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
    },
    [getFontString]
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      rafRef.current = requestAnimationFrame(render);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      rafRef.current = requestAnimationFrame(render);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      rafRef.current = requestAnimationFrame(render);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawLED(ctx, rect.width, rect.height, configRef.current, performance.now());

    rafRef.current = requestAnimationFrame(render);
  }, [canvasRef, drawLED]);

  useEffect(() => {
    animStateRef.current = {
      offsetX: 0,
      offsetY: 0,
      blinkVisible: true,
      lastBlinkTime: 0,
      initialized: false,
    };
  }, [config.scrollDirection, config.text]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [render]);

  const getCanvas = useCallback(() => canvasRef.current, [canvasRef]);

  return { render, getCanvas };
}
