import { useState } from 'react';
import ConfigProvider from 'antd/lib/config-provider';
import 'antd/dist/antd.less';
import RouterPage from './routes';
import { getLocale, localeInfo, LocaleProvider } from './components/locales';

import style from './App.module.less';

/**
 * 入口
 * @returns
 */

const App = () => {
    const [locale] = useState(localeInfo[getLocale()]);
    return (
        <>
            <div className={style.App}>
                <header className={style.AppHeader}>
                    <LocaleProvider>
                        <ConfigProvider locale={locale?.antd}>
                            <RouterPage />
                        </ConfigProvider>
                    </LocaleProvider>
                </header>
            </div>
        </>
    );
};

export default App;
