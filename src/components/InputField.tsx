import React from 'react';

const InputField = React.forwardRef<
  HTMLInputElement,
  { type?: string; className?: string; errorMessage?: string; label?: string; min?: number; readOnly?: boolean }
>(({ type = 'text', className, errorMessage, label, min, readOnly, ...otherProps }, ref) => (
  <div className={`w-full space-y-1 ${className}`}>
    {label && <h2 className={`font-semibold text-sm mb-1 ${errorMessage ? 'text-red-500' : ''}`}>{label}</h2>}
    <input
      {...otherProps}
      ref={ref}
      type={type}
      min={min}
      readOnly={readOnly}
      className={`w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent px-3 py-2 ${className} ${
        errorMessage ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
      }`}
    />
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
  </div>
));

export default InputField;
