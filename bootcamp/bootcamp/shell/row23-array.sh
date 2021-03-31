#!/bin/sh

A[0]=0

for i in `seq 10`
do
  A[$i]=`expr $i`
  echo "${A[$i]}"
done