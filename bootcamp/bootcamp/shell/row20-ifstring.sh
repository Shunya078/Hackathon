#!/bin/sh

A="hoge"
B="fuga"

if [ $A == $B ]
then
  echo "$A = $B"
fi

if [ $A != $B ]
then
  echo "$A ≠ $B"
else
  echo "$A = $B"
fi

if [ $A = $B ]
then
  echo "$A = $B"
elif [ -z $A ]
then
  echo "A is null"
elif [ -z $B ]
then
  echo "B is null"
else
  echo "$A ≠ $B"
fi