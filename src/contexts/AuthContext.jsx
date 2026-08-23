'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext(null);

async function fetchProfile(supabase, userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.warn('profile fetch', error.message);
    return null;
  }
  return data;
}

export const AuthProvider = ({ children }) => {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(
    async (user) => {
      if (!user) {
        setProfile(null);
        return null;
      }
      try {
        await fetch('/api/auth/ensure-profile', { method: 'POST' });
      } catch {
        /* ignore */
      }
      const p = await fetchProfile(supabase, user.id);
      setProfile(p);
      return p;
    },
    [supabase]
  );

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      if (data.session?.user) {
        refreshProfile(data.session.user).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        refreshProfile(nextSession.user);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, refreshProfile]);

  const signInWithGoogle = async (nextPath = '/dashboard') => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const next = nextPath.startsWith('/') ? nextPath : '/dashboard';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        role: profile?.role || 'operator',
        profile,
      }
    : null;

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isAdmin,
        signInWithGoogle,
        logout,
        refreshProfile,
        supabase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
