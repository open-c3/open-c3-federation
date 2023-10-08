import React, { useState, useEffect } from 'react';
import { Image, Button } from 'antd';

import { parseQueryParams } from '@/utils/index';

import type { ILoginPlatform } from '@/models/index';

import { getEndpoints } from '@/api/login';

import c3Logo from '@/assets/images/open-c3-logo-v2.jpeg';
import style from './index.module.less';

const LoginPage: React.FC = () => {
    const [platformList, setPlatformList] = useState<ILoginPlatform[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingBox] = useState<Array<string>>(
        [...Array(5).keys()].map((item: number) => `rect${item + 1}`.toString())
    );

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const dataRet = await getEndpoints();
            if (dataRet) {
                const { data } = dataRet;
                setLoading(false);
                setPlatformList(data || []);
            } else {
                setLoading(false);
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
                <div>请选择要跳转的平台</div>
                {loading ? (
                    <div className={style['translate-content']}>
                        {loadingBox.map((item: string) => {
                            return <div key={item} className={style[item]}></div>;
                        })}
                    </div>
                ) : (
                    <div className={style['platform-list']}>
                        {platformList.map((item: any) => (
                            <Button
                                disabled={item.login === 0}
                                key={item.name}
                                className={style['li-items']}
                                onClick={() => handleJump(item.name)}
                            >
                                登录{item.name}平台
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
