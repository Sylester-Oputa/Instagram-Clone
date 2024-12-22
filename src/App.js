import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';



const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
