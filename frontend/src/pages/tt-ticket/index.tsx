import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Table, message, Tag, DatePicker, Input, Form, Button, Select, PaginationProps } from 'antd';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { TABLE_LOCALE_TEXT } from '@/utils/const';
import { formatMessage } from '@/components/locales';
import { getAlertList, getBaseData } from '@/api/tt-ticket';

import {
    IMPACT_LEVEL_MAP,
    TICKET_STATUS_MAP,
    TICKET_RESOLVE_SLA_MAP,
    TICKET_STATUS_OPTION,
    TICKET_STATUS_FILTER_OPTIONS,
    TICKET_IMPACT_FILTER_OPTIONS,
    baseDataFilter,
    filteredObj
} from './config';

import type { ColumnsType } from 'antd/es/table';
import type { IAlertResponse, IAlertRequest } from '@/models/tt-ticket.interface';

import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.module.less';

type LayoutType = Parameters<typeof Form>[0]['layout'];
type IOption = { label: string; value: string };

const { RangePicker } = DatePicker;

const currentDate = moment();
currentDate.startOf('day');

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
};

const TicketPage: React.FC = () => {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<Array<IAlertResponse>>([]);
    const [baseData, setBaseData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [formLayout] = useState<LayoutType>('inline');
    const [categoryOption, setCategoryOption] = useState<IOption[]>([]);
    const [typeOption, setTypeOption] = useState<IOption[]>([]);
    const [itemOption, setItemOption] = useState<IOption[]>([]);
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
        current: 1,
        pageSize: 20,
        total: 0
    });
    const [groupOption, setGroupOption] = useState<IOption[]>([]); // 工作组
    const [impactOption, setImpactOption] = useState<IOption[]>([]); // 影响级别
    const [tableFilter, setTableFilter] = useState<IAlertRequest>({
        create_start: moment().startOf('month').toISOString(),
        create_end: moment().endOf('month').toISOString()
    }); // 表格筛选条件
    const [platformList, setPlatformList] = useState<IOption[]>([]);
    const [searchDisabled, setSearchDisabled] = useState<boolean>(true);
    const [searchShow, setSearchShow] = useState<boolean>(false);

    const columns: ColumnsType<IAlertResponse> = [
        // id
        {
            title: '#',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            fixed: 'left',
            render: (_, __, index: number) => (
                <>
                    {(pagination.current &&
                        pagination.pageSize &&
                        pagination.pageSize * (pagination.current - 1) + index + 1) ||
                        '-'}
                </>
            )
        },
        // C3来源
        {
            title: 'C3来源',
            key: 'c3_name',
            dataIndex: 'id',
            width: 100,
            align: 'center',
            render: (_, { c3_name }) => <>{c3_name || '-'}</>
        },
        // 事件编号
        {
            title: '事件编号',
            key: 'no',
            dataIndex: 'id',
            width: 130,
            align: 'center',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            window.open(`${record.c3_domain}/tt/#/tt/show/${record.no}`);
                        }}
                    >
                        {record.no || '-'}
                    </Button>
                </>
            )
        },
        // 影响级别
        {
            title: '影响级别',
            key: 'impact',
            dataIndex: 'impact',
            width: 150,
            align: 'center',
            filters: TICKET_IMPACT_FILTER_OPTIONS,
            onFilter: (value, record) => record.impact === value,
            render: (_, { impact }) => (
                <>
                    <div style={{ color: `${IMPACT_LEVEL_MAP[impact].color}` }}>
                        {impact} - {IMPACT_LEVEL_MAP[impact].text || '-'}
                    </div>
                </>
            )
        },
        // 状态
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 100,
            align: 'center',
            filters: TICKET_STATUS_FILTER_OPTIONS,
            onFilter: (value, record) => record.status === value,
            render: (_, { status }) => (
                <>
                    <div style={{ color: `${TICKET_STATUS_MAP[status].color}` }}>
                        {TICKET_STATUS_MAP[status].text || '-'}
                    </div>
                </>
            )
        },
        // C.T.I.
        {
            title: 'C.T.I.',
            key: 'category',
            dataIndex: 'category',
            width: 200,
            align: 'center',
            render: (_, { category, type, item, c3_name }) => (
                <>
                    {baseDataFilter(category, baseData[c3_name], 'category') || '-'}.
                    {baseDataFilter(type, baseData[c3_name], 'type') || '-'}.
                    {baseDataFilter(item, baseData[c3_name], 'item') || '-'}
                </>
            )
        },
        // 标题
        {
            title: '标题',
            key: 'title',
            dataIndex: 'title',
            width: 150,
            align: 'center',
            render: (_, { title }) => <>{title || '-'}</>
        },
        // 工作组
        {
            title: '工作组',
            key: 'workgroup',
            dataIndex: 'workgroup',
            width: 150,
            align: 'center',
            render: (_, { workgroup, c3_name }) => (
                <> {baseDataFilter(workgroup, baseData[c3_name], 'group', 'group_name') || '-'} </>
            )
        },
        // 组员
        {
            title: '组员',
            key: 'group_user',
            dataIndex: 'group_user',
            width: 150,
            align: 'center',
            render: (_, { group_user, c3_name }) => (
                <> {baseDataFilter(group_user, baseData[c3_name], 'group', 'group_name') || '-'} </>
            )
        },
        // 提交人
        {
            title: '提交人',
            key: 'submit_user',
            dataIndex: 'submit_user',
            width: 100,
            align: 'center',
            render: (_, { submit_user }) => <>{submit_user || '-'}</>
        },
        // 申请人
        {
            title: '申请人',
            key: 'apply_user',
            dataIndex: 'apply_user',
            width: 100,
            align: 'center',
            render: (_, { apply_user }) => <>{apply_user || '-'}</>
        },
        // 创建时间
        {
            title: '创建时间',
            key: 'created_at',
            dataIndex: 'created_at',
            width: 150,
            align: 'center',
            render: (_, { created_at }) => <>{moment(created_at).format('YYYY-MM-DD HH:mm:ss') || '-'}</>
        },
        // 响应时间
        {
            title: '响应时间',
            key: 'response_time',
            dataIndex: 'response_time',
            width: 150,
            align: 'center',
            render: (_, { response_time }) => (
                <>
                    {response_time.indexOf('0001') === 0 ? (
                        '-'
                    ) : (
                        <div>{moment(response_time).format('YYYY-MM-DD HH:mm:ss') || '-'}</div>
                    )}
                </>
            )
        },
        // 解决时间
        {
            title: '解决时间',
            key: 'resolve_time',
            dataIndex: 'resolve_time',
            width: 150,
            align: 'center',
            render: (_, { status, resolve_time }) => (
                <>
                    {!['resolved', 'closed'].includes(status) ? (
                        '-'
                    ) : (
                        <div>{moment(resolve_time).format('YYYY-MM-DD HH:mm:ss') || '-'}</div>
                    )}
                </>
            )
        },
        // 响应SLA
        {
            title: '响应SLA',
            key: 'response_timeout',
            dataIndex: 'response_timeout',
            width: 100,
            align: 'center',
            render: (_, { response_timeout }) => (
                <>
                    <Tag color={TICKET_RESOLVE_SLA_MAP[String(response_timeout)].color}>
                        {TICKET_RESOLVE_SLA_MAP[String(response_timeout)].text}
                    </Tag>
                </>
            )
        },
        // 解决SLA
        {
            title: '解决SLA',
            key: 'resolve_timeout',
            dataIndex: 'resolve_timeout',
            width: 100,
            align: 'center',
            render: (_, { resolve_timeout }) => (
                <>
                    <Tag color={TICKET_RESOLVE_SLA_MAP[String(resolve_timeout)].color}>
                        {TICKET_RESOLVE_SLA_MAP[String(resolve_timeout)].text}
                    </Tag>
                </>
            )
        },
        // 解决期限
        {
            title: '解决期限',
            key: 'resolve_deadline',
            dataIndex: 'resolve_deadline',
            width: 150,
            align: 'center',
            render: (_, { resolve_deadline }) => <>{moment(resolve_deadline).format('YYYY-MM-DD HH:mm:ss') || '-'}</>
        }
    ];

    // 获取TT工单数据
    const getData = async (params: IAlertRequest) => {
        setLoading(true);
        const dataRet = await getAlertList(params).catch((error) => {
            setLoading(false);
            message.error('获取数据失败!');
            console.error(error);
        });
        if (dataRet) {
            setLoading(false);
            const { code, data } = dataRet;
            if (code === 200) {
                setPagination({
                    ...pagination,
                    total: data?.length || 0
                });
                setTableData(data || []);
            } else {
                message.error('获取数据失败!');
            }
        }
    };

    // 条件搜索
    const onSearch = (values: any) => {
        const params: IAlertRequest = {
            ...values,
            create_start: values['range-picker'] ? values['range-picker'][0].toISOString() : undefined,
            create_end: values['range-picker'] ? values['range-picker'][1].toISOString() : undefined,
            ...tableFilter
        };
        delete params['range-picker'];
        const newParams = filteredObj(params);
        setTableFilter(newParams);
        getData(newParams);
    };

    // 重置按钮
    const onReset = () => {
        form.resetFields();
        setSearchDisabled(true);
        setTableData([]);
        getData({});
    };

    // table表格条件变化
    const handlePaginationChange = (pagination, filter) => {
        const filterData = JSON.parse(JSON.stringify(tableData));
        let newData = [];
        for (const key in filter) {
            newData = filterData.filter((item) => {
                return filter[key] && filter[key].length > 0 ? filter[key].includes(item[key]) : true;
            });
        }
        setPagination({
            ...pagination,
            total: newData?.length || 0
        });
    };

    // 展开/收起
    const handleShow = () => {
        setSearchShow(!searchShow);
    };

    // 切换C3来源
    const handleSourceChange = (value) => {
        if (value) {
            setSearchDisabled(false);
            setCategoryOption(
                baseData[value].category.map((item) => {
                    return { value: item.id, label: item.name };
                })
            );
            setTypeOption(
                baseData[value].type.map((item) => {
                    return { value: item.id, label: item.name };
                })
            );
            setItemOption(
                baseData[value].item.map((item) => {
                    return { value: item.id, label: item.name };
                })
            );
            setGroupOption(
                baseData[value].group.map((item) => {
                    return { value: item.id, label: item.group_name };
                })
            );
            setImpactOption(
                baseData[value].impact.map((item) => {
                    return { value: item.id, label: item.name };
                })
            );
        } else {
            form.resetFields();
            setSearchDisabled(true);
        }
    };

    // 获取所有下拉条件的数据
    useEffect(() => {
        const getBaseList = async () => {
            const dataRet = await getBaseData().catch((error) => {
                message.error('获取数据失败');
                console.error(error);
            });
            if (dataRet) {
                const { data, code, msg } = dataRet;
                if (code === 200) {
                    setBaseData(data);
                    const sourceData: IOption[] = [];
                    for (const key in data) {
                        sourceData.push({
                            value: key,
                            label: key
                        });
                    }
                    setPlatformList(sourceData);
                } else {
                    message.error(`获取数据失败！${msg || ''}`);
                }
            }
        };
        getBaseList();
    }, []);

    useEffect(() => {
        getData(tableFilter);
    }, []);

    return (
        <>
            <PageHeader className={styles['site-page-header']} title={formatMessage({ id: 'tt_ticket_list' })} />
            {/* 搜索条件 */}
            <Card className={styles['content-search-card']} bordered={false}>
                <Form
                    name="basic"
                    {...formItemLayout}
                    form={form}
                    initialValues={{ 'range-picker': [moment().startOf('month'), moment().endOf('month')] }}
                    onFinish={onSearch}
                    autoComplete="off"
                    layout={formLayout}
                >
                    {/* create_start; create_end 时间 */}
                    <Form.Item name="range-picker" label="">
                        <RangePicker
                            allowEmpty={[true, false]}
                            ranges={{
                                本周: [moment().startOf('week'), moment().endOf('week')],
                                本月: [moment().startOf('month'), moment().endOf('month')],
                                本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
                                本年: [moment().startOf('year'), moment().endOf('year')]
                            }}
                            locale={locale}
                            style={{ width: 536, marginBottom: 20 }}
                        />
                    </Form.Item>

                    {searchShow ? (
                        <>
                            {/* c3domain C3来源 */}
                            <Form.Item label="" name="c3_name">
                                <Select
                                    allowClear
                                    placeholder="C3来源"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={platformList}
                                    onChange={handleSourceChange}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* keyword keyword */}
                            <Form.Item label="" name="keyword">
                                <Input
                                    allowClear
                                    placeholder="Keyword"
                                    style={{ width: 260, marginBottom: 20 }}
                                    disabled={searchDisabled}
                                />
                            </Form.Item>

                            {/* Group User group_user */}
                            <Form.Item label="" name="group_user">
                                <Input
                                    allowClear
                                    placeholder="Group User"
                                    style={{ width: 260, marginBottom: 20 }}
                                    disabled={searchDisabled}
                                />
                            </Form.Item>

                            {/* category 总类 */}
                            <Form.Item label="" name="category">
                                <Select
                                    allowClear
                                    placeholder="总类"
                                    showSearch
                                    disabled={searchDisabled}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={categoryOption}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* type 子类 */}
                            <Form.Item label="" name="type">
                                <Select
                                    allowClear
                                    placeholder="子类"
                                    disabled={searchDisabled}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={typeOption}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* item 名目 */}
                            <Form.Item label="" name="item">
                                <Select
                                    allowClear
                                    placeholder="名目"
                                    showSearch
                                    disabled={searchDisabled}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={itemOption}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* workgroup 工作组 */}
                            <Form.Item label="" name="workgroup">
                                <Select
                                    allowClear
                                    placeholder="工作组"
                                    showSearch
                                    disabled={searchDisabled}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={groupOption}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* impact 影响级别 */}
                            <Form.Item label="" name="impact">
                                <Select
                                    allowClear
                                    placeholder="影响级别"
                                    showSearch
                                    disabled={searchDisabled}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={impactOption}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* status  状态*/}
                            <Form.Item label="" name="status">
                                <Select
                                    allowClear
                                    placeholder="状态"
                                    showSearch
                                    disabled={searchDisabled}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={TICKET_STATUS_OPTION}
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>

                            {/* processing_time 处理时长（单位：h） */}
                            <Form.Item label="" name="processing_time">
                                <Input
                                    allowClear
                                    disabled={searchDisabled}
                                    placeholder="处理时长（单位：h）=解决时间-创建时间"
                                    style={{ width: 260, marginBottom: 20 }}
                                />
                            </Form.Item>
                        </>
                    ) : (
                        ''
                    )}

                    <Form.Item
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 12 }}>
                                搜索
                            </Button>
                            <Button type="default" onClick={onReset}>
                                重置
                            </Button>
                            <Button type="link" onClick={handleShow}>
                                {searchShow ? '收起' : '展开'}
                                {searchShow ? <UpOutlined /> : <DownOutlined />}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>

            {/* 工单列表 */}
            <Card className={styles['content-table-card']} bordered={false}>
                <Table
                    rowKey={(record) => {
                        return `${record.c3_name}-${record.no}`;
                    }}
                    size="small"
                    rowClassName={(record) => (record.status === 'assigned' ? styles['table-row-assigned'] : '')}
                    loading={loading}
                    columns={columns}
                    pagination={pagination}
                    onChange={handlePaginationChange}
                    dataSource={tableData}
                    locale={TABLE_LOCALE_TEXT}
                    scroll={{ x: 1500 }}
                ></Table>
            </Card>
        </>
    );
};

export default TicketPage;
