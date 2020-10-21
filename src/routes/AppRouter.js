import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Loading from '../components/shared/Loading';
import { newsStartLoading } from '../actions/news';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';

const LoginScreen = lazy(() => import('../screens/auth/LoginScreen'));
const RegisterScreen = lazy(() => import('../screens/auth/RegisterScreen'));
const Navbar = lazy(() => import('../components/shared/Navbar'));
const HomeScreen = lazy(() => import('../screens/HomeScreen'));
const NewsDetail = lazy(() => import('../components/news/NewsDetail'));
const BlogScreen = lazy(() => import('../screens/BlogScreen'));
const Confirmation = lazy(() => import('../components/Confirmation'));

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(newsStartLoading());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Navbar />
        <main id='main'>
          <Switch>
            <PublicRoute
              exact
              isAuth={!!uid}
              path='/blog'
              component={BlogScreen}
            />
            <PublicRoute
              exact
              isAuth={!!uid}
              path='/login'
              component={LoginScreen}
            />
            <PublicRoute
              exact
              isAuth={!!uid}
              path='/register'
              component={RegisterScreen}
            />
            <PublicRoute
              exact
              isAuth={!!uid}
              path='/confirmation'
              component={Confirmation}
            />
            <PrivateRoute
              exact
              isAuth={!!uid}
              path='/'
              component={HomeScreen}
            />
            <PrivateRoute
              exact
              isAuth={!!uid}
              path='/new/:_id'
              component={NewsDetail}
            />
          </Switch>
        </main>
      </Router>
    </Suspense>
  );
};
