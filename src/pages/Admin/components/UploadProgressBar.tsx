import React from "react";

interface Props {
  progress: number;
  uploading: boolean;
}

const UploadProgressBar: React.FC<Props> = ({ progress, uploading }) => {
  if (!uploading) return null;

  return (
    <div className="w-full bg-gray-200 rounded h-3 mt-4 overflow-hidden">
      <div
        className="bg-blue-600 h-full transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};


export default UploadProgressBar;
