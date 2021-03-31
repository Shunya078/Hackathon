#!/bin/sh

if [ "$1" != "ok" -a "$1" != "ng" ]
then
  echo "stdin is $1"
  exit 0

if [ "$1" == "ok" ]
then
    echo $1 1> ok.txt
    
if [ "$1" == "ng" ]
then
    hoge
    row31-stderr.sh 2> ng.txt
fi