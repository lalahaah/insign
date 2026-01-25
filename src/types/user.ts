// 사용자 멤버십 티어
export type MembershipTier = 'Free' | 'Pro' | 'Master';

// 지원 언어
export type Language = 'en' | 'ko';

// 사용자 프로필 인터페이스
export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    preferredLanguage: Language;
    membership: MembershipTier;
    createdAt: Date;
    lastLogin: Date;
}

// Firebase User를 UserProfile로 변환하는 함수
export const createUserProfile = (
    uid: string,
    email: string | null = null,
    displayName: string | null = null,
    photoURL: string | null = null
): UserProfile => {
    return {
        uid,
        email,
        displayName,
        photoURL,
        preferredLanguage: 'en',
        membership: 'Free',
        createdAt: new Date(),
        lastLogin: new Date(),
    };
};
