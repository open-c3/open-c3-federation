import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRouter';

import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import AlertPage from '@/pages/allalerts';
import TicketPage from '@/pages/tt-ticket';
import NotFoundPage from '@/pages/abnormal/404';

const RouterPage: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path={'/login'} component={LoginPage} />
                <Route
                    path="/"
                    render={() => (
                        <HomePage>
                            <Switch>
                                <PrivateRoute path="/alert" component={AlertPage} />
                                <PrivateRoute path="/ticket" component={TicketPage} />
                                <PrivateRoute path="/*" component={NotFoundPage} />
                                <Redirect to="/alert" />
                            </Switch>
                        </HomePage>
                    )}
                />
            </Switch>
        </HashRouter>
    );
};

export default RouterPage;
