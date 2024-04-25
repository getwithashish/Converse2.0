import { Suspense, lazy } from 'react';
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
  let isLoggedIn = false;

  const token = localStorage.getItem('authToken');
  if (token) {
    isLoggedIn = true;
  }

  return isLoggedIn;
};

const PrivateRoute = ({
  element,
  path
}: {
  element: JSX.Element;
  path: string;
}) => {
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
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/landing',
      element: <LandingPage />
    },
    {
      path: 'signin',
      element: <SignInPage />
    },
    {
      path: '/register',
      element: <RegisterPage />,
      index: true
    },
    {
      path: '/dashboard',
      // element: <PrivateRoute path="/dashboard" element={<Dashboard />} />,
      element: <Dashboard/>

    },
    
    {
      path: '/chat',
      // element: <PrivateRoute path="/chat" element={<ChatPage />} />,
      element: <ChatPage/>
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path:'/chat_with_doc',
      // element: <PrivateRoute path="/chat_with_doc" element={<ChatDocPage/>} />
      element: <ChatDocPage/>
    },
    {
      path: '/chat_with_db',
      // element: <PrivateRoute path="/chat_with_doc" element={<ChatDBPage />} />
      element: <ChatDBPage/>
    }

  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
