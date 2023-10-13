import React from 'react';
import type { IntlShape } from 'react-intl';
import { createIntl, IntlProvider } from 'react-intl';
//引入Antd国际化配置
import antdEnUS from 'antd/lib/locale/en_US';
import antdZhCN from 'antd/lib/locale/zh_CN';

// 中英文的配置
import enLn from './components/ln-en';
import zhLn from './components/ln-zh';

let gIntl: IntlShape;

// 默认语言
const defaultLanguage = 'zh-cn';

// 当前使用的语言
const currentLocalName = localStorage.getItem('NG_TRANSLATE_LANG_KEY') || defaultLanguage;

// 添加默认语言
if (!localStorage.getItem('NG_TRANSLATE_LANG_KEY')) {
    localStorage.setItem('NG_TRANSLATE_LANG_KEY', defaultLanguage);
}

/**
 * 本地默认语言配置
 */

export const localeInfo: Record<string, any> = {
    en: {
        messages: enLn,
        locale: 'en',
        antd: antdEnUS,
        momentLocale: ''
    },
    'zh-cn': {
        messages: zhLn,
        locale: 'zh-cn',
        antd: antdZhCN,
        momentLocale: 'zh-cn'
    }
};

// 当前使用的localeInfo

const currentlocaleInfo = localeInfo[currentLocalName];

/**
 * 设置默认语言
 * @param lang
 */

// const setDefaultLanguage = (lang: string) => {
//     defaultLanguage = lang;
// }

/**
 * 获取当前选择的语言
 * @returns string
 */

export const getLocale = () => {
    return currentLocalName;
};

/**
 * 包裹了默认的locale的 Provider
 * LocaleProvider 需要在App.tsx中使用， 包裹整个项目
 * @param props
 * @returns
 */

export const LocaleProvider: React.FC = (props) => {
    return <IntlProvider locale={getLocale()}>{props.children}</IntlProvider>;
};

/**
 * 获取当前的intl对象， 可以在node中使用
 * @param locale 需要切换的语言类型
 * @param changeIntl 是否不使用g_intl
 * @returns IntlShape
 */

const getIntl = (locale?: string, changeIntl?: boolean) => {
    // 如果全局的g_intl存在， 并且不是setIntl调用
    if (gIntl && !changeIntl && !locale) {
        return gIntl;
    }
    // 如果存在与localeInfo中
    if (locale && localeInfo[locale]) {
        return createIntl(localeInfo[locale]);
    }

    // 使用默认语言
    if (localeInfo[defaultLanguage]) {
        return createIntl(localeInfo[defaultLanguage]);
    }

    // 使用zh-cn
    if (localeInfo['zh-cn']) return createIntl(localeInfo['zh-cn']);

    // 抛出异常

    if (!locale || !!localeInfo[locale]) {
        throw new Error(`Could not find locale data for locale "${locale}"`);
    }

    // 如果还没有 返回一个空的
    return createIntl({
        locale: '',
        messages: {}
    });
};

/**
 * 切换全局的 intl 的设置
 * @param locale  语言类型的key
 */

const setintl = (locale: string) => {
    gIntl = getIntl(locale, true);
};

/**
 * 切换语言
 * @param locale 语言类型的key
 * @returns string
 */

export const setLocale = (lang: string) => {
    if (typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem('NG_TRANSLATE_LANG_KEY', lang || '');
    }
    window.location.reload();
};

interface MessageDescriptor {
    id?: string;
    description?: string | any;
    defaultMessage?: string;
}

/**
 * 语言转换
 * @param descriptor
 * @param values
 */

export const formatMessage = (descriptor: MessageDescriptor, values?: Record<string, any>) => {
    if (!gIntl) {
        setintl(getLocale());
    }
    return gIntl.formatMessage(descriptor, values);
};

/**
 * 获取当前语言信息
 * @returns
 */

export const getLocaleInfo = () => {
    return currentlocaleInfo;
};

export { createIntl };
