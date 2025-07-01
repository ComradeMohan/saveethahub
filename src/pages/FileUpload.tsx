import React, { useState, useCallback } from 'react';
import {
  Upload,
  X,
  FileText,
  Image,
  File,
  Loader2,
  UploadCloud as CloudUpload
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file =>
      file.type.includes('pdf') ||
      file.type.includes('image') ||
      file.type.includes('document') ||
      file.size <= 20 * 1024 * 1024 // 20MB
    );

    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('image')) return Image;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadFiles = async () => {
    if (!userEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!userEmail.trim().toLowerCase().endsWith('@saveetha.com')) {
      toast.error('Only Saveetha college emails are allowed (must end with @saveetha.com)');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);
    const newProgress: { [key: string]: number } = {};

    try {
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        newProgress[file.name] = 0;
        setUploadProgress({ ...newProgress });

        const { error: uploadError } = await supabase.storage
          .from('file-uploads')
          .upload(filePath, file);

        if (uploadError) {
          toast.error(`Failed to upload ${file.name}`);
          console.error('Upload error:', uploadError);
          continue;
        }

        newProgress[file.name] = 50;
        setUploadProgress({ ...newProgress });

        const { error: dbError } = await supabase.from('file_uploads').insert({
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          user_email: userEmail.trim()
        });

        if (dbError) {
          toast.error(`Failed to save metadata for ${file.name}`);
          console.error('DB error:', dbError);
          continue;
        }

        newProgress[file.name] = 100;
        setUploadProgress({ ...newProgress });
      }

      setSelectedFiles([]);
      setUserEmail('');
      setUploadProgress({});
      onUploadSuccess();

      toast.success('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl max-w-2xl w-full text-white border border-white/20">
        <div className="text-center mb-6">
          <CloudUpload className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Upload Study Materials</h3>
          <p className="text-white/70 text-sm">
            Please upload your files with{' '}
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-medium">
              college email
            </span>{' '}
            only. (Max: 20MB per file)
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Your College Email Address
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your college email"
            className="w-full px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 text-white placeholder-white/50 backdrop-blur-sm"
            required
          />
        </div>

        {/* File Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 mb-6 ${
            dragActive ? 'border-blue-400 bg-blue-500/20' : 'border-white/30 hover:border-white/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-10 h-10 text-white/70 mx-auto mb-3" />
          <h4 className="text-lg font-medium text-white mb-2">Drop files here or click to browse</h4>
          <p className="text-white/60 text-sm">Supports PDF, images, and documents</p>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                const progress = uploadProgress[file.name] || 0;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <FileIcon className="w-6 h-6 text-white flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{file.name}</p>
                        <p className="text-xs text-white/60">{formatFileSize(file.size)}</p>
                        {uploading && progress > 0 && (
                          <div className="mt-1">
                            <div className="w-full bg-white/20 rounded-full h-1">
                              <div
                                className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {!uploading && (
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={uploadFiles}
          disabled={uploading || !userEmail.trim() || selectedFiles.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {uploading ? (
  <span>
    Uploading {Math.round(
      Object.values(uploadProgress).reduce((a, b) => a + b, 0) / selectedFiles.length || 0
    )}%
  </span>
) : (
  <>
    <Upload className="w-5 h-5" />
    <span>
      {selectedFiles.length > 0 
        ? `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`
        : 'Select Files to Upload'
      }
    </span>
  </>
)}

        </button>
      </div>
    </div>
  );
};
