#!/bin/zsh
# 55
# sudo ssh -L 7080:10.237.0.56:5555 09402bad5e80f3902fc1c0188cab3cd5@122.9.66.164 -i ~/.ssh/huawei-adb-KeyPair-9c6a.pem -Nf
for (( i=0; i<1; i++))
do
    echo "$i"
    cloud_phone_connect_ip="10.237.0.56"
    echo "starting connect $cloud_phone_connect_ip";
    old_process=`ps -ef | grep $cloud_phone_connect_ip | grep -v grep | awk '{print $2}' | wc -l`
    echo "$cloud_phone_connect_ip number of old process :$old_process"
    if [ $old_process -eq 0 ] ;then
        echo "no old listen port process exits"
    else 
        echo "kill old listen port process now"
        ps -ef | grep $cloud_phone_connect_ip | grep -v grep | awk '{print $2}' | xargs kill -9
    fi
    sleep 5
    echo "start  connect $cloud_phone_connect_ip";
    echo "sudo ssh -L 1000$i:$cloud_phone_connect_ip:5555 09402bad5e80f3902fc1c0188cab3cd5@122.9.66.164 -i ~/.ssh/huawei-adb-KeyPair-9c6a.pem -Nf"
    sudo ssh -L 1000$i:$cloud_phone_connect_ip:5555 09402bad5e80f3902fc1c0188cab3cd5@122.9.66.164 -i ../huawei-adb-KeyPair-9c6a.pem -Nf
    echo "connected $cloud_phone_connect_ip";
    # airtest run  tets-phone.air --device Android:///127.0.0.1:1000$i
done
