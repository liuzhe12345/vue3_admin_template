<template>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>浏览器精确定位</title>
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
  <div id="container"></div>
  <div id="containers"></div>
  <div class="info">
    <h4 id="status"></h4><hr>
    <p id="result"></p><hr>
    <p>由于众多浏览器已不再支持非安全域的定位请求,为保位成功率和精度,请升级您的站点到HTTPS。</p>
  </div>
  <div class="table">
    <el-icon size="35" color="" class="no-inherit">
      <Share />
    </el-icon>
    <el-button :class="login_btn1" type="primary"  @click="pathing">路径规划</el-button>
    <el-button :class="login_btn2" type="primary"  @click="Fencing">电子围栏</el-button>
    <el-button :class="login_btn3" type="primary"  @click="positing">实时定位</el-button>
    <el-button type="primary">
      <el-icon style="vertical-align: middle">
        <Search />
      </el-icon>
      <span style="vertical-align: middle"> 搜索 </span>
    </el-button>
    
  </div>
</template>


<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "024d72565c83daab60ebb50df263a09f",
  };
  AMapLoader.load({
    key: "78d74e2e545852c7e7e1615c45570cd7", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale','AMap.HawkEye','AMap.ControlBar','AMap.Geolocation'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        //center: [115.826215,28.717878], // 初始化地图中心点位置
        resizeEnable: true
      });
      AMap.plugin('AMap.ToolBar', function () {
      //在回调函数中实例化插件，并使用插件功能
      //创建工具条插件实例
      var toolbar = new AMap.ToolBar({
        visible: true,
        position: {
          top: '750px',
          right: '170px'
        }
      }); 
       map.addControl(toolbar); //添加工具条插件到页面
       //鹰眼控件
      map.addControl(new AMap.HawkEye());
      //添加比例尺
      var Scale = new AMap.Scale();
       map.addControl(Scale);
      //添加方向盘
      map.addControl(new AMap.ControlBar({
        visible: true,
        position: {
          top: '10px',
          left: '10px'
          }
        })
      );
      });
      //定位
    AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            position:'RB',    //定位按钮的停靠位置
            offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
  })
  map.addControl(geolocation);
  geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
            onComplete(result)
        }else{
            onError(result)
        }
  });
})
    //解析定位结果
    function onComplete (data) {
    // data是具体的定位信息
    document.getElementById('status').innerHTML='定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if(data.accuracy){
             str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('result').innerHTML = str.join('<br>');
  }

  function onError (data) {
    // 定位出错
    document.getElementById('status').innerHTML='定位失败'
        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message+'</br>浏览器返回信息：'+data.originMessage;
  } 
    })
   
});

//地图生命周期
onUnmounted(() => {
  map?.destroy();
});

//电子围栏回调
const Fencing = async () => {
  let polygon;
  let polygonEditor;
 
if (polygonEditor) {//判断存在多边形围栏就先取消编辑并清除之前画的多边形围栏
    polygonEditor.close();
    map.remove(polygon);
  }
  if (mouseTool) {//如果鼠标工具存在先关闭鼠标工具
    mouseTool.close(true);
  }
  ElMessage({
    message: "请在地图中点击鼠标左键设置围栏点",
    type: "warning",
    style: "margin-top:250px;margin-left:50px;"
  });
  // 创建鼠标工具实例
  mouseTool = new AMap.MouseTool(map);
  // MouseTool(map);
  // 绘制多边形
  mouseTool.polygon();
  polygon = new AMap.Polygon({
    map: map,
    path: path,
    strokeColor: "#FF33FF",
    strokeOpacity: 0.2,
    fillColor: "#1791fc",
    fillOpacity: 0.4,
    strokeWeight: 3
  });
  // 多边形绘制完成后的回调
  mouseTool.on("draw", function (e) {
    // 合并已有多边形的点集和新的点集
    path = path.concat(e.obj.getPath());
    mouseTool.close(true);
    // 创建新的多边形，并设置合并后的点集
    polygon.setPath(path);
    // 创建一个多边形编辑器对象
    polygonEditor = new AMap.PolygonEditor(map, polygon);
    // 添加编辑器对象到地图上
    polygonEditor.open();
    // const polygonList = e.obj._opts.path; //多边形的经纬度
    // 将多边形设置到围栏中
    // var fence = new AMap.Fence.Polygon(polygon.getPath());
  });

}

</script>



<style scoped>
#container {
  width: 100%;
  height: 840px;
  color:green;
}
html,body,#containers{
            height:100%;
        }
        .info{
            width:20rem;
        }

.table {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 10px;
        font-weight: bold;
        
}

.el-button {
       font-size: 20px;
       margin: 10px 50px 20px;
}
</style>
