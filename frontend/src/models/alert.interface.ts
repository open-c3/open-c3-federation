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
