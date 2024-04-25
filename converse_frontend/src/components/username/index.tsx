import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserName = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const sub = decodedToken.sub; 
          setUsername(sub || '');
        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }
      }
    };

    decodeToken(); 
  }, []);

    return (
        <div className="justify-end space-y-2 text-xs tracking-tight md:space-y-4">
        {username ? `Hi, ${username}` : 'User'}
        </div>
    );
    };
