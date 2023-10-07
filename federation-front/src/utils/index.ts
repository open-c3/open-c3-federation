/**
 * cookie变更为对象
 * @returns {[key]: string}
 */
export const parseCookies: () => { [key: string]: string } = () => {
    const cookies: { [key: string]: string } = {};
    if (document.cookie && document.cookie !== '') {
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            const cookieParts = cookie.split('=');
            const name = decodeURIComponent(cookieParts[0]);
            const value = decodeURIComponent(cookieParts.slice(1).join('='));
            cookies[name] = value;
        }
    }
    return cookies;
};

/**
 * 解析url参数
 * @returns {[key:string]:string}
 */

export const parseQueryParams: (urlString: string) => { [key: string]: string } = (urlString) => {
    const params = {};
    const queryStartIndex = urlString.indexOf('?');
    if (queryStartIndex > -1) {
        const queryString = urlString.slice(queryStartIndex + 1);
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    }
    return params;
};

/**
 * 清除所有cookie
 */

export const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
};
