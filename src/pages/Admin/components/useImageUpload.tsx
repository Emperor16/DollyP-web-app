import { useState } from "react";

// CONFIG
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_IMAGES = 10;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const useImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  // VALIDATE FILE TYPE + SIZE
  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File "${file.name}" is not a supported image type. Allowed: JPG, PNG, WEBP.`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
    }

    return null;
  };

  // ADD FILES (FROM DRAG OR TAP)
  const addFiles = (incoming: FileList) => {
    setError("");

    if (files.length + incoming.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(incoming).forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  // REMOVE IMAGE
  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    files,
    preview,
    dragActive,
    setDragActive,
    error,
    addFiles,
    removeImage,
  };
};
