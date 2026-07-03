import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useWebGLCapabilities() {
  const [status, setStatus] = useState({
    supported: false,
    lowPower: false,
    checked: false,
  });
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;

    let isLowPowerDevice = false;

    if (hasWebGL) {
      // 1. CPU cores check (low power if < 4 cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        isLowPowerDevice = true;
      }
      
      // 2. RAM check (low power if < 4 GB)
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        isLowPowerDevice = true;
      }

      // 3. WebGL debug renderer check for low-end graphics cards
      try {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          if (
            renderer.includes('mali') ||
            renderer.includes('adreno') ||
            renderer.includes('intel hd') ||
            renderer.includes('software')
          ) {
            // Mobile integrated or base CPU-renderer GPU models
            isLowPowerDevice = true;
          }
        }
      } catch (e) {
        // Safe catch if extensions aren't allowed
      }
    }

    setStatus({
      supported: hasWebGL,
      lowPower: isLowPowerDevice || isReducedMotion,
      checked: true,
    });
  }, [isReducedMotion]);

  return status;
}
