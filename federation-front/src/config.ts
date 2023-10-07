/**
 * 当前环境变量
 */
// process.env 在vite中不能用
// export const whyEnv = import.meta.env.VITE_REACT_URL || "";
/**
 * 接口地址
 * @description env 可为主要环境或自定义地址
 */
// var proxyDomain = 'http://open-c3.org'

// const proxyDomain = 'http://10.60.77.73';
const proxyDomain = 'http://10.60.77.101:57289';

export const apiAddress = proxyDomain + '/api/v1/';

/**
 * 开发代理前缀
 */
export const proxyApi = '/api';

/**
 * 接口前缀
 * 判断环境，是否需要使用前缀
 * 生产环境不需要代理，同时本地配置的代理在生产环境也是不能用的
 */
export const urlPrefix = process.env.NODE_ENV === 'development' ? proxyApi : proxyApi;
