let i = 0;
function count() {
  i = i + 1;
  // 发送数据
  postMessage(i);
  setTimeout("count()", 1000);
}
count();
