'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/config';
import { UserProfile, createUserProfile } from '@/types/user';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (authUser) => {
            setUser(authUser);

            if (authUser) {
                // Firestore에서 사용자 프로필 가져오기
                const profileRef = doc(db, 'users', authUser.uid, 'profile', 'data');
                const profileSnap = await getDoc(profileRef);

                if (profileSnap.exists()) {
                    const data = profileSnap.data();
                    setUserProfile({
                        ...data,
                        createdAt: data.createdAt?.toDate() || new Date(),
                        lastLogin: data.lastLogin?.toDate() || new Date(),
                    } as UserProfile);
                } else {
                    // 프로필이 없으면 새로 생성
                    const newProfile = createUserProfile(
                        authUser.uid,
                        authUser.email,
                        authUser.displayName,
                        authUser.photoURL
                    );

                    await setDoc(profileRef, {
                        ...newProfile,
                        createdAt: newProfile.createdAt,
                        lastLogin: newProfile.lastLogin,
                    });

                    setUserProfile(newProfile);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
