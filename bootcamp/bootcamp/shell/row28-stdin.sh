#!/bin/sh

read HOGE

if [ "$HOGE" != "" ]
then
  echo "stdin is $HOGE"
else
  echo "nothing stdin"
fi