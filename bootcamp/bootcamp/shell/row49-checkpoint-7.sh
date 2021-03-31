#!/bin/sh

if [ "$1" == "" -o "$2" == "" -o "$(find /Users/otsuboshunya/$1 -name "*$2*")" == "" ]
then
  echo "you must input % ./row49-checkpoint-7.sh hoge fuga"
  break
else
  select var in $(find /Users/otsuboshunya/$1 -name "*$2*");
  do
  if [ "$var" == "" ]
  then
    echo "Your input ($REPLY) is bad."
  else
    echo "you will type % cd $var"
    break
  fi
  done
fi