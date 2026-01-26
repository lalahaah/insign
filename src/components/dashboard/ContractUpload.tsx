'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface ContractUploadProps {
    onUploadStarted: (file: File) => void;
    isUploading: boolean;
    uploadProgress: number;
}

export function ContractUpload({ onUploadStarted, isUploading, uploadProgress }: ContractUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            validateAndSetFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            validateAndSetFile(files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        // 파일 형식 검사
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            toast.error('지원하지 않는 파일 형식입니다. PDF, JPG, PNG 파일만 업로드 가능합니다.');
            return;
        }

        // 파일 크기 검사 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.');
            return;
        }

        setSelectedFile(file);
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleStartAnalysis = () => {
        if (selectedFile) {
            onUploadStarted(selectedFile);
        }
    };

    return (
        <Card 
            className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 ${
                isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-primary/20 bg-card hover:border-primary/40'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="p-12 flex flex-col items-center text-center">
                {!selectedFile && !isUploading ? (
                    <>
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-in fade-in zoom-in duration-500">
                            <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                            계약서 업로드
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            분석하고 싶은 계약서를 드래그 앤 드롭하거나 아래 버튼을 클릭하여 선택하세요.
                            <br />
                            <span className="text-xs opacity-70">(PDF, JPG, PNG 최대 10MB)</span>
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept=".pdf, .jpg, .jpeg, .png"
                        />
                        <Button 
                            size="lg" 
                            className="bg-primary hover:opacity-90 shadow-lg shadow-primary/20 px-8 py-6 text-lg rounded-xl"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            파일 선택하기
                        </Button>
                    </>
                ) : isUploading ? (
                    <div className="w-full max-w-md animate-in fade-in duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">파일 업로드 중...</h3>
                        <p className="text-muted-foreground mb-6 text-sm">{selectedFile?.name}</p>
                        <div className="space-y-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-right text-muted-foreground">{Math.round(uploadProgress)}%</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
                        <div className="relative w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-primary" />
                            <button 
                                onClick={removeFile}
                                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold mb-1 truncate px-4">{selectedFile?.name}</h3>
                        <p className="text-muted-foreground mb-8 text-sm">
                            {(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <Button 
                                size="lg" 
                                className="w-full bg-primary hover:opacity-90 shadow-lg shadow-primary/20 text-lg py-6 rounded-xl"
                                onClick={handleStartAnalysis}
                            >
                                AI 분석 시작하기
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="text-muted-foreground hover:text-foreground"
                                onClick={removeFile}
                            >
                                다른 파일 선택
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <FileText className="w-32 h-32 rotate-12" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 opacity-5 pointer-events-none">
                <AlertCircle className="w-24 h-24 -rotate-12" />
            </div>
        </Card>
    );
}
