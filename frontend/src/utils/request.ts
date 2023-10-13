/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import umiRequest, { extend } from 'umi-request';
import { notification, message } from 'antd';
import { urlPrefix } from '../config';
import {parseQueryParams} from '@/utils/index'

export const codeMessage = {
    200: '请求成功',
    400: '请求错误',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    10000: '登录已过期，请重新登录'
};

/**
 * 异常处理程序
 */
let isErrorNotificationShow = false;
const errorHandler = (error) => {
    const { response } = error;
    if (response && response.status) {
        const { status } = response;
        const errorText = codeMessage[response.status] || response.statusText;
        if (!isErrorNotificationShow) {
            message.error(`${codeMessage[status] || '请求错误'}`);
            notification.error({
                message: `${codeMessage[status] || '请求错误'}`,
                description: errorText
            });
            isErrorNotificationShow = true;
        }
    } else if (!response) {
        if (!isErrorNotificationShow) {
            message.error('您的网络发生异常，无法连接服务器');
            notification['error']({
                description: '您的网络发生异常，无法连接服务器',
                message: '网络异常'
            });
            isErrorNotificationShow = true;
        }
    }
    return response;
};

/**
 * 配置request请求时的默认参数
 */
// 使用前缀，配合本地代理
export const whyRequest = extend({
    errorHandler, // 默认错误处理
    prefix: `${urlPrefix}`
});

// request拦截器, 改变url 或 options
whyRequest.interceptors.request.use(
    (url, options) => {
        return {
            url,
            options: { ...options }
        };
    },
    { global: false }
);

// 和上一个相同
whyRequest.interceptors.request.use(
    (url, options) => {
        return {
            url: `${url}`,
            options: { ...options, interceptors: true }
        };
    },
    { global: true }
);

// let isNotificationShown = false;
// 克隆响应对象做解析处理
whyRequest.interceptors.response.use(async (response): Promise<any> => {
    try {
        const dataText = await response.clone().text();
        const data = dataText ? JSON.parse(dataText.indexOf('<!doctype') > -1 ? '{}' : dataText) : {};
        if (data && data.code && data.code !== 200) {
            let message = '';
            if (data.data) {
                message = data.data.Message;
            }
            if (!isErrorNotificationShow) {
                notification.error({
                    description: data.info || message,
                    message: codeMessage[data.code]
                });
                isErrorNotificationShow = true;
                if (data.code === 10000) window.location.href = parseQueryParams(window.location.href).callback ? window.location.href: `/#/login?callback=${window.location.href}`;
            }
        }
        if (data && data.info === 'Unauthorized') {
            if (!isErrorNotificationShow) {
                notification.error({
                    description: '暂无权限',
                    message: data.info
                });
                isErrorNotificationShow = true;
                return;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return response;
});

export default umiRequest;
