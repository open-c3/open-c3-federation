import os
import shutil
import time
from functools import wraps

# APPROVE_ID_PATH = "/app/data/approve_id.txt"
# # 锁文件。用于防止多个进程同时读取文件内容并进行处理，后续会丢数据的问题
# # 如果该文件存在则表示有进程正在读取文件内容，其他进程需要等待
# APPROVE_ID_LOCK_PATH = "/app/data/approve_id.txt.lock"

APPROVE_ID_PATH = "/tmp/approve_id.txt"
# 锁文件。用于防止多个进程同时读取文件内容并进行处理，后续会丢数据的问题
# 如果该文件存在则表示有进程正在读取文件内容，其他进程需要等待
APPROVE_ID_LOCK_PATH = "/tmp/approve_id.txt.lock"


def read_file_lines():
    data_list = []

    if os.path.exists(APPROVE_ID_PATH):
        with open(APPROVE_ID_PATH, "r") as file:
            data_list.extend(line.strip() for line in file)
    return data_list


def wait_until_file_unlocked(timeout=900):
    """等待 APPROVE_ID_PATH 文件解锁"""
    start = time.time()
    while True:
        if os.path.exists(APPROVE_ID_LOCK_PATH):
            time.sleep(3)
        else:
            break

        if time.time() - start >= timeout:
            raise RuntimeError(f"等待文件锁超时, 超时时间: {timeout} 秒")


def lock_file():
    """锁定 APPROVE_ID_PATH 文件
    执行之前请确保锁文件不存在，否则出错
    """
    try:
        open(APPROVE_ID_LOCK_PATH, "x")
        # print(f'锁文件已创建: {CRON_TASK_LOCK_PATH}')
    except FileExistsError as e:
        raise RuntimeError(f"锁文件已存在: {APPROVE_ID_LOCK_PATH}") from e


def unlock_file():
    """解锁 APPROVE_ID_PATH 文件"""
    if os.path.exists(APPROVE_ID_LOCK_PATH):
        os.remove(APPROVE_ID_LOCK_PATH)
        # print(f'锁文件已删除: {CRON_TASK_LOCK_PATH}')


def batch_update_lines(line_info_list):
    """将line_info_list写入到文件"""
    backup_file_path = ""

    # 创建备份文件
    if os.path.exists(APPROVE_ID_PATH):
        backup_file_path = f"{APPROVE_ID_PATH}.bak"
        shutil.copyfile(APPROVE_ID_PATH, backup_file_path)

    try:
        # 确保目录存在
        os.makedirs(os.path.dirname(APPROVE_ID_PATH), exist_ok=True)

        # 清空原文件内容
        with open(APPROVE_ID_PATH, "w") as file:
            pass

        with open(APPROVE_ID_PATH, "a") as file:
            for item in line_info_list:
                file.write(str(item) + "\n")

        # 写入成功，删除备份文件
        if backup_file_path != "":
            os.remove(backup_file_path)
    except Exception as e:
        # 写入出错，恢复备份文件
        if backup_file_path != "":
            shutil.move(backup_file_path, APPROVE_ID_PATH)
        raise RuntimeError("写入文件时发生错误") from e


def lock_and_unlock(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wait_until_file_unlocked()
        lock_file()
        try:
            result = func(*args, **kwargs)
        finally:
            unlock_file()
        return result

    return wrapper


def get_domain_by_approve_id(approve_id):
    lines = read_file_lines()

    for line in lines:
        parts = line.split()
        if parts[0] == approve_id:
            return parts[1]

    raise RuntimeError("无法找到指定工单对应的c3域名")


def save_approve_id(approve_id, domain):
    lines = read_file_lines()
    lines.append(f"{approve_id} {domain}")

    batch_update_lines(lines)
