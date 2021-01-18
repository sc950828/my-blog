#! /bin/bash

for loop in 1 2 3 4 5
do
  echo "The value is: $loop"
  if [ $loop -gt 2 ]
  then
    echo "end"
    # break
    continue
  fi
done
