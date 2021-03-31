#!/bin/sh

A="1 2 3 4 5 6 7 8 9 10"

for a in $A
do
  echo `expr $a + 1`
done