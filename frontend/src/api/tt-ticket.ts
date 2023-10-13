import { whyRequest } from '@/utils/request';
import { IAlertRequest } from '@/models/tt-ticket.interface';
export interface IResponse {
    data: Array<object> | any;
    stat?: boolean;
    info?: string;
    code?: number;
    msg?: string;
}

/**
 * 获取所有基础分类信息   get
 * /api/tt/public/base/all
 */

export const getBaseData = (): Promise<IResponse> => {
    return whyRequest.get('/tt/public/base/all');
};

/**
 * 工单列表接口   post
 * /api/tt/public/search/list/
 * @data  IAlertRequest
 */
export const getAlertList = (data: IAlertRequest): Promise<IResponse> => {
    return whyRequest.post('/tt/public/search/list', { data });
};
