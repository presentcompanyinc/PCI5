'use client';

/**
 * Menu Debug Page
 * Helps diagnose mobile menu rendering issues
 */

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout';
import { AnimatedMenuBar } from '@/components/animated';
import { useTouchDevice } from '@/hooks/useTouchDevice';

export default function MenuDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const info = {
      // Device info
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      // @ts-ignore
      maxTouchPoints: navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0,
      hasTouch: 'ontouchstart' in window,
      
      // Viewport info
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      
      // Media queries
      isMobile: window.matchMedia('(max-width: 639px)').matches,
      isTablet: window.matchMedia('(min-width: 640px) and (max-width: 1023px)').matches,
      isDesktop: window.matchMedia('(min-width: 1024px)').matches,
      hoverNone: window.matchMedia('(hover: none)').matches,
      hoverHover: window.matchMedia('(hover: hover)').matches,
      
      // CSS Variables
      textMenu: getComputedStyle(document.documentElement).getPropertyValue('--text-menu'),
      paddingLR: getComputedStyle(document.documentElement).getPropertyValue('--padding-lr'),
      menuHomeWidth: getComputedStyle(document.documentElement).getPropertyValue('--menu-home-width'),
      menuCatalogWidth: getComputedStyle(document.documentElement).getPropertyValue('--menu-catalog-width'),
      
      // Hook detection
      isTouchDeviceHook: isTouchDevice,
    };

    setDebugInfo(info);
  }, [isTouchDevice]);

  return (
    <main className="min-h-screen bg-[#f2efea] flex flex-col items-center">
      <div className="w-full max-w-[1700px]">
        <Header />
      </div>
      
      {/* The menu we're debugging */}
      <div className="w-full max-w-[1700px]" style={{ border: '2px solid red' }}>
        <AnimatedMenuBar />
      </div>
      
      {/* Debug Info */}
      <div className="w-full max-w-[1700px] p-4 md:p-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Menu Debug Information</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Menu Status: {Object.keys(debugInfo).length > 0 ? 'Loaded' : 'Loading...'}
            </h2>
            <p className="text-sm text-gray-600">
              The menu should show 5 items: Home, Work, Catalog, About, Contact
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Red border around menu helps visualize its bounds
            </p>
          </div>

          {Object.keys(debugInfo).length > 0 && (
            <>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Device Detection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>Touch Device (Hook):</strong> {debugInfo.isTouchDeviceHook ? 'YES' : 'NO'}</div>
                  <div><strong>Has Touch Events:</strong> {debugInfo.hasTouch ? 'YES' : 'NO'}</div>
                  <div><strong>Max Touch Points:</strong> {debugInfo.maxTouchPoints}</div>
                  <div><strong>Hover: none:</strong> {debugInfo.hoverNone ? 'YES' : 'NO'}</div>
                  <div><strong>Hover: hover:</strong> {debugInfo.hoverHover ? 'YES' : 'NO'}</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Viewport Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>Width:</strong> {debugInfo.viewportWidth}px</div>
                  <div><strong>Height:</strong> {debugInfo.viewportHeight}px</div>
                  <div><strong>Device Pixel Ratio:</strong> {debugInfo.devicePixelRatio}</div>
                  <div><strong>Is Mobile:</strong> {debugInfo.isMobile ? 'YES' : 'NO'}</div>
                  <div><strong>Is Tablet:</strong> {debugInfo.isTablet ? 'YES' : 'NO'}</div>
                  <div><strong>Is Desktop:</strong> {debugInfo.isDesktop ? 'YES' : 'NO'}</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">CSS Variables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>--text-menu:</strong> {debugInfo.textMenu}</div>
                  <div><strong>--padding-lr:</strong> {debugInfo.paddingLR}</div>
                  <div><strong>--menu-home-width:</strong> {debugInfo.menuHomeWidth}</div>
                  <div><strong>--menu-catalog-width:</strong> {debugInfo.menuCatalogWidth}</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">User Agent</h3>
                <div className="text-xs break-all bg-gray-100 p-2 rounded">
                  {debugInfo.userAgent}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Platform</h3>
                <div className="text-sm">
                  {debugInfo.platform}
                </div>
              </div>
            </>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold mb-2">Testing Instructions</h3>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Take a screenshot of this page on the problematic device</li>
              <li>Check if all 5 menu items are visible above (in red box)</li>
              <li>Note any differences in the debug values compared to working devices</li>
              <li>Try scrolling the menu horizontally if only Home is visible</li>
              <li>Share the screenshot with the developer</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

