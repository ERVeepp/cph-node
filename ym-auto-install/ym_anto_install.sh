#!/usr/bin/env bash
#重置云手机
python cloud_phone_reset.py

#建立隧道

for((i=2;i<=3;i++));
do
 cloud_phone_connect_ip="10.237.0.$i"
 echo "starting connect $cloud_phone_connect_ip";
 old_process=`ps -ef | grep $cloud_phone_connect_ip | grep -v grep | awk '{print $2}' | wc -l`
 echo "$cloud_phone_connect_ip number of old process :$old_process"
 if [ $old_process -eq 0 ] ;then  
    echo "no old listen port process exits"  
  else    
    echo "kill old listen port process now"
    #echo "ps -ef | grep $cloud_phone_connect_ip | grep -v grep | awk '{print $2}' | xargs kill -9"
    ps -ef | grep $cloud_phone_connect_ip | grep -v grep | awk '{print $2}' | xargs kill -9
 fi   
 sleep 5
 echo "start  connect $cloud_phone_connect_ip";
 echo "ssh -L 1000$i:10.237.0.$i:5555 0a7472a0be80250b2f22c001a123b171@159.138.159.49 -i /root/hw-hk-phone-key.pem -Nf -o ServerAliveInterval=30";
 ssh -L 1000$i:10.237.0.$i:5555 0a7472a0be80250b2f22c001a123b171@159.138.159.49 -i /root/hw-hk-phone-key.pem -Nf -o ServerAliveInterval=30
 sleep 5
 echo "connected $cloud_phone_connect_ip";
 echo "config airtest config ";
 echo  "{'gmail_number':$i,'offer_id':'22836280','app_id':'1286','type_name':'5a720d4d0000001d','package_name':'com.octafx'}" > /root/auto_install_list.json
  echo "run airtest auto script ";
 airtest run  tets-phone.air --device Android:///127.0.0.1:1000$i
done
#select * from `ym_system`.`ym_hive_day_impala` WHERE offer_id = '22667575' and app_id = '1286' and part>='2020-10-16' and part<='2020-11-23'  and platform_name ='Android' limit 20;