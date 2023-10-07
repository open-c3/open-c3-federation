import fcntl
import os
import time

from loguru import logger

APPROVE_ID_PATH = "/app/data/approve_id.txt"
LOCK_PATH = "/app/data/approve_id.lock"
LOCK_TIMEOUT = 60  # 等待锁的超时时间（秒）


def _acquire_lock():
    start_time = time.time()
    while True:
        lockfile = open(LOCK_PATH, "w")
        try:
            fcntl.flock(lockfile, fcntl.LOCK_EX | fcntl.LOCK_NB)
            return lockfile
        except BlockingIOError:
            lockfile.close()
            if time.time() - start_time >= LOCK_TIMEOUT:
                print("等待锁超时")
                return None
            time.sleep(1)


def _release_lock(lockfile):
    try:
        fcntl.flock(lockfile, fcntl.LOCK_UN)
        lockfile.close()
    except Exception as e:
        print(f"Failed to release lock: {e}")


# 其余代码不变


def _read_file_lines():
    data_list = []

    if os.path.exists(APPROVE_ID_PATH):
        with open(APPROVE_ID_PATH, "r") as file:
            data_list.extend(line.strip() for line in file)
    return data_list


def _append_to_file(file_path, line):
    with open(file_path, "a+") as file:
        file.write(line)


def get_domain_by_approve_id(approve_id):
    logger.debug(f"get_domain_by_approve_id. approve_id: {approve_id}")

    lockfile = _acquire_lock()
    if lockfile is None:
        return None

    try:
        lines = _read_file_lines()

        for line in lines:
            if not line:
                continue
            parts = line.split()
            if parts[0] == approve_id:
                logger.debug(
                    f"get_domain_by_approve_id. approve_id: {approve_id}, domain: {parts[1]}"
                )

                return parts[1]
    finally:
        _release_lock(lockfile)

    return None


def save_approve_id(approve_id, domain):
    lockfile = _acquire_lock()
    if lockfile is None:
        return

    logger.debug(f"save_approve_id. approve_id: {approve_id}, domain: {domain}")

    try:
        _append_to_file(APPROVE_ID_PATH, f"{approve_id} {domain}\n")
    finally:
        _release_lock(lockfile)
