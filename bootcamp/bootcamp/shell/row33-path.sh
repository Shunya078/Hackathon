#!/bin/sh

if [ -e $1 -a "${1::1}" == "/" ]
then
  echo "stdin is absolute path"
elif [ -e $1 ]
then
  echo "stdin is relative path"
else
  echo "$1 is not path"
fi