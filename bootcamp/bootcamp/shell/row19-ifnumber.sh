#!/bin/sh

A=1
B=2

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

if [ $A -eq $B ]
then
  echo "$A = $B"
elif [ $A -gt $B ]
then
  echo "$A > $B"
elif [ $A -lt $B ]
then
  echo "$A < $B"
elif [ $A -ge $B ]
then
  echo "$A >= $B"
elif [ $A -le $B ]
then
  echo "$A <= $B"
else
  echo "$A ≠ $B"
fi