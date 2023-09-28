import { IFilterOption } from '@/models/alert.interface';

export interface IOptionMap {
    text: string;
    color: string;
}

export const IMPACT_LEVEL_MAP: { [key: string | number]: IOptionMap } = {
    1: {
        text: '关键业务系统失效',
        color: '#f5222d'
    },
    2: {
        text: '关键业务系统受影响',
        color: '#fa541c'
    },
    3: {
        text: '部门生产效率受影响',
        color: '#fa8c16'
    },
    4: {
        text: '个人生产效率受影响',
        color: '#faad14'
    },
    5: {
        text: '生产效率暂未影响',
        color: '#1890ff'
    }
};

export const TICKET_STATUS_MAP: { [key: string]: IOptionMap } = {
    assigned: {
        text: '已指派',
        color: '#2f54eb'
    },
    closed: {
        text: '已关闭',
        color: '#000'
    },
    pending: {
        text: '等待',
        color: '#faad14'
    },
    resolved: {
        text: '已解决',
        color: '#73d13d'
    },
    wip: {
        text: '正在处理',
        color: '#91d5ff'
    }
};

export const TICKET_RESOLVE_SLA_MAP: { [key: string]: IOptionMap } = {
    false: {
        text: '未超时',
        color: '#108ee9'
    },
    true: {
        text: '已超时',
        color: '#f50'
    }
};

export const TICKET_STATUS_OPTION: { label: string; value: string }[] = [
    {
        value: 'assigned',
        label: '已指派'
    },
    {
        value: 'wip',
        label: '正在处理'
    },
    {
        value: 'pending',
        label: '等待'
    },
    {
        value: 'resolved',
        label: '已解决'
    },
    {
        value: 'closed',
        label: '已关闭'
    }
];

export const TICKET_STATUS_FILTER_OPTIONS: IFilterOption[] = [
    { text: '已指派', value: 'assigned' },
    { text: '正在处理', value: 'wip' },
    { text: '等待', value: 'pending' },
    { text: '已解决', value: 'resolved' },
    { text: '已关闭', value: 'closed' }
];

export const TICKET_IMPACT_FILTER_OPTIONS: IFilterOption[] = [
    {
        value: 1,
        text: '1-关键业务系统失效'
    },
    {
        value: 2,
        text: '2-关键业务系统受影响'
    },
    {
        value: 3,
        text: '3-部门生产效率受影响'
    },
    {
        value: 4,
        text: '4-个人生产效率受影响'
    },
    {
        value: 5,
        text: '5-生产效率暂未影响'
    }
];

export const baseDataFilter = (value: string | number, baseData: any, type: string, column?: any): string => {
    let result = '';
    let find = false;
    for (const key in baseData) {
        if (key === type) {
            for (const item of baseData[key]) {
                if (item.id === value) {
                    if (column) {
                        result = item[column];
                    } else {
                        result = item.name;
                    }
                    return result;
                }
            }
            find = true;
            return result;
        }
        if (find) {
            return result;
        }
    }
    return result || '-';
};

// 去掉对象中的undefined
export const filteredObj = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});
};
