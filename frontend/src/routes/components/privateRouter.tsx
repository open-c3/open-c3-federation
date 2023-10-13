import { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';

// import { Result, Button } from 'antd';
import { RouteProps } from 'react-router';
// import { parseCookies } from '@/utils/index';
const PrivateRoute: FC<RouteProps> = (props) => {
    // const logged = parseCookies();
    const history = useHistory();
    const currentRoute = history.location.pathname;
    if (currentRoute === '/') {
        history.push('/alert');
    }
    return <Route {...props} />;
    // return logged.u ? (
    //     <Route {...props} />
    // ) : (
    //     <Result
    //         status="403"
    //         title="403"
    //         subTitle={'无权限'}
    //         extra={
    //             <Button type="primary" onClick={() => history.push('/login')}>
    //                 跳转到登录
    //             </Button>
    //         }
    //     ></Result>
    // );
};

export default PrivateRoute;
