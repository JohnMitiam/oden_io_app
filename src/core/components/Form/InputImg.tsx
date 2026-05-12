/* eslint-disable jsx-a11y/alt-text */
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import type { ProductImageViewModel } from "../../../models/Product";

interface Base64Img {
  base64: string;
  file: File;
  isPrimary: boolean;
  id?: number;
}

interface Props {
  value?: ProductImageViewModel[];
  onMultipleChange?: (files: Base64Img[]) => void;
  columns?: number;
}

export const InputImg: React.FC<Props> = ({ value = [], onMultipleChange, columns = 1 }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newBase64Images: Base64Img[] = await Promise.all(
      files.map(async (file) => ({
        base64: await convertToBase64(file),
        file,
        isPrimary: false,
      })),
    );

    const merged = [
      ...(value?.map((img) => ({
        id: img.id,
        base64: img.imageData ?? "",
        file: new File([], img.mimeType ?? "image/jpeg"),
        isPrimary: img.isPrimary,
      })) ?? []),
      ...newBase64Images,
    ];

    const updated = merged.map((img, i) => ({
      ...img,
      isPrimary: i === 0,
    }));

    onMultipleChange?.(updated);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const updated = value
      .filter((_, i) => i !== index)
      .map((img, i) => ({
        id: img.id,
        base64: img.imageData ?? "",
        file: new File([], img.mimeType ?? "image/jpeg"),
        isPrimary: i === 0,
      }));

    onMultipleChange?.(updated);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const reordered = [...value];
    const [removed] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, removed);

    const updated = reordered.map((img, i) => ({
      id: img.id,
      base64: img.imageData ?? "",
      file: new File([], img.mimeType ?? "image/jpeg"),
      isPrimary: i === 0,
    }));

    onMultipleChange?.(updated);
    setDragIndex(index);
  };

  const isPrimaryMode = columns === 1;

  return (
    <div className="w-full relative">
      {value.length > 0 && (
        <div className={isPrimaryMode 
          ? "w-full" 
          : `grid grid-cols-${columns} gap-4 p-4`
        }>
          {value.map((img, index) => (
            <div
              key={index}
              draggable={!isPrimaryMode}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              className="relative w-full"
            >
              <div className={`group relative ${isPrimaryMode ? 'aspect-video' : 'aspect-square'}`}>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 z-20 bg-white/90 text-black hover:text-red-600 rounded-full p-1 shadow transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>

                <img
                  src={`data:${img.mimeType};base64,${img.imageData}`}
                  className={`w-full h-full object-cover shadow-sm ${isPrimaryMode ? 'rounded-none' : 'rounded-md border'}`} 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={isPrimaryMode && value.length > 0
        ? 'absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none' 
        : 'p-4 pt-2'
      }>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-md shadow-sm transition-all ${
            isPrimaryMode && value.length > 0
            ? 'bg-white/90 text-gray-900 hover:bg-white' 
            : 'w-full bg-gray-50 text-gray-600 border-2 border-dashed border-gray-300 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50'
          }`}
        >
          <PlusIcon className="w-5 h-5" />
          <span>{value.length > 0 ? (isPrimaryMode ? "Change Image" : "Add More") : "Upload Image"}</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!isPrimaryMode}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
};