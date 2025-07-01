import React, { useState, useEffect } from 'react';
import { FileText, Image, File, Download, Eye, Calendar, User, HardDrive, Loader2, BookOpen, FileCode, Archive } from 'lucide-react';
import { supabase, type FileUpload } from '../lib/supabase';

interface MaterialsDisplayProps {
  refreshTrigger: number;
}

export const MaterialsDisplay: React.FC<MaterialsDisplayProps> = ({ refreshTrigger }) => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileUpload | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('file_uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      setFiles(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('image')) return Image;
    if (fileType.includes('document') || fileType.includes('word')) return BookOpen;
    if (fileType.includes('text')) return FileCode;
    if (fileType.includes('zip') || fileType.includes('rar')) return Archive;
    return File;
  };

  const getFileCategory = (fileType: string, fileName: string) => {
    if (fileType.includes('pdf') || fileName.toLowerCase().includes('.pdf')) return 'PDF Documents';
    if (fileType.includes('image')) return 'Images';
    if (fileType.includes('document') || fileType.includes('word')) return 'Documents';
    return 'Other Files';
  };

  const getGradientColor = (category: string) => {
    switch (category) {
      case 'PDF Documents':
        return 'from-red-500/20 to-red-600/20';
      case 'Images':
        return 'from-green-500/20 to-green-600/20';
      case 'Documents':
        return 'from-blue-500/20 to-blue-600/20';
      default:
        return 'from-purple-500/20 to-purple-600/20';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewFile = async (file: FileUpload) => {
    try {
            const { data } = await supabase.storage
        .from('file-uploads')
        .getPublicUrl(file.file_path);

      setFileUrl(data.publicUrl);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error getting file URL:', error);
    }
  };

  const handleDownload = async (file: FileUpload) => {
    try {
      setDownloading(file.id);
      
      // Get the file blob from Supabase storage
      const { data, error } = await supabase.storage
        .from('file-uploads')
        .download(file.file_path);

      if (error) {
        console.error('Download error:', error);
        alert('Failed to download file. Please try again.');
        return;
      }

      // Create blob URL and trigger download
      const blob = new Blob([data], { type: file.file_type });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const closeModal = () => {
    setSelectedFile(null);
    setFileUrl('');
  };

  // Group files by category
  const groupedFiles = files.reduce((acc, file) => {
    const category = getFileCategory(file.file_type, file.name);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, FileUpload[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-3 text-white/80">Loading materials...</span>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          No Materials Available Yet
        </h3>
        <p className="text-white/60 text-lg">
          Upload your first study material to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Available Study Materials</h2>
          <p className="text-white/70 text-lg">
            {files.length} file{files.length !== 1 ? 's' : ''} organized by category
          </p>
        </div>

        {Object.entries(groupedFiles).map(([category, categoryFiles]) => {
          const CategoryIcon = getFileIcon(categoryFiles[0]?.file_type || '');
          const gradientColor = getGradientColor(category);

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center mb-6">
                <CategoryIcon className="h-8 w-8 text-white mr-3" />
                <h3 className="text-2xl font-semibold text-white">{category}</h3>
                <span className="ml-3 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {categoryFiles.length} file{categoryFiles.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFiles.map((file) => {
                  const FileIcon = getFileIcon(file.file_type);
                  const isDownloading = downloading === file.id;
                  
                  return (
                    <div
                      key={file.id}
                      className={`glass-card rounded-xl p-6 bg-gradient-to-br ${gradientColor} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-lg mb-2 line-clamp-2">
                            {file.name}
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                              <HardDrive className="w-3 h-3" />
                              <span>{formatFileSize(file.file_size)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                              <User className="w-3 h-3" />
                              <span className="truncate">{file.user_email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(file.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleViewFile(file)}
                          className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          disabled={isDownloading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg p-3 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* File Viewer Modal */}
      {selectedFile && fileUrl && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/20">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {selectedFile.name}
                </h3>
                <p className="text-sm text-white/70">
                  Uploaded by {selectedFile.user_email}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDownload(selectedFile)}
                  disabled={downloading === selectedFile.id}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  {downloading === selectedFile.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-auto">
              {selectedFile.file_type.includes('pdf') ? (
                <iframe
                  src={fileUrl}
                  className="w-full h-[700px] border border-white/20 rounded-lg"
                  title={selectedFile.name}
                />
              ) : selectedFile.file_type.includes('image') ? (
                <img
                  src={fileUrl}
                  alt={selectedFile.name}
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-center py-12">
                  <File className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">
                    Preview not available for this file type. Click download to view the file.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};