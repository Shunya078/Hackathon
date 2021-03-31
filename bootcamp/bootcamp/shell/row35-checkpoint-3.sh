#!/bin/sh

mkdir child-directory-a && mkdir child-directory-b

$(cd "child-directory-a" && touch test.txt)
cd "child-directory-a"
mv test.txt "../child-directory-b"
cd "../child-directory-b"
mv test.txt "../"