'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// Create Auth Context
const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mongoUser, setMongoUser] = useState(null);

  // Sync user with MongoDB backend
  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) {
      setMongoUser(null);
      return null;
    }

    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMongoUser(data.user);
        return data.user;
      } else {
        console.error('Failed to sync user with backend');
        return null;
      }
    } catch (error) {
      console.error('Error syncing user:', error);
      return null;
    }
  };

  // Get current Firebase ID token
  const getIdToken = async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase not configured' };
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserWithBackend(result.user);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email, password) => {
    if (!auth) {
      return { success: false, error: 'Firebase not configured' };
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncUserWithBackend(result.user);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Email sign in error:', error);
      let message = 'Failed to sign in';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password';
      }
      return { success: false, error: message };
    }
  };

  // Register with email and password
  const registerWithEmail = async (name, email, password) => {
    if (!auth) {
      return { success: false, error: 'Firebase not configured' };
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(result.user, { displayName: name });
      
      // Sync with backend
      await syncUserWithBackend(result.user);
      
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Registration error:', error);
      let message = 'Failed to create account';
      if (error.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters';
      }
      return { success: false, error: message };
    }
  };

  // Sign out
  const signOut = async () => {
    if (!auth) {
      return { success: false, error: 'Firebase not configured' };
    }
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setMongoUser(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        await syncUserWithBackend(firebaseUser);
      } else {
        setMongoUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    mongoUser,
    loading,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOut,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
