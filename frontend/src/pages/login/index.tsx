import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

import { parseQueryParams } from '@/utils/index';

import type { ILoginPlatform } from '@/models/index';

import { getEndpoints } from '@/api/login';

import c3Logo from '@/assets/images/open-c3-logo-v2.jpeg';
import style from './index.module.less';

const LoginPage: React.FC = () => {
    const [platformList, setPlatformList] = useState<ILoginPlatform[]>([]);
    useEffect(() => {
        const getData = async () => {
            const dataRet = await getEndpoints();
            if (dataRet) {
                const { data } = dataRet;
                setPlatformList(data || []);
            }
        };
        getData();
    }, []);

    const handleJump: (name: string) => void = (name) => {
        const locationSearch = parseQueryParams(window.location.href);
        const selectItem = platformList.find((item) => item.name === name) as ILoginPlatform;
        if (selectItem.callback) {
            window.location.href = `${selectItem.callback}${locationSearch.callback ? locationSearch.callback : ''}`;
        } else {
            window.location.href = selectItem.domain;
        }
    };

    return (
        <div className={style['login']}>
            <div className={style['login-image']}>
                <Image width={234} src={c3Logo} preview={false} />
            </div>
            <div className={style['login-address']}>
                <div style={{ marginTop: '67px' }}>请选择要跳转的平台</div>
                <div className={style['platform-list']}>
                    {platformList.map((item: any) => (
                        <div key={item.name} className={style['li-items']} style={{ margin: '20px 0' }}>
                            <div onClick={() => handleJump(item.name)}>登录{item.name}平台</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
