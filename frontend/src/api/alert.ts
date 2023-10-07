import { whyRequest } from '@/utils/request';
import { IResponse } from '@/models/index';

/**
 * 告警列表接口
 * @property {string} method GET
 * @property {string} url /api/agent/monitor/alert/0?siteaddr={siteaddr}
 * @param params
 */
export const getAlertList = (siteaddr: string): Promise<IResponse | any> => {
    return whyRequest.get(`/agent/monitor/alert/0?siteaddr=${siteaddr}`);
};

/**
 * 获取绑定的接口
 * @property {string} method GET
 * @property {string} url    /api/agent/monitor/alert/tottbind/{0}
 */
export const getToTTBindList = (): Promise<IResponse | any> => {
    return whyRequest.get('/agent/monitor/alert/tottbind/0');
};

/**
 * 获取认领人列表接口
 * @property {string} method GET
 * @property {string} url    /api/agent/monitor/ack/deal/info
 */

export const getDealInfoList = (): Promise<IResponse | any> => {
    return whyRequest.get('/agent/monitor/ack/deal/info');
};

/**
 * @title 监控告警转工单
 * @property {string} method POST
 * @property {string} url    /api/agent/monitor/alert/tott/0
 * @params
 */

export const handleToOrder = (query: string, data: any): Promise<IResponse | any> => {
    return whyRequest.post(`/agent/monitor/alert/tott/0?c3_name=${query}`, { data });
};

/**
 * @title 告警认领/批量认领
 * @property {string} method POST
 * @property {string} url    /api/agent//monitor/ack/deal/info
 * @data {uuid: string}
 */

export const handleAlarmAlert = (data: any): Promise<IResponse | any> => {
    return whyRequest.post('/agent//monitor/ack/deal/info', { data });
};
