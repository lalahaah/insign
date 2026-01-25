import {
    signInWithPopup,
    GoogleAuthProvider,
    OAuthProvider,
    signInAnonymously as firebaseSignInAnonymously,
    signOut as firebaseSignOut,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    User,
} from 'firebase/auth';
import { auth } from './config';

// Google 로그인
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account',
    });

    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error('Google 로그인 오류:', error);
        throw error;
    }
};

// Apple 로그인
export const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error('Apple 로그인 오류:', error);
        throw error;
    }
};

// 익명 로그인
export const signInAnonymously = async () => {
    try {
        const result = await firebaseSignInAnonymously(auth);
        return result.user;
    } catch (error) {
        console.error('익명 로그인 오류:', error);
        throw error;
    }
};

// 로그아웃
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('로그아웃 오류:', error);
        throw error;
    }
};

// 인증 상태 변경 감지
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
    return firebaseOnAuthStateChanged(auth, callback);
};
