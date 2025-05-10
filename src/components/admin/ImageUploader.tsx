'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageUploaderProps = {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
};

export default function ImageUploader({ initialImage, onImageChange }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(initialImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // In a real application, this would upload to a storage service
  // For now, we'll just simulate it with a timeout and use the file as a data URL
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setIsUploading(true);
    setProgress(0);

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setIsUploading(false);
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      setIsUploading(false);
      return;
    }

    try {
      // Create a smaller preview for the UI
      const previewReader = new FileReader();
      previewReader.onload = () => {
        setPreviewUrl(previewReader.result as string);
      };
      previewReader.readAsDataURL(file);

      // For large files, process in chunks with progress updates
      const processLargeFile = () => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          
          // Add progress tracking
          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              setProgress(percentComplete);
            }
          };
          
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      };

      // Process the file with a slight delay to allow UI to update
      setTimeout(async () => {
        try {
          const result = await processLargeFile();
          onImageChange(result);
          setIsUploading(false);
          setProgress(100);
        } catch {
          setError('Error processing image. Please try again.');
          setIsUploading(false);
        }
      }, 100);
    } catch {
      setError('Error processing image. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 relative">
        {previewUrl ? (
          <div className="relative w-full h-48">
            <Image 
              src={previewUrl} 
              alt="Product image" 
              fill 
              className="object-contain" 
            />
          </div>
        ) : (
          <div className="text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">Upload a product image (up to 20MB)</p>
          </div>
        )}

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="text-center space-y-2">
          <p className="text-sm text-blue-600">Uploading image... {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {previewUrl && (
        <button 
          type="button" 
          onClick={() => {
            setPreviewUrl('');
            onImageChange('');
          }}
          className="text-sm text-red-600 hover:text-red-800"
          disabled={isUploading}
        >
          Remove image
        </button>
      )}
    </div>
  );
}
