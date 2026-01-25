import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    UploadTask
} from 'firebase/storage';
import { storage } from './config';

export interface UploadProgress {
    progress: number;
    bytesTransferred: number;
    totalBytes: number;
}

/**
 * 파일을 Firebase Storage에 업로드합니다
 * @param file 업로드할 파일
 * @param userId 사용자 ID
 * @param contractId 계약서 ID
 * @param onProgress 업로드 진행 상황 콜백
 * @returns 업로드된 파일의 다운로드 URL
 */
export const uploadContractFile = (
    file: File,
    userId: string,
    contractId: string,
    onProgress?: (progress: UploadProgress) => void
): Promise<{ downloadURL: string; uploadTask: UploadTask }> => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `contracts/${userId}/${contractId}/original.pdf`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) {
                    onProgress({
                        progress,
                        bytesTransferred: snapshot.bytesTransferred,
                        totalBytes: snapshot.totalBytes,
                    });
                }
            },
            (error) => {
                console.error('파일 업로드 오류:', error);
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve({ downloadURL, uploadTask });
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

/**
 * 파일의 다운로드 URL을 가져옵니다
 * @param path Firebase Storage 경로
 * @returns 다운로드 URL
 */
export const getFileDownloadURL = async (path: string): Promise<string> => {
    try {
        const storageRef = ref(storage, path);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('다운로드 URL 가져오기 오류:', error);
        throw error;
    }
};

/**
 * 파일을 삭제합니다
 * @param path Firebase Storage 경로
 */
export const deleteFile = async (path: string): Promise<void> => {
    try {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('파일 삭제 오류:', error);
        throw error;
    }
};
