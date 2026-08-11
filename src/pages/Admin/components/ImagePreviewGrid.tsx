import React from "react";
import ImageItem from "./ImagItem";

interface Props {
  preview: string[];
  removeImage: (index: number) => void;
}

const ImagePreviewGrid: React.FC<Props> = ({ preview, removeImage }) => {
  if (preview.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {preview.map((src, idx) => (
        <ImageItem
          key={idx}
          src={src}
          index={idx}
          removeImage={removeImage}
        />
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
