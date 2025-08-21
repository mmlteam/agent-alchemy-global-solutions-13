import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const STATIC_PASSWORD = 'unlock@123';
const SESSION_KEY = 'site_unlocked';

interface MaintenanceLockProps {
  children: React.ReactNode;
}

export const MaintenanceLock = ({ children }: MaintenanceLockProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem(SESSION_KEY);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === STATIC_PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card/90 backdrop-blur border border-border rounded-lg p-8 w-full max-w-md mx-4 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Site Under Maintenance
          </h2>
          <p className="text-muted-foreground">
            Please enter the password to access the website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-2">{error}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            Unlock Website
          </Button>
        </form>
      </div>
    </div>
  );
};