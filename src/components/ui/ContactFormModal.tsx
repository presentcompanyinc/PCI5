'use client';

/**
 * ContactFormModal - Contact info overlay
 * Simplified to show email contact only
 */

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#f2efea] relative w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl m-4"
        style={{ maxWidth: 'var(--modal-max-width)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute font-pci-sans-bold leading-none text-black hover:opacity-70 transition-opacity z-10"
          style={{
            fontSize: 'var(--modal-close-size)',
            top: 'calc(var(--modal-padding) / 2.5)',
            right: 'calc(var(--modal-padding) / 2.5)'
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Contact Content */}
        <div 
          className="flex items-center justify-center min-h-[400px]"
          style={{ 
            padding: 'var(--modal-padding)',
            paddingTop: 'calc(var(--modal-padding) * 1.5)'
          }}
        >
          <div className="text-center">
            <p 
              className="font-pci-sans-bold text-black"
              style={{ fontSize: 'var(--modal-title-size)' }}
            >
              <a 
                href="mailto:pci@presentcompanymusic.com"
                className="hover:opacity-70 transition-opacity underline"
              >
                pci@presentcompanymusic.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

