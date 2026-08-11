import React from 'react';

const ImagePlaceholder = ({
  id,
  label,
  brief,
  src,
  alt = '',
  className = '',
  aspect = 'aspect-[4/3]',
}) => {
  if (src) {
    return (
      <div className={`overflow-hidden bg-[#dce8f2] ${aspect} ${className}`}>
        <img src={src} alt={alt || label} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#d9e6f2] ${aspect} ${className}`}
      data-image-slot={id}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(9,41,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(9,41,76,0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute top-4 left-4 w-10 h-10 rounded-lg border border-[#09294c]/15 bg-white/50" />
      <div className="absolute bottom-4 right-4 w-16 h-2 rounded-full bg-[#3d8fd1]/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#09294c]/45 mb-2">
          {id}
        </span>
        <span className="text-sm font-semibold text-[#09294c] mb-1">{label}</span>
        {brief && (
          <span className="text-xs text-[#09294c]/55 max-w-[220px] leading-relaxed">{brief}</span>
        )}
      </div>
    </div>
  );
};

export default ImagePlaceholder;
