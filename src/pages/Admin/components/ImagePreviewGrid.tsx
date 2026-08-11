import React from "react";

interface Props {
  preview: string[];
  removeImage: (index: number) => void;
}

const ImagePreviewGrid: React.FC<Props> = ({ preview, removeImage }) => {
  if (preview.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {preview.map((src, idx) => (
        <div key={idx} className="relative group">
          {/* IMAGE */}
          <img
            src={src}
            className="w-full h-32 object-cover rounded shadow-sm"
          />

          {/* DELETE BUTTON */}
          <button
            onClick={() => removeImage(idx)}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
