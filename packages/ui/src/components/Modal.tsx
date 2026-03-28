import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  children?: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full h-full',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = 'md',
  children,
  className = '',
}) => {
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className={[
            'w-full bg-white rounded-lg shadow-xl overflow-hidden',
            sizeStyles[size],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};
Modal.displayName = 'Modal';

// ---------------------------------------------------------------------------
// ModalHeader
// ---------------------------------------------------------------------------

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  onClose?: () => void;
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
);

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, onClose, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex items-center justify-between px-6 py-4 border-b border-neutral-200',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  ),
);
ModalHeader.displayName = 'ModalHeader';

// ---------------------------------------------------------------------------
// ModalContent
// ---------------------------------------------------------------------------

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={['px-6 py-4', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
ModalContent.displayName = 'ModalContent';

// ---------------------------------------------------------------------------
// ModalFooter
// ---------------------------------------------------------------------------

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'ModalFooter';
