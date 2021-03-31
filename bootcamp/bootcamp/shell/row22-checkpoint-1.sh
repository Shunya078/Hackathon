#!/bin/sh

A="1 2 3 4 5 6 7 8 9 10"

for a in $A
do
  Answer=`expr $a % 2`
  if [ $Answer == 0 ]
  then
    echo "$a is even number"
  else
    echo "$a is odd number"
  fi
done