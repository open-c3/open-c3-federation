import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Table, message, Tag, Tooltip, Modal, PaginationProps } from 'antd';
import moment from 'moment';
import { formatMessage } from '@/components/locales';
import { TABLE_LOCALE_TEXT } from '@/utils/const';
import { codeMessage } from '@/utils/request';
import { getAlertList, getToTTBindList, getDealInfoList, handleToOrder, handleAlarmAlert } from '@/api/alert';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.module.less';

import { ALERT_LEVEL_OPTION, ALERT_STATUS_OPTION, ALERT_ALARM_TYPE_OPTION } from './config';

import type { ColumnsType } from 'antd/es/table';
import type { ILabels, IAlertResponse } from '@/models/alert.interface';

type IOperateType = 'view' | 'order' | 'alarm';

const alertColorMap = {
    '': '',
    level1: styles['first-almost'],
    level2: styles['second-almost'],
    level3: styles['third-almost'],
    level4: styles['forth-almost']
};

const AlertPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRow] = useState<any[]>([]); // 选中的行数据
    const [alertData, setAlertData] = useState<any[]>([]);
    const [bindData, setBindData] = useState<any>({});
    const [dealData, setDealData] = useState<any>({});
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
        current: 1,
        pageSize: 20,
        total: 0
    });

    // 获取告警基础列表
    const getAlertData = async () => {
        const siteaddr = `${window.location.protocol}//${window.location.host}`;
        const dataRet = await getAlertList(siteaddr).catch((error) => {
            console.error(error);
        });
        if (dataRet) {
            const { data } = dataRet;
            setPagination({...pagination});
            setAlertData(data || []);
            setSelectedRowKeys([]);
        }
    };

    // 获取绑定tt工单的列表
    const getBindTTData = async () => {
        const dataRet = await getToTTBindList().catch((error) => {
            console.error(error);
        });
        if (dataRet) {
            const { data } = dataRet;
            setBindData(data || {});
        }
    };

    // 获取认领人列表
    const getDealInfoData = async () => {
        const dataRet = await getDealInfoList().catch((error) => {
            console.error(error);
        });
        if (dataRet) {
            const { data } = dataRet;
            setDealData(data || {});
        }
    };

    const getData = async () => {
        try {
            setLoading(true);
            message.loading('加载中...');
            await getDealInfoData();
            await getBindTTData();
            await getAlertData();
            setLoading(false);
        } catch (error) {
            message.error('加载失败!');
            setLoading(false);
            console.error(error);
        }
    };

    // 时间排序
    const compareTime = (first: string, last: string) => {
        const timeFirst = moment(first, 'YYYY-MM-DD HH:mm:ss');
        const timeLast = moment(last, 'YYYY-MM-DD HH:mm:ss');
        if (timeFirst.isBefore(timeLast)) {
            return -1;
        } else if (timeFirst.isAfter(timeLast)) {
            return 1;
        }
        return 0;
    };

    // 监控对象渲染
    const getInstanceName = (labels: ILabels) => {
        let name = labels['instance'];
        if (labels['instanceid']) {
            name = labels['instanceid'];
        }
        if (labels['cache_cluster_id']) {
            name = labels['cache_cluster_id'];
        }
        if (labels['dbinstance_identifier']) {
            name = labels['dbinstance_identifier'];
        }
        return name;
    };

    const operateParams = {
        view: (record: Array<IAlertResponse>) => {
            window.open(record[0]?.generatorURL, '_blank');
        },
        order: (record: Array<IAlertResponse>) => {
            const handleOk = async () => {
                const dataRet = await handleToOrder(record[0]['c3_name'], record[0]).catch((error) => {
                    message.error('加载失败!');
                    console.error(error);
                });
                if (dataRet) {
                    const { stat, status, statusText, code } = dataRet;
                    if ((stat && stat !== 'ok') || (status && status !== 200) || (code && code !== 200)) {
                        message.error(`${codeMessage[status]}:${statusText}}` || '加载失败');
                        return;
                    }
                    message.success('操作成功!');
                }
                return false;
            };
            const handleCancel = () => {
                Modal.destroyAll();
            };

            Modal.confirm({
                title: '提交工单',
                icon: <ExclamationCircleOutlined />,
                content: '确认要将监控告警转成工单吗？',
                onOk: handleOk,
                onCancel: handleCancel,
                okText: '确认',
                cancelText: '取消'
            });
        },
        alarm: (record: Array<IAlertResponse | any>) => {
            const handleOk = async () => {
                const data = record.reduce((result, item) => {
                    const { c3_name, uuid } = item;
                    if (!result[c3_name]) {
                        result[c3_name] = uuid;
                    } else {
                        result[c3_name] += `,${uuid}`;
                    }
                    return result;
                }, {});
                const dataRet = await handleAlarmAlert({ data }).catch((error) => {
                    message.error('加载失败!');
                    console.error(error);
                });
                if (dataRet) {
                    const { stat, status, statusText, code } = dataRet;
                    if ((stat && stat !== 'ok') || (status && status !== 200) || (code && code !== 200)) {
                        message.error(`${codeMessage[status]}:${statusText}}` || '加载失败');
                        return;
                    }
                    message.success('操作成功!');
                }
            };
            const handleCancel = () => {
                Modal.destroyAll();
            };
            Modal.confirm({
                title: '告警认领',
                icon: <ExclamationCircleOutlined />,
                content: '确认要认领告警吗？',
                onOk: handleOk,
                onCancel: handleCancel,
                okText: '确认',
                cancelText: '取消'
            });
        }
    };

    // 告警操作
    const handleOperate = (type: IOperateType, record: Array<IAlertResponse>) => {
        return operateParams[type](record);
    };

    // 定时刷新
    const handleStartRefresh = () => {
        return Modal.confirm({
            title: '开启定时刷新',
            icon: <ExclamationCircleOutlined />,
            content: '确认要开启定时刷新吗？',
            onOk: () => {
                if (timerId) {
                    return false;
                }
                const timer = setInterval(() => {
                    getData();
                }, 15000);
                setTimerId(timer);
            },
            onCancel: () => {
                Modal.destroyAll();
            },
            okText: '确认',
            cancelText: '取消'
        });
    };

    // 关闭定时器
    const closeTimer = (): void => {
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
        }
    };

    // 关闭定时刷新
    const handleCloseRefresh = () => {
        return Modal.confirm({
            title: '关闭定时刷新',
            icon: <ExclamationCircleOutlined />,
            content: '确认要关闭定时刷新吗？',
            onOk: () => {
                closeTimer();
            },
            onCancel: () => {
                Modal.destroyAll();
            },
            okText: '确认',
            cancelText: '取消'
        });
    };

    // 刷新
    const refresh = () => {
        getData();
        setSelectedRowKeys([]);
    };

    useEffect(() => {
        return () => {
            closeTimer(); // 组件卸载时停止定时器
        };
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const columns: ColumnsType<any> = [
        /**
         * 暂时隐藏 后续添加操作列侯再添加
         */
        // {
        //     title: 'uuid',
        //     key: 'uuid',
        //     dataIndex: 'uuid',
        //     width: 200,
        //     align: 'center',
        //     fixed: 'left',
        //     render: (record: string) => <>{record || '-'}</>
        // },
        {
            title: '开始时间',
            key: 'startsAt',
            dataIndex: 'startsAt',
            width: 130,
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => compareTime(a.startsAt, b.startsAt),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'C3来源',
            key: 'c3_name',
            dataIndex: 'c3_name',
            width: 100,
            align: 'center',
            render: (text: string) => <>{text || '-'}</>
        },
        {
            title: '认领人',
            dataIndex: 'claimUuid',
            key: 'claimUuid',
            width: 100,
            align: 'center',
            filters: ALERT_ALARM_TYPE_OPTION,
            onFilter: (value: string | number | boolean, record) =>
                value === '' ? true : value === 'unclaimed' ? !dealData[record['uuid']] : !!dealData[record['uuid']],
            render: (_, record: any) => <>{dealData[record['uuid']] || '-'}</>
        },
        {
            title: '名称',
            key: 'labels',
            width: 100,
            align: 'center',
            dataIndex: ['labels', 'alertname']
        },
        {
            title: '监控对象',
            key: 'instance',
            width: 100,
            align: 'center',
            dataIndex: ['labels', 'instance'],
            render: (_, record: any) => (
                <>
                    <div>{getInstanceName(record.labels) || '-'}</div>
                </>
            )
        },
        // getInstanceName
        { title: 'Owner', key: 'owner', dataIndex: 'owner', width: 100, align: 'center' },
        { title: 'OpsOwner', key: 'opsowner', dataIndex: 'opsowner', width: 110, align: 'center' },
        { title: '资源别名', key: 'alias', dataIndex: 'alias', width: 110, align: 'center' },
        {
            title: '状态',
            dataIndex: ['status', 'state'],
            width: 100,
            align: 'center',
            filters: ALERT_STATUS_OPTION,
            defaultFilteredValue: ['active'],
            onFilter: (value: string | number | boolean, record) => record.status.state.indexOf(value) === 0,
            render: (text: string) => <>{text || '-'}</>
        },
        {
            title: '告警级别',
            key: 'severity',
            dataIndex: ['labels', 'severity'],
            width: 130,
            align: 'center',
            filters: ALERT_LEVEL_OPTION,
            onFilter: (value: string | number | boolean, record) => record.labels.severity.indexOf(value) === 0
        },
        { title: '概要', key: 'summary', dataIndex: ['annotations', 'summary'], width: 100, align: 'center' },
        { title: '值', key: 'value', dataIndex: ['annotations', 'value'], width: 100, align: 'center' },
        {
            title: '关联工单',
            key: 'tottbind',
            dataIndex: 'tottbind',
            width: 130,
            align: 'center',
            render: (_, record: any) => (
                <>
                    {bindData[record['uuid']] &&
                        bindData[record['uuid']].map((item: string) => {
                            return (
                                <>
                                    <Tag color="blue" key={item} style={{ margin: '2px 0' }}>
                                        {item}
                                    </Tag>
                                </>
                            );
                        })}
                </>
            )
        },
        {
            title: '操作',
            key: 'operate',
            fixed: 'right',
            align: 'center',
            width: 180,
            render: (_, record: any) => (
                <>
                    <Button
                        type="link"
                        className={styles['table-operate-button']}
                        onClick={() => handleOperate('view', [record])}
                    >
                        查看图表
                    </Button>
                    <Button
                        type="link"
                        className={styles['table-operate-button']}
                        onClick={() => handleOperate('order', [record])}
                    >
                        转工单
                    </Button>
                    <Button
                        type="link"
                        className={styles['table-operate-button']}
                        onClick={() => handleOperate('alarm', [record])}
                    >
                        认领
                    </Button>
                </>
            )
        }
    ];

    const onSelectChange = (newSelectedRowKeys: any[], selectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRow(selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
    };

    const handleChange = (pagination) => {
        setPagination({...pagination});
    };

    return (
        <>
            <PageHeader className={styles['site-page-header']} title={formatMessage({ id: 'currentAlarm' })} />
            <Card className={styles['content-table-card']} bordered={false}>
                <div className={styles['content-table-header-operate']}>
                    <div
                        className={styles['content-table-header-operate-left']}
                        style={{ fontWeight: 'normal', fontSize: '14px' }}
                    >
                        <Button
                            type="primary"
                            onClick={() => handleOperate('alarm', selectedRows)}
                            disabled={!(selectedRowKeys.length > 0)}
                        >
                            批量认领
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {selectedRowKeys.length > 0 ? `已选择${selectedRowKeys.length}条` : ''}
                        </span>
                    </div>
                    <div className={styles['content-table-header-operate-right']}>
                        <Tooltip title="开启定时刷新">
                            <Button
                                type="link"
                                className={styles['content-table-header-operate-right-icon']}
                                disabled={!!timerId || loading}
                                onClick={() => handleStartRefresh()}
                                icon={<PlayCircleOutlined />}
                            />
                        </Tooltip>
                        <Tooltip title="暂停">
                            <Button
                                type="link"
                                className={styles['content-table-header-operate-right-icon']}
                                disabled={!timerId || loading}
                                onClick={() => handleCloseRefresh()}
                                icon={<PauseCircleOutlined />}
                            />
                        </Tooltip>
                        <Tooltip title="刷新列表">
                            <Button
                                type="link"
                                className={styles['content-table-header-operate-right-icon']}
                                disabled={loading}
                                onClick={() => refresh()}
                                icon={<ReloadOutlined />}
                            />
                        </Tooltip>
                    </div>
                </div>
                <Table
                    rowKey="uuid"
                    size="small"
                    rowClassName={(record) =>
                        alertColorMap[record.labels.severity] ? alertColorMap[record.labels.severity] : ''
                    }
                    loading={loading}
                    pagination={pagination}
                    onChange={handleChange}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={alertData}
                    locale={TABLE_LOCALE_TEXT}
                    scroll={{ x: 1500 }}
                />
            </Card>
        </>
    );
};

export default AlertPage;
