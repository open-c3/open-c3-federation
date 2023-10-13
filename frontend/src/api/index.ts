import { whyRequest } from '@/utils/request';
import { IResponse } from '@/models/index';

/**
 * 用户信息接口
 * @property {string} method GET
 * @property {string} url    /api/connector/connectorx/sso/userinfo
 * @param
 * @returns
 */
export const getUseInfo = (): Promise<IResponse | any> => {
    return whyRequest.get('/connector/connectorx/sso/userinfo');
};

/**
 * 部门信息接口
 * @property {string} method GET
 * @property {string} url    /api/connector/connectorx/sso/userinfo/department
 */

export const getDepartmaent = (): Promise<IResponse | any> => {
    return whyRequest.get('/connector/connectorx/sso/userinfo/department');
};
