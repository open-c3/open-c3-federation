export interface IResponse {
    data: Array<object> | any;
    stat?: boolean;
    info?: string;
    code?: number;
    msg?: string;
}

export interface ILoginPlatform {
    name: string;
    domain: string;
    callback?: string;
}

export interface IUserInfo {
    admin?: string;
    company?: string;
    email?: string;
    name?: string;
    showconnector?: string;
}
