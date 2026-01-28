'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MultipleFileUploadProps {
    value?: string[];
    onChange: (urls: string[]) => void;
    onUpload: (file: File) => Promise<string>;
    accept?: string;
    maxSizeMB?: number;
    className?: string;
    label?: string;
    maxFiles?: number;
}

export function MultipleFileUpload({
    value = [],
    onChange,
    onUpload,
    accept = 'image/*',
    maxSizeMB = 5,
    className = '',
    label = 'Upload Images',
    maxFiles = 10,
}: MultipleFileUploadProps) {
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: File[]) => {
        if (value.length + files.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const validFiles = files.filter(file => {
            // Validate size
            if (file.size > maxSizeMB * 1024 * 1024) {
                toast.error(`File ${file.name} too large. Max size is ${maxSizeMB}MB`);
                return false;
            }
            // Validate type
            if (accept && !file.type.match(accept.replace('*', '.*'))) {
                toast.error(`File ${file.name} has invalid type`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        try {
            setLoading(true);
            const uploadPromises = validFiles.map(file => onUpload(file));
            const uploadedUrls = await Promise.all(uploadPromises);
            onChange([...value, ...uploadedUrls]);
            toast.success(`Successfully uploaded ${uploadedUrls.length} file(s)`);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload some files');
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleRemove = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

            {/* Upload Zone */}
            <div
                className={`
          relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center
          ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}
          ${loading ? 'opacity-50 cursor-wait' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !loading && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={handleChange}
                    disabled={loading}
                    multiple
                />

                <div className="flex flex-col items-center justify-center gap-3">
                    {loading ? (
                        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                    ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-gray-500" />
                        </div>
                    )}

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                            {loading ? 'Uploading...' : 'Click or drop files to upload'}
                        </p>
                        <p className="text-xs text-gray-500">
                            Max {maxFiles} files, {maxSizeMB}MB each
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {value.map((url, index) => (
                        <div key={`${url}-${index}`} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Copy as markdown image syntax so it renders in the editor
                                        const markdownImage = `![Image](${url})`;
                                        navigator.clipboard.writeText(markdownImage);
                                        toast.success('Image copied! Paste into editor.');
                                    }}
                                    className="bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-white hover:text-blue-500"
                                    title="Copy URL"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-white hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
