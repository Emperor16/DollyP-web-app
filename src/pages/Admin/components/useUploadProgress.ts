import { useState } from "react";

export const useUploadProgress = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const start = () => {
    setUploading(true);
    setProgress(0);
  };

  const update = (percent: number) => {
    setProgress(percent);
  };

  const finish = () => {
    setProgress(100);
    setTimeout(() => {
      setUploading(false);
      setProgress(0);
    }, 800);
  };

  return {
    progress,
    uploading,
    start,
    update,
    finish,
  };
};
