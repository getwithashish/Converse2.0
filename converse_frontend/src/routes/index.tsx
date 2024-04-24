import { useState, useEffect, Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom';
import { Dashboard } from '@/pages/dashboard';
import { SignInPage } from '@/pages/auth/signin';
import { RegisterPage } from '@/pages/auth/register';
import ChatPage from '@/pages/converseChat';
import ChatDocPage from '@/pages/converseChatDoc';
import ChatDBPage from '@/pages/converseChatDb';
const LandingPage = lazy(() => import('@/pages/landing-page'))
const DashboardLayout = lazy(() => import('@/components/layout/dashboard-layout'));

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
};

const PrivateRoute = ({ element, path }: { element: JSX.Element; path: string }) => {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return element;
};

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <LandingPage />,
          index: true
        },
      ]
    }
  ];

  const publicRoutes = [
    {
      path: 'signin',
      element: <SignInPage />
    },
    {
      path: '/dashboard',
      element: <PrivateRoute path="/dashboard" element={<Dashboard />} />
    },
    {
      path: '/register',
      element: <RegisterPage />,
      index: true
    },
    {
      path:'/chat',
      element:<ChatPage />
    },
    {
      path:'/landing',
      element:<LandingPage/>
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path:'/chat_with_doc',
      element:<ChatDocPage/>
    },
    {
      path: '/chat_with_db',
      element: <ChatDBPage />
    }

  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
