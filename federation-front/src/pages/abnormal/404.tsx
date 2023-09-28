import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFoundPage: React.FC = () => {
    const history = useHistory();
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        history.push('/alert');
                    }}
                >
                    跳转到首页
                </Button>
            }
        />
    );
};

export default NotFoundPage;
