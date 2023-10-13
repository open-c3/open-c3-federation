import { whyRequest } from '@/utils/request';
// import { IResponse } from '@/models/index';

/**
 * 登录验证接口
 * @property {string} method POST
 * @property {string} url    /api/federation/endpoints
 */

export const getEndpoints = (): Promise<any> => {
    return whyRequest.get('/federation/endpoints');
};

/**
 * 退出登录接口
 * @property {string} method GET
 * @property {string} url    /api/connector/connectorx/approve/ssologout
 */

export const getLogout = (): Promise<any> => {
    return whyRequest.get('/connector/connectorx/approve/ssologout');
};
