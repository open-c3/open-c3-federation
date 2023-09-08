#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import atexit
import threading
import time

from flasgger import Swagger

from app import create_app, data_config, cache

app = create_app()
swagger = Swagger(app)


if __name__ == "__main__":

    def background_task():
        while True:
            print("更新缓存...")
            cache.update_hot_cache()

            time.sleep(data_config["cache_seconds"])

    def stop_background_task():
        global background_thread
        background_thread.do_run = False

    background_thread = threading.Thread(target=background_task)
    background_thread.do_run = True
    background_thread.start()
    # 程序退出时停止缓存更新线程
    atexit.register(stop_background_task)

    app.run(host="0.0.0.0", port=data_config["port"])
