import { createContext, useContext, useState, ReactNode } from 'react';

interface FakeUser {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: FakeUser;
  session: null;
  loading: boolean;
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
  const [currentUser] = useState<FakeUser>({ id: getAnonymousId() });

  const signOut = async () => {
    localStorage.removeItem('chef-name');
    localStorage.removeItem('chef-anonymous-id');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, session: null, loading: false, signOut }}>
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
