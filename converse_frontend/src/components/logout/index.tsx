import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/landing');
  };

  return (
    <div className="absolute bottom-0 items-center justify-center p-4">
      <Button className="text-xs" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
