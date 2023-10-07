import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    const history = useHistory();
    return (
        <Result
            status="403"
            title="403"
            subTitle="抱歉，您无权访问此页面。"
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

export default UnauthorizedPage;
