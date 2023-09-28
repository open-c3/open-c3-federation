export interface IFilterOption {
    text: string | number;
    value: string | number;
}

export interface ILabels {
    fromtreeid?: string;
    treeid_7?: string;
    treeid?: string | number;
    serialcall?: string | number;
    job?: string;
    instance?: string | number;
    severity?: string;
    monitor?: string;
    alertname?: string;
    instanceid?: string;
    cache_cluster_id?: string;
    dbinstance_identifier?: string;
}
/**
 * {
    "alias":"savingnow-test1",
    "annotations":{
        "description":"Node节点 10.1.80.142 CPU空闲小于15%当前Node节点CPU空闲率: 1%",
        "summary":"CPU报警",
        "value":"1%"
    },
    "c3_domain":"http://open-c3.cmcloud.org",
    "c3_name":"open-c3",
    "endsAt":"2023-09-22T12:02:11.877Z",
    "fingerprint":"d12f5c3e05b8c2ca",
    "generatorURL":"http://open-c3.cmcloud.org/third-party/monitor/prometheus/graph?g0.expr=ceil%28%28%28sum+by+%28instance%29+%28increase%28node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B5m%5D%29%29%29+%2F+%28sum+by+%28instance%29+%28increase%28node_cpu_seconds_total%5B5m%5D%29%29%29%29+%2A+100%29+%3C+15+and+%28sum+by+%28instance%29+%28treeinfo%7Beid%3D%223641%22%7D%29%29&amp;g0.tab=1",
    "labels":{
        "alertname":"基础监控 Node节点 cpu.idle &lt; 15%",
        "fromtreeid":"3641",
        "instance":"10.1.80.142",
        "monitor":"openc3-monitor",
        "severity":"level4"
    },
    "opsowner":"gaosheng@cmcm.com",
    "owner":"liqiuqing@cmcm.com",
    "receivers":[
        {
            "name":"web.hook"
        }
    ],
    "startsAt":"2023-09-22 19:20:11",
    "status":{
        "inhibitedBy":[

        ],
        "silencedBy":[

        ],
        "state":"active"
    },
    "updatedAt":"2023-09-22T19:22:12.817+08:00",
    "uuid":"d12f5c3e05b8c2ca.2023-09-22T19:20:11"
}
 */
interface IAnnotation {
    description: string;
    summary: string;
    value: string;
}

interface IAlertLabels {
    alertname: string;
    fromtreeid: string;
    instance: string;
    monitor: string;
    severity: string;
}

interface IAlertStatus {
    inhibitedBy: Array<any>;
    silencedBy: Array<any>;
    state: string;
}
export interface IAlertResponse {
    alias: string;
    annotations: IAnnotation;
    c3_domain: string;
    c3_name: string;
    endsAt: string;
    fingerprint: string;
    generatorURL: string;
    labels: IAlertLabels;
    opsowner: string;
    owner: string;
    receivers: Array<{ name: string }>;
    startsAt: string;
    status: IAlertStatus;
    updatedAt: string;
    uuid: string;
}
