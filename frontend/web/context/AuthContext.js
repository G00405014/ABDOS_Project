import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get token from localStorage safely (only on client-side)
  const getToken = () => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('accessToken');
      }
      return null;
  }

  useEffect(() => {
    // Check if user is logged in on initial load
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const token = getToken();
    if (!token) {
        setLoading(false);
        setUser(null); // Ensure user is null if no token
        return;
    }

    try {
      // Send token in Authorization header
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        // Remove credentials: include if using Authorization header
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
          // If token is invalid/expired, clear it
          localStorage.removeItem('accessToken');
          setUser(null);
          if (response.status === 401) {
              console.log("Session expired or invalid. Please log in again.");
          } else {
              console.error('Error checking auth status:', response.statusText);
          }
      }
    } catch (error) {
      console.error('Error during checkUserLoggedIn fetch:', error);
      localStorage.removeItem('accessToken'); // Clear token on fetch error too
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No credentials: include needed here
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and set user
      if (data.access_token) {
           localStorage.setItem('accessToken', data.access_token);
      }
      setUser(data.user || null); // Use user data from response
      return data;
    } catch (error) {
      setError(error.message);
      localStorage.removeItem('accessToken'); // Clear token on failed login
      setUser(null);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      
      const requestBody = { name, email, password }; 
      console.log('[AuthContext] Sending registration body:', requestBody);
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No credentials: include needed here
        body: JSON.stringify(requestBody), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and set user after successful registration
       if (data.access_token) {
           localStorage.setItem('accessToken', data.access_token);
      }
      setUser(data.user || null); 
      return data;
      
    } catch (error) {
      setError(error.message);
      console.error("[AuthContext] Registration fetch error:", error);
      localStorage.removeItem('accessToken'); // Clear token on failed registration
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
     const token = getToken();
     // Optimistically remove token and user state
     localStorage.removeItem('accessToken');
     setUser(null);
     
     // Attempt to notify backend (optional, might fail if token already invalid)
     if (token) {
         try {
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                 headers: {
                    'Authorization': `Bearer ${token}`
                 }
            });
         } catch (error) {
            console.error('Logout API call error:', error); // Log error but user is already logged out on frontend
         }
     }
     // Redirect is handled in Header component
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getToken // Expose getToken if needed elsewhere, or keep internal
  };

  return (
    <AuthContext.Provider value={value}>
      {children} {/* Render children immediately, loading handled internally */}
    </AuthContext.Provider>
  );
}; 