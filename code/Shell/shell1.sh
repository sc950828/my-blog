#!/bin/bash
# author:randy

echo $SHELL

name='randy'

echo "you name is ${name}"
echo "you name is $name"
echo 'you name is' $name

arr=(1 2 3)

echo $arr
echo ${arr[0]}
echo ${arr[1]}
echo ${arr[2]}
echo ${arr[*]}
echo ${arr[@]}
echo ${#arr[*]}
echo ${#arr[@]}
