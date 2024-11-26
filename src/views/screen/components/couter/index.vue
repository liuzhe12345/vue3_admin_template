<template>
  <div class="box8">
    <div class="title">
      <p>数据统计</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
  
<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
//获取DOM节点
let charts = ref();
//组件挂载完毕
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value);
  let option = {
    title: {
      text: '学生进入时段统计',
      textStyle:{
        color:'white'
      }
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '4:30-6:30', max: 20 },
        { name: '6:30-8:30', max: 20 },
        { name: '9:30-12:00', max: 20 },
        { name: '12:00-15:30', max: 20 },
        { name: '15:30-19:30', max: 20 },
        { name: '19:30-23:00', max: 20 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [12,4 ,1 ,2,1, ],
            name: '小组统计'
          },
        ]
      }
    ]
  };
  //设置配置项
  mychart.setOption(option)
})
</script>
  
<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

  .title {
    p {
      color: white;
      font-size: 18px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }

}
</style>