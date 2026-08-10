import React, { useRef } from "react";

interface Props {
  dragActive: boolean;
  setDragActive: (state: boolean) => void;
  addFiles: (files: FileList) => void;
  error: string;
}

const ImageUploadZone: React.FC<Props> = ({
  dragActive,
  setDragActive,
  addFiles,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle clicking the dotted border
  const handleClick = () => {
    inputRef.current?.click();
  };

  // Handle file selection from device
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
  };

  // Drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  // Border color logic
  const borderColor = error
    ? "border-red-500"
    : dragActive
    ? "border-blue-500"
    : "border-gray-400";

  return (
    <div className="mb-4">
      {/* DOTTED BORDER UPLOAD ZONE */}
      <div
        className={`border-2 border-dashed ${borderColor} p-6 text-center rounded-lg cursor-pointer transition`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className="font-medium">Tap or Drag & Drop images here</p>
        <p className="text-sm text-gray-500">Max size: 2MB per image</p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        ref={inputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ImageUploadZone;
