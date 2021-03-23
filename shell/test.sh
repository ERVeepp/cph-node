#!/bin/zsh
string=""
pushd ~/platform-tools/
# cd ~/platform-tools/adb
# adb=~/platform-tools/adb
adb --version
adb kill-server
while getopts "D:" arg #选项后面的冒号表示该选项需要参数
do
    case $arg in
        D)
            string=$OPTARG
            ;;
        ?)  #当有不认识的选项的时候arg为?
        echo "含有未知参数"
    exit 1
    ;;
    esac
done
array=(`echo $string | tr ',' ' '` )
function adbFn(){
    cloud_phone_connect_ip=$i
    echo "starting connect $cloud_phone_connect_ip";
    adb connect $cloud_phone_connect_ip
    # sleep 1
    # airtest run ../ym-auto-install/test-phone.air --device Android:///$cloud_phone_connect_ip --log log/
}

for i in ${array[*]}; do
    echo $i
    # adbFn $i
done
