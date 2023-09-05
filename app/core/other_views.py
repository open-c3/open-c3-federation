from flask import Blueprint, current_app
from werkzeug.local import LocalProxy

from .api import get_endpoint_list
from .response import success_response

other_view = Blueprint("other", __name__)
logger = LocalProxy(lambda: current_app.logger)


@other_view.route("/endpoints", methods=["GET"])
def get_endpoint_list_view():
    data = get_endpoint_list()
    return success_response(data)
