#!/bin/sh

A[0]=0

for i in `seq 10`
do
  A[$i]=`expr $i`
done

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