import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FakeUser {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: FakeUser | null;
  session: null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate or retrieve a stable anonymous ID for this device
function getAnonymousId(): string {
  let id = localStorage.getItem('chef-anonymous-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('chef-anonymous-id', id);
  }
  return id;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const chefName = localStorage.getItem('chef-name');
  const [user] = useState<FakeUser | null>(
    chefName ? { id: getAnonymousId() } : null
  );

  // Listen for storage changes (when name is set during onboarding)
  const [currentUser, setCurrentUser] = useState<FakeUser | null>(user);

  useEffect(() => {
    const checkName = () => {
      const name = localStorage.getItem('chef-name');
      if (name) {
        setCurrentUser({ id: getAnonymousId() });
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', checkName);
    return () => window.removeEventListener('storage', checkName);
  }, []);

  const signIn = async () => ({ error: null });
  const signUp = async () => ({ error: null });
  const signOut = async () => {
    localStorage.removeItem('chef-name');
    localStorage.removeItem('chef-anonymous-id');
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, session: null, loading: false, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
