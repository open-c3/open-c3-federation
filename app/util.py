from urllib.parse import urljoin


def get_url(domain, api_path):
    """
    将域名和api路径拼成完整的请求地址
    Args:
        domain: 域名
        api_path: api路径

    Returns:
        完整api地址
    """
    return str(urljoin(domain, api_path))
