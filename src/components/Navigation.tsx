import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent animate-glow-pulse"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DoctorCare
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" asChild className="text-foreground hover:text-primary">
                  <Link to="/register">Register</Link>
                </Button>
                <Button asChild className="btn-neon">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-foreground hover:text-primary">
                  <Link to="/chat">AI Health Chat</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;