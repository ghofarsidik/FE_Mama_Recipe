import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PrivateRoute = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);

      if (!storedToken) {
        router.replace('/login');
      }
    }, [router]);

    if (typeof window === 'undefined') {
      return null; 
    } 

    if (!token) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default PrivateRoute;
