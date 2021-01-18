for loop in 1 2 3 4 5
do
  echo "The value is: $loop"
done

int=1
while(( $int<=5 ))
do
  echo $int
  let "int++"
done

a=0

until [ ! $a -lt 10 ]
do
  echo $a
  a=`expr $a + 1`
done

echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
