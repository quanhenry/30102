import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Breadcrumbs from './components/Breadcrumbs';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import { useAuth } from './hooks/useAuth';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));
const Settings = lazy(() => import('./pages/Settings'));

const AppRoutes = () => {
  const { isAuthenticated, hasPermission } = useAuth();

  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Breadcrumbs />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login" />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute 
                      isAllowed={isAuthenticated && hasPermission('ADMIN')}
                      redirectPath="/dashboard"
                    >
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default AppRoutes;