'use client';

export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-[#f2efea] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-8">Font Loading Test Page</h1>
        
        {/* Test 1: Using the CSS variable */}
        <section className="border-4 border-black p-6 bg-white">
          <h2 className="text-2xl mb-4 font-bold">Test 1: CSS Variable (var(--font-pci-sans-bold))</h2>
          <p style={{ fontFamily: 'var(--font-pci-sans-bold), sans-serif', fontSize: '48px', fontWeight: 700 }}>
            PCI Sans Bold Test - CSS Variable
          </p>
          <p className="text-sm mt-2 text-gray-600">
            This should use the font loaded via Next.js localFont
          </p>
        </section>

        {/* Test 2: Using the utility class */}
        <section className="border-4 border-black p-6 bg-white">
          <h2 className="text-2xl mb-4 font-bold">Test 2: Utility Class (.font-pci-sans-bold)</h2>
          <p className="font-pci-sans-bold" style={{ fontSize: '48px' }}>
            PCI Sans Bold Test - Utility Class
          </p>
          <p className="text-sm mt-2 text-gray-600">
            This should use the .font-pci-sans-bold CSS class
          </p>
        </section>

        {/* Test 3: Using inline font-family from components */}
        <section className="border-4 border-black p-6 bg-white">
          <h2 className="text-2xl mb-4 font-bold">Test 3: Inline font-family (like components use)</h2>
          <p className="font-['PCI_Sans_Bold',_sans-serif]" style={{ fontSize: '48px' }}>
            PCI Sans Bold Test - Inline
          </p>
          <p className="text-sm mt-2 text-gray-600">
            This uses the old approach from components
          </p>
        </section>

        {/* Test 4: Fallback font */}
        <section className="border-4 border-black p-6 bg-white">
          <h2 className="text-2xl mb-4 font-bold">Test 4: Sans-serif fallback (for comparison)</h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: '48px', fontWeight: 700 }}>
            Sans-serif fallback font
          </p>
          <p className="text-sm mt-2 text-gray-600">
            This is what you see if the custom font fails to load
          </p>
        </section>

        {/* Font Loading Status */}
        <section className="border-4 border-blue-500 p-6 bg-blue-50">
          <h2 className="text-2xl mb-4 font-bold">Font Loading Status</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Document Fonts Ready:</strong>{' '}
              <span id="fonts-ready">Checking...</span>
            </p>
            <p className="text-sm">
              <strong>CSS Variables Available:</strong>{' '}
              <span id="css-vars">Checking...</span>
            </p>
          </div>
        </section>

        {/* Instructions */}
        <section className="border-4 border-green-500 p-6 bg-green-50">
          <h2 className="text-2xl mb-4 font-bold">How to Use This Test Page</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Compare the test samples above with the fallback font</li>
            <li>If they look different (bold, custom styling), the font is loading</li>
            <li>If they look the same as fallback, the font is NOT loading</li>
            <li>Check the Font Loading Status section for technical details</li>
            <li>Open browser DevTools → Network tab → filter "font" to see if font file loads</li>
          </ol>
        </section>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Check if fonts are loaded
          if (document.fonts) {
            document.fonts.ready.then(() => {
              document.getElementById('fonts-ready').textContent = 'Yes - All fonts loaded';
              const loadedFonts = Array.from(document.fonts.values()).map(f => f.family).join(', ');
              console.log('Loaded fonts:', loadedFonts);
            });
          } else {
            document.getElementById('fonts-ready').textContent = 'Font API not available';
          }

          // Check CSS variables
          setTimeout(() => {
            const root = document.documentElement;
            const fontVar = getComputedStyle(root).getPropertyValue('--font-pci-sans-bold');
            document.getElementById('css-vars').textContent = fontVar ? 'Yes: ' + fontVar : 'Not found';
          }, 100);
        `
      }} />
    </div>
  );
}


