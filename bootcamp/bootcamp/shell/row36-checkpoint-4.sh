#!/bin/sh

# 以下コメントアウトはログとして残すためコミットしておきます。
# while処理 <- untilだと条件逆にすれば成立
# number=0
# CURRENT_SCRIPT_PATH=$(dirname $0)
# if [ $1 ]
# then
#   mkdir out
#   while [ "$number" -lt $1 ]
#   do
#     number=`expr $number + 1`
#     mkdir "$CURRENT_SCRIPT_PATH/out/dir-$number"
#     i=0
#     while [ "$i" -lt $number ]
#     do
#       i=`expr $i + 1`
#       touch "$CURRENT_SCRIPT_PATH/out/dir-$number/fire-$i"
#     done
#   done
# fi

# for処理
mkdir out
for i in `seq $1`
do
  mkdir "out/dir-$i"
  for j in `seq $i`
  do
    touch "out/dir-$i/fire-$j"
  done
done