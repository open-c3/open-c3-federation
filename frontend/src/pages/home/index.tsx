import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Image, Dropdown, message } from 'antd';
import { AlertOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';

// import { formatMessage } from '@/components/locales';
import { clearAllCookies } from '@/utils/index';

import { getUseInfo } from '@/api/index';
import { getLogout } from '@/api/login';

import type { MenuProps } from 'antd';
import type { IUserInfo } from '@/models/index';

import { ReactComponent as TicketSvg } from '@/assets/svg/ticket.svg';
import c3Logo from '@/assets/images/open-c3-logo-v2.jpeg';
import style from './index.module.less';

const { Header, Content, Sider } = Layout;

// 用户下拉菜单
const items: MenuProps['items'] = [
    {
        label: '登出',
        key: 'logout',
        icon: <LogoutOutlined />
    }
];

const HomePage: React.FC = ({ children }) => {
    const history = useHistory();
    const currentRouter = history.location.pathname.replace('/', '');

    const [collapsed, setCollapsed] = useState<boolean>(true); // 收缩侧边栏
    const [useInfo, setUseInfo] = useState<IUserInfo>({}); // 用户信息
    // 侧边栏菜单
    const menuItems: MenuProps['items'] = [
        {
            key: 'alert',
            label: '告警',
            icon: <AlertOutlined />,
            onClick: () => {
                history.push('/alert');
            }
        },
        {
            key: 'ticket',
            label: '工单',
            icon: <TicketSvg style={{ width: '1em', height: '1em' }} />,
            onClick: () => {
                history.push('/ticket');
            }
        }
    ];

    // 登出操作
    const handleLogout = async () => {
        const dataRet = await getLogout();
        const { code, data } = dataRet;
        if (code === 200) {
            message.success(data || '退出成功！');
            clearAllCookies();
            history.push(`/login?callback=${window.location.href}`);
            // window.location.href = `/static/index.html/#/login?callback=${window.location.href}`
        }
    };

    // 用户信息操作
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'logout':
                handleLogout();
                break;
        }
    };

    // 获取用户基本信息
    useEffect(() => {
        const getInfo = async () => {
            const dataRet = await getUseInfo();
            if (dataRet) {
                const { code, data } = dataRet;
                if (code === 200) {
                    setUseInfo(data);
                }
            }
        };
        getInfo();
    }, []);

    return (
        <Layout style={{ width: '100%', height: '100%' }}>
            <Header className={style.header}>
                <div
                    className={style.logo}
                    onClick={() => {
                        history.push('/alert');
                    }}
                >
                    <Image width={60} src={c3Logo} preview={false} />
                    <span className={style['logo-text']}>OPEN-C3</span>
                </div>
                <div className={style['header-userinfo']}>
                    <Dropdown menu={{ items, onClick }} trigger={['click']} arrow>
                        <div onClick={(e) => e.preventDefault()}>
                            <span>{useInfo?.name}</span>
                            <DownOutlined style={{ marginLeft: 10 }} />
                        </div>
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    className="site-layout-background"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[currentRouter || 'alert']}
                        defaultOpenKeys={['alerts']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                    />
                </Sider>
                <Layout className="site-layout" style={{ padding: '0' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default HomePage;
