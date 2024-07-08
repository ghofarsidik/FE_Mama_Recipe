/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const PublicRoute = (WrappedComponent, restricted = false) => {
  const ComponentWithPublicRoute = (props) => {
    const router = useRouter();
    const reduxToken = useSelector((state) => state.auth.token);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
      setIsClient(true);
      const localToken = localStorage.getItem('token');
      if (localToken) {
        setToken(localToken);
      }
    }, []);

    useEffect(() => {
      if (isClient && (token || reduxToken) && restricted) {
        router.replace('/');
      }
    }, [isClient, token, reduxToken, router]);

    if (!isClient) {
      return null; // or a loading spinner
    }

    if ((token || reduxToken) && restricted) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPublicRoute;
};

export default PublicRoute;
