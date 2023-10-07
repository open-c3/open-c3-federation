export interface IAlertRequest {
    create_start?: string;
    create_end?: string;
    group_user?: string | number;
    keyword?: string;
    category?: string | number;
    type?: string;
    item?: string | number;
    workgroup?: string | number;
    impact?: string | number;
    status?: string;
    processing_time?: string | number;
    c3_domain?: string;
    c3_name?: string;
}

export interface IAlertResponse {
    id: boolean;
    c3_domain: string; // C3来源链接
    c3_name: string; // C3来源名称
    no: string; // 工单编号
    submit_user: string; // 提交人
    apply_user: string; // 申请人
    status: string; // 工单状态
    impact: number; // 影响级别
    category: number; // 工单分类
    type: number; // 工单类型
    item: number; // 工单事项
    workgroup: number; // 工单工作组
    group_user: number; // 工单组用户
    title: string; // 工单标题
    content: string; // 工单内容
    email_list: string; // 邮件列表
    root_cause: string; // 根本原因
    solution: string; // 解决方案
    response_time: string; // 响应时间,
    response_cost: number; // 响应耗时,
    response_timeout_sent: number; // 响应超时通知,
    resolve_time: string; // 解决时间,
    resolve_cost: number; // 解决耗时,
    resolve_timeout_sent: number; // 解决超时通知,
    closed_time: string; // 关闭时间,
    one_time_resolve_rate: number; // 一次性解决率,
    created_at: string; // 创建时间,
    response_deadline: string; // 响应截止时间,
    resolve_deadline: string; // 解决截止时间,
    response_timeout: boolean; // 响应超时,
    resolve_timeout: boolean; // 解决超时,
}

export interface IBaseDataUser {
    disabled: number;
    email: string;
    group_id: number;
    id: number;
    priority: number;
}
export interface IBaseData {
    id: number;
}
export interface IBaseDataCategory extends IBaseData {
    name: string;
}

export interface IBaseDataType extends IBaseDataCategory {
    category_id: number;
}

export interface IBaseDataItems extends IBaseDataCategory {
    type_id: number;
    tpl_title: string;
    tpl_content: string;
}

export interface IBaseDataGroups extends IBaseDataCategory {
    admin_email: string;
    disabled: number;
    group_email: string;
    group_name: string;
    level1_report: string;
    level2_report: string;
    level3_report: string;
    level4_report: string;
    level5_report: string;
    timezone: string;
    work_day: string;
    work_hour_end: number;
    work_hour_start: number;
    users: IBaseDataUser[];
    label?: string;
}

export interface IBaseDataMidGroupUser extends IBaseData {
    group_id: number;
    priority: number;
}
export interface IBaseDataGroupUser extends IBaseData {
    disabled: number;
    email: string;
}

export interface IBaseDataItemGroupMap extends IBaseDataMidGroupUser {
    item_id: number;
}

export interface IBaseDataImpact extends IBaseDataCategory {
    level: number;
    resolve_sla: number;
    response_sla: number;
}
