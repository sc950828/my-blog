// 百度地图API功能
var map = new BMap.Map("map");
var point = new BMap.Point(121.464841, 31.208961); // 根据经纬度定位
map.centerAndZoom(point, 15);
map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
map.addControl(new BMap.NavigationControl());
map.enableScrollWheelZoom(true);
var marker = new BMap.Marker(point); // 创建标注
map.addOverlay(marker); // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
