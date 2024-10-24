#!/bin/bash

rm ./build.tgz

# .env 파일 로드
set -a
source .env
set +a

PASSWORD=${SCP_PASSWORD}

echo -e "\033[1;36m[-] BUILD CLOUD2-FRONT BUILD PROD ... \033[0m"

yarn build

echo -e "\033[1;32;40m[+] BUILD SUCCESS! \033[0m"

tar -czf build.tgz ./build

echo -e "\033[1;36m[-] SUCCESS TAR AND SEND VM ... \033[0m"

sshpass -p "$PASSWORD" scp build.tgz ubuntu@43.202.14.207:/home/ubuntu/Front/

echo -e "\033[1;32;40m[+] SEND SUCCESS!!! \033[0m"

# tar -xvf build.tgz 로 압축 해제