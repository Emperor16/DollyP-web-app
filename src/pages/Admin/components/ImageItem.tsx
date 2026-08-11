import React from "react";

interface Props {
  src: string;
  index: number;
  removeImage: (index: number) => void;
}

const ImageItem: React.FC<Props> = ({ src, index, removeImage }) => {
  return (
    <div className="relative group rounded overflow-hidden shadow-sm">

      {/* IMAGE */}
      <img
        src={src}
        className="w-full h-32 object-cover transition-transform duration-200 group-hover:scale-105"
      />

      {/* DELETE BUTTON */}
      <button
        onClick={() => removeImage(index)}
        className="
          absolute top-1 right-1 
          bg-red-600 text-white 
          rounded-full w-6 h-6 
          flex items-center justify-center 
          text-xs font-bold
          opacity-0 group-hover:opacity-100 
          transition
        "
      >
        ×
      </button>
    </div>
  );
};

export default ImageItem;
