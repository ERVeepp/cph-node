# -*- encoding=utf8 -*-
__author__ = "yeahmobi"

from airtest.core.api import *
from airtest.core.android.adb import *
from airtest.core.android.android import *

auto_setup(__file__)
# print(shell('pm list package'))
stop_app("com.UCMobile")
start_app("com.UCMobile")
touch(Template(r"tpl1606806598110.png", record_pos=(-0.394, -0.565), resolution=(720, 1280)))


text('http://www.baidu.com', search=True)
