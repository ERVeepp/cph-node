# -*- encoding=utf8 -*-
__author__ = "wangleigis163.com"

from airtest.core.api import *
from requests.auth import HTTPBasicAuth
import requests
import json

auto_setup(__file__)

from airtest.core.api import *


# connect an android phone with adb
# init_device("Android")
# or use connect_device api
# connect_device("Android:///")

# connect_device("android:///127.0.0.1:20000")
# start_app("com.android.chrome")
# text("expressvpn")

# install("path/to/your/apk")
# install("/Users/wangleigis163.com/Documents/alex/dev/code/yeahmobi/huaweiyun-phone/tets-phone.air/360-web.apk")
# install("/Users/wangleigis163.com/Downloads/Chrome Dev_v88.0.4314.2_apkfab.com.xapk")
# start_app("com.cubic.autohome")
# start_app("org.chromium.webview_shell")
# shell("ls /data/local/tmp")
# touch(178, 785)
# text("http://global.ymtracking.com/trace?offer_id=7573406&aff_id=1&google_adv_id=55E35CA1-799F-4BD6-8563-84EE6C49BAEE&sub_affiliate_id=test")
# text("helo")
# text("http://zhushou.360.cn/")
# com.qihoo.browser
# start_app("com.qihoo.browser")
# text("global.ymtracking.com/trace?offer_id=22773000&aff_id=105179")
# text("global.ymtracking.com/trace?offer_id=22800169&aff_id=1")
# global.ymtracking.com/trace?offer_id=22788996&aff_id=1
# install("/Users/wangleigis163.com/Downloads/com.android.chrome_79.0.3945.93_free-www.apkhere.com.apk")

# text("play.google.com/store/apps/")
# text("http://zhushou.360.cn/detail/index/soft_id/77208")


# 准备vpn环境

def vpn_evn():
    try:
        # 1 安装VPN
        # install("expressvpn-1-trusted-vpn-secure-private-fast_9.0.40.apk")
        # 2 登录VPN
        # 2.1 打开App
        # 2.3 选择区域[需要可配置，先固定]
        # 2.4 登录
        stop_app("com.expressvpn.vpn")
        start_app("com.expressvpn.vpn")
        sleep(10)
        vpn_status = exists(Template("vpn-connected.png"))
        print(vpn_status)
        if vpn_status:
            print("VPN Have connected")
        else:
            print("VPN Do Not Connected,now start login VPN ")
            wait(Template("vpn-sign-in.png"))
            assert_exists(Template("vpn-sign-in.png"))
            click(Template("vpn-sign-in.png"))
            # 2.2 输入用户名密码[需要可配置，先固定]
            text("lukangping@gmail.com")
            touch(Template("vpn-login-pwd-input.png"))

            sleep(5)
            text("1234.com")
            wait(Template("vpn-signin-bt.png"))
            assert_exists(Template("vpn-signin-bt.png"))
            click(Template("vpn-signin-bt.png"))

            wait(Template("vpn-signin-ok.png"))
            assert_exists(Template("vpn-signin-ok.png"))
            click(Template("vpn-signin-ok.png"))
            #             wait(Template("vpn-ok-gree.png"))
            #             assert_exists(Template("vpn-ok-gree.png"))
            #             click(Template("vpn-ok-gree.png"))

            wait(Template("vpn-connect.png"))
            assert_exists(Template("vpn-connect.png"))
            click(Template("vpn-connect.png"))

    except Exception as e:
        return False
    return True


#postern proxy setting

def setText(point,oldTextLength,textStr):
    touch((point[0] + 200,point[1] + 20))
    for i in range(oldTextLength):
        keyevent("67")
    text(textStr)

# ***************************set ip and port************************************
def setProxy():
    touch(Template(r"psr_menu_main.png", record_pos=(-0.326, -0.756), resolution=(720, 1280)))
    touch(Template(r"psr_menu_proxy.png", record_pos=(-0.322, -0.493), resolution=(720, 1280)))

    defaultProxyPoint = exists(Template(r"psr_menu_proxy_key.png", record_pos=(-0.45, -0.615), resolution=(720, 1280)))

    if defaultProxyPoint:
        touch(defaultProxyPoint)
    else:
        addProxyPoint = exists(Template(r"psr_proxy_add.png", record_pos=(-0.013, -0.603), resolution=(720, 1280)))
        touch(addProxyPoint)

    serverType = exists(Template(r"psr_proxy_svc_name.png", record_pos=(-0.358, -0.637), resolution=(720, 1280)))
    setText(serverType,30,"proxy")
    serverAddressPoint = exists(Template(r"psr_proxy_svc_ip.png", record_pos=(-0.336, -0.476), resolution=(720, 1280)))
    setText(serverAddressPoint,30,"10.237.255.244")


    serverPortPoint = exists(Template(r"psr_proxy_svc_port.png", record_pos=(-0.365, -0.307), resolution=(720, 1280)))
    setText(serverPortPoint,30,"24000")



    serverTypePoint = touch(Template(r"psr_proxy_svc_type.png", record_pos=(-0.372, -0.149), resolution=(720, 1280)))
    touch((serverTypePoint[0],serverTypePoint[1] + 20))

    touch(Template(r"psr_proxy_svc_type_socks5.png", record_pos=(-0.344, -0.335), resolution=(720, 1280)))


    usernamePoint = exists(Template(r"psr_proxy_uername.png", record_pos=(-0.381, 0.003), resolution=(720, 1280)))
    setText(usernamePoint,10,"")
    passwordPoint = exists(Template(r"psr_proxy_pwd.png", record_pos=(-0.382, 0.164), resolution=(720, 1280)))
    setText(passwordPoint,10,"")


    touch(Template(r"psr_proxy_save.png", record_pos=(-0.003, 0.608), resolution=(720, 1280)))
    print("proxy ip and host has been configed.")


# ***************************set role******************************************
def setRule():
    touch(Template(r"psr_menu_main_2.png", record_pos=(-0.326, -0.756), resolution=(720, 1280)))
    touch(Template(r"psr_menu_rules.png", threshold=0.9000000000000001, record_pos=(-0.179, -0.358), resolution=(720, 1280)))



    #clear role
    defaultRule2Point = exists(Template(r"psr_rule_rule2.png", threshold=0.8500000000000001, record_pos=(-0.349, -0.524), resolution=(720, 1280)))

    if defaultRule2Point:
        touch(defaultRule2Point,times=1,duration=4)
        touch(Template(r"psr_rule_delete.png", record_pos=(-0.304, -0.219), resolution=(720, 1280)))

    defulatRule1Point = exists(Template(r"psr_rule_rule1.png", threshold=0.8500000000000001, record_pos=(-0.356, -0.639), resolution=(720, 1280)))

    if defulatRule1Point:
        touch(defulatRule1Point,times=1,duration=4)
        touch(Template(r"psr_rule_delete.png", record_pos=(-0.304, -0.219), resolution=(720, 1280)))



    touch(Template(r"psr_rule_add.png", record_pos=(0.003, -0.601), resolution=(720, 1280)))


    macthMethodPoint = exists(Template(r"psr_rule_match_method.png", record_pos=(-0.349, -0.636), resolution=(720, 1280)))


    touch((macthMethodPoint[0],macthMethodPoint[1] + 20))


    touch(Template(r"psr_rule_match_all.png", record_pos=(-0.297, 0.188), resolution=(720, 1280)))




    rulePoint = exists(Template(r"psr_rule_rule.png", record_pos=(-0.412, -0.483), resolution=(720, 1280)))

    touch((rulePoint[0],rulePoint[1] + 20))
    touch(Template(r"psr_rule_proxy_tunnel.png", record_pos=(-0.3, -0.147), resolution=(720, 1280)))



    proxyGroupPoint = exists(Template(r"psr_rule_group.png", record_pos=(-0.308, -0.325), resolution=(720, 1280)))
    touch((proxyGroupPoint[0],proxyGroupPoint[1] + 20))
    touch(Template(r"psr_rule_proxy-.png", record_pos=(-0.383, -0.139), resolution=(720, 1280)))

    touch(Template(r"psr_rule_save.png", record_pos=(-0.014, 0.168), resolution=(720, 1280)))
    print("rule has been configed.")

# ************************start proxy***************************************
def startProxy():
    touch(Template(r"psr_menu_main_3.png", record_pos=(-0.328, -0.754), resolution=(720, 1280)))
    
    
    vpnOffPoint = exists(Template(r"psr_menu_vpnoff.png", threshold=0.8999999999999999, record_pos=(-0.326, 0.301), resolution=(720, 1280)))
    if vpnOffPoint:
        touch(vpnOffPoint)
        sleep(5.0)
        print("set vpn to offline")
        touch(Template(r"psr_menu_main_3.png", record_pos=(-0.328, -0.754), resolution=(720, 1280)))

    vpnOnPoint = exists(Template(r"psr_menu_vpnon.png", threshold=0.8999999999999999, record_pos=(-0.333, 0.301), resolution=(720, 1280)))
    if vpnOnPoint:
        touch(vpnOnPoint)
        print("set vpn to online.")

    print("vpn has been onlined.")
    

def postern_vpn_evn():
    start_app("com.tunnelworkshop.postern")
    okBtnPoint = exists(Template(r"psr_start_ok.png", record_pos=(0.306, 0.281), resolution=(720, 1280)))
    if okBtnPoint:
        touch(okBtnPoint)
    setProxy()
    setRule()
    startProxy()
    
    
    
def superproxy_vpn_evn():
    try:
        # 1 安装VPN
        print(shell("settings put global http_proxy 10.237.255.244:24000"))
        # print(shell("curl --proxy lum-customer-yeahmobi-zone-ym_cov-country-my:cnbptjkmzvg3@10.237.255.244:24000"))

        stop_app("com.android.chrome")
        start_app("com.android.chrome")
        # print(shell("curl http://www.ipinfo.io"))

        accepet_chrome = exists(Template("chrome-no-tks.png"))
        print(accepet_chrome)
        if accepet_chrome:
            wait(Template("chrome-no-tks.png"))
            assert_exists(Template("chrome-no-tks.png"))
            touch(Template("chrome-no-tks.png"))
            sleep(5)

            print("google chrome service accepeted")
        else:
            print("google chrome service already accepeted")

        if_hava_input = exists(Template("chrome-search.png"))
        print(if_hava_input)
        if if_hava_input:
            wait(Template("chrome-search.png"))
            assert_exists(Template("chrome-search.png"))
            touch(Template("chrome-search.png"))
            # text("open chorm tab")
            text("hello")
            # text("ipinfo.io")
        else:
            print("skip check chrome search input ")
        wait(Template("vpn-username-input.png"))
        assert_exists(Template("vpn-username-input.png"))
        touch(Template("vpn-username-input.png"))
        sleep(2)
        text("lum-customer-yeahmobi-zone-ym_cov-country-my")
        sleep(2)

        wait(Template("vpn-password-input.png"))
        assert_exists(Template("vpn-password-input.png"))
        touch(Template("vpn-password-input.png"))
        sleep(2)
        text("cnbptjkmzvg3")
        sleep(2)

        #         wait(Template("vpn-cancel.png"))
        #         assert_exists(Template("vpn-cancel.png"))
        #         click(Template("vpn-cancel.png"))

        #         wait(Template("vpn-signin.png"))
        #         assert_exists(Template("vpn-signin.png"))
        click(Template("vpn-signin.png"))
        text("ipinfo.io/")
        sleep(2)
        wait(Template("vpn-password-save.png"))
        assert_exists(Template("vpn-password-save.png"))
        click(Template("vpn-password-save.png"))




    except Exception as e:
        return False
    return True


# 3 登录google play

def google_play_evn(user_account):
    try:
        stop_app("com.android.vending")
        start_app("com.android.vending")
        # 判断是否需要接受协议
        accepet_service = exists(Template("google-play-accept.png"))
        print(accepet_service)
        if accepet_service:
            print("google play now accepeting")
            wait(Template("google-play-accept.png"))
            assert_exists(Template("google-play-accept.png"))
            click(Template("google-play-accept.png"))
            sleep(5)
            wait(Template("google-play-get-started.png"))
            assert_exists(Template("google-play-get-started.png"))
            click(Template("google-play-get-started.png"))
            print("google play service accepeted")
        else:
            print("google play service already accepeted")
        is_sign_in = exists(Template("google-play-sign-in.png"))
        if is_sign_in:
            wait(Template("google-play-sign-in.png"))
            assert_exists(Template("google-play-sign-in.png"))
            click(Template("google-play-sign-in.png"))

        sleep(5)
        is_input_username = exists(Template("google-play-accont-input.png"))
        if is_input_username:
            # 3.1 打开google play
            # 3.2 输入用户名密码[需要可配置，先固定]
            # sleep(10)
            wait(Template("google-play-accont-input.png"))
            assert_exists(Template("google-play-accont-input.png"))
            touch(Template("google-play-accont-input.png"))
            text(user_account["mail"])
            #                 wait(Template("google-play-next.png"))
            #                 assert_exists(Template("google-play-next.png"))
            #                 click(Template("google-play-next.png"))
            sleep(3)
            text(user_account["password"])
            wait(Template("google-play-agree.png"))
            assert_exists(Template("google-play-agree.png"))
            click(Template("google-play-agree.png"))

        sleep(5)
        stop_app("com.android.vending")
        start_app("com.android.vending")

    except Exception as e:
        print(e)
        return False
    return True


def clear_google_evn():
    stop_app("com.android.vending")
    uninstall("com.android.vending")
    clear_app("com.android.vending")

    clear_app("com.google.android.gms")
    clear_app("com.google.android.gsf")
    clear_app("com.google.android.gsf.login")


def chrome_evn():
    try:
        stop_app("com.android.chrome")
        start_app("com.android.chrome")
        # 判断是否需要接受协议

        accepet_chrome = exists(Template("chrome-accept-continue.png"))
        print(accepet_chrome)
        if accepet_chrome:

            wait(Template("chrome-accept-continue.png"))
            assert_exists(Template("chrome-accept-continue.png"))
            click(Template("chrome-accept-continue.png"))
            print("google chrome service accepeted")
        else:
            print("google chrome service already accepeted")

        accepet_chrome = exists(Template("chrome-no-tks.png"))
        print(accepet_chrome)
        if accepet_chrome:
            wait(Template("chrome-no-tks.png"))
            assert_exists(Template("chrome-no-tks.png"))
            touch(Template("chrome-no-tks.png"))
            sleep(5)

            print("google chrome service accepeted")
        else:
            print("google chrome service already accepeted")



    except Exception as e:
        print(e)
        return False
    return True


# 4 offer跳转,


def offer_redirect(offer_id, app_id, type_name, package_name, destroy_time):
    try:
        uninstall(package_name)
        # clear_app(package_name)

        stop_app("com.android.chrome")
        start_app("com.android.chrome")

        accepet_chrome = exists(Template("chorm-no-thanks-1.png"))
        print(accepet_chrome)
        if accepet_chrome:
            wait(Template("chorm-no-thanks-1.png"))
            assert_exists(Template("chorm-no-thanks-1.png"))
            touch(Template("chorm-no-thanks-1.png"))
            sleep(5)

            print("google chrome service accepeted")
        else:
            print("google chrome service already accepeted")


            
        # 判断是否需要接受协议
        chrome_search_status = exists(Template(r"tpl1606285721135.png", record_pos=(0.011, -0.19), resolution=(720, 1280)))
        print(chrome_search_status)
        if chrome_search_status:

            # print(shell("grep adid_key /data/data/com.google.android.gms/shared_prefs/adid_settings.xml | cut -d '>' -f2 | cut -d '<' -f1"))

            adid = shell(
                "grep adid_key /data/data/com.google.android.gms/shared_prefs/adid_settings.xml | cut -d '>' -f2 | cut -d '<' -f1")
            print(adid)

#             offer_url = "global.ymtracking.com/trace?offer_id={}&app_id={}&type={}&google_adv_id={}".format(offer_id,app_id,type_name,adid)
            offer_url = "ww"
            print("offer_url")                                                                                  
            print(offer_url)
            wait(Template(r"tpl1606285857772.png", record_pos=(0.008, -0.19), resolution=(720, 1280)))

            assert_exists(Template(r"tpl1606285877820.png", record_pos=(-0.001, -0.189), resolution=(720, 1280)), "Please fill in the test point.")

            touch(Template(r"tpl1606285911580.png", record_pos=(0.007, -0.192), resolution=(720, 1280)))

            

            text(offer_url)
            sleep(5)
            
            
            
            
            exits_not_now = exists(Template("google-not-now.png"))
            print(exits_not_now)
            if exits_not_now:
                wait(Template("google-not-now.png"))
                assert_exists(Template("google-not-now.png"))
                click(Template("google-not-now.png"))
                sleep(5)

                print("click google-not-now.png")
            else:
                print("no google-not-now.png ")
            

            # **********#
            # wait(Template("google-play-accept.png"))
            # assert_exists(Template("google-play-accept.png"))
            # touch(Template("google-play-accept.png"))

            # wait(Template("app-install.png"))
            # assert_exists(Template("app-install.png"))
            # touch(Template("app-install.png"))
            # **********#
            sleep(random.randint(5, 20))
            wait(Template("app-install-big.png"))
            assert_exists(Template("app-install-big.png"))
            touch(Template("app-install-big.png"))
            if check_package(package_name, 5, 300):
                print("package {} install success".format(package_name))
            sleep(random.randint(3, 30))
                # return True
            start_app(package_name)
            sleep(destroy_time)
            print("package {} install fail".format(package_name))
        # return False

        else:
            print("chrome_search_status Error")


    except Exception as e:
        print(e)
        return False
    return True


def default_offer_redirect(offer_id, app_id, type_name, package_name, destroy_time):
    try:
        # uninstall(package_name)
        # clear_app(package_name)

        stop_app("org.chromium.webview_shell")
        start_app("org.chromium.webview_shell")

        adid = shell(
            "grep adid_key /data/data/com.google.android.gms/shared_prefs/adid_settings.xml | cut -d '>' -f2 | cut -d '<' -f1")
        print(adid)

#         offer_url = "global.ymtracking.com/trace?offer_id={}&app_id={}&type={}&google_adv_id={}".format(offer_id,
#                                                                                                         app_id,
#                                                                                                         type_name, adid)
        offer_url = "ww123"
        print(offer_url)
        text(offer_url)
        # **********#
        wait(Template("app-install-big.png"))
        assert_exists(Template(r"app-install-big.png"))
        touch(Template("app-install-big.png"))
        if check_package(package_name, 5, 30):
            start_app(package_name)
            print("package {} install success".format(package_name))
            return True

        print("package {} install fail".format(package_name))
        return False
        sleep(destroy_time)



    except Exception as e:
        print(e)
        return False
    return True


def get_package(package_name):
    try:
        # package_status = shell("pm list package com.android.chrome")
        cmd = "pm list package " + package_name
        print(cmd)
        package_name = shell(cmd)
        print(package_name)
        return package_name
    except Exception as e:
        print(e)
        return ""





def check_package(package_name, checkInterval, maxTimes):
    status = False
    timeSum = 0
    while (True):
        try:
            package_status = get_package(package_name)
            print("package_name:{} , package_status: {} ".format(package_name, package_status))
            if len(package_status):
                print("check_package : {} install ok ".format(package_name))
                status = True
                break
            else:
                print("sleep 10 seconds and after check package_name  :" + package_name)
                status = False
                time.sleep(checkInterval)
        except Exception as e:
            print("Error: check_package {}".format(e))
            status = False
            time.sleep(checkInterval)
        timeSum = timeSum + checkInterval
        if timeSum >= maxTimes:
            print("check_package : {} install fail ".format(package_name))
            print("Error: check_package timeout: {}".format(timeSum))
            status = False
            break
    return status


# vpn_evn()
# clear_google_evn()
# chrome_evn()

# superproxy_vpn_evn()
# print(shell("getprop ro.product.brand"))
def retry_action(function, retry_times, sleep_time):
    times = 0
    while (True):
        try:
            function
            times += 1
            if times >= retry_times:
                break
            else:
                print("retry next time")

            time.sleep(sleep_time)
        except Exception as e:
            print("Error: retry_action function ")
            time.sleep(sleep_time)
            function()


def get_google_play_account(google_play_account_unm):
    i = 0
    with open("google-play-account.json", 'r') as f:
        for line in f.readlines():
            if i == google_play_account_unm:
                print(eval(line)["mail"], eval(line)["password"])
                return eval(line)
            i += 1


def get_config():
    i = 0
    with open("auto_install_list.json", 'r') as f:
        for line in f.readlines():
            return eval(line)


# retry_action(superproxy_vpn_evn,3,3)
# text("lum-customer-yeahmobi-zone-ym_cov-country-my:cnbptjkmzvg3@10.237.255.244:24000/ipinfo.io")
google_play_account_unm = get_config()["gmail_number"]
offer_id = get_config()["offer_id"]
app_id = get_config()["app_id"]
type_name = get_config()["type_name"]
package_name = get_config()["package_name"]

print(google_play_account_unm)
print(offer_id)
print(app_id)
print(type_name)
print(package_name)

postern_vpn_evn()
sleep(5)
# postern_vpn_evn()
# sleep(5)
# google_play_evn(get_google_play_account(google_play_account_unm))
# sleep(5)
google_play_evn(get_google_play_account(google_play_account_unm))
offer_redirect(offer_id=offer_id, app_id=app_id, type_name=type_name, package_name=package_name, destroy_time=15)
# print(shell('ping -c 4 10.237.255.244'))

#text("postern")
#text("https://ipinfo.io")
# text("http://global.ymtracking.com/trace?offer_id=22836280&app_id=1286&type=fea2f4110000000f&google_adv_id=6b482f27-3f3c-4b51-8859-75a4b8ae4b3e")
# adid = shell("grep adid_key /data/data/com.google.android.gms/shared_prefs/adid_settings.xml | cut -d '>' -f2 | cut -d '<' -f1")
# print(adid)

