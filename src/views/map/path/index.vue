<!-- <template>

</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">

</style> -->
<!-- 展示用户地理坐标 -->
<template>
    <div id="container" style="height: 400px;"></div>

  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import AMap from 'AMap'; // 引入高德地图 API
  
  export default {
    setup() {
      const map = ref(null);
  
      onMounted(() => {
        // 初始化地图
        map.value = new AMap.Map('container', {
          center: [116.404, 39.915], // 设置地图中心点
          zoom: 11, // 设置地图缩放级别
        });
  
        // 获取用户数据
        fetch('http://localhost:3049/admin/acl/user/') // 替换为你的后端接口地址
          .then(response => response.json())
          .then(data => {
            data.data.forEach(user => {
              if (user.longitude && user.latitude) {
                // 创建标记
                const marker = new AMap.Marker({
                  position: [user.longitude, user.latitude], // 设置标记位置
                  map: map.value, // 添加到地图
                });
              }
            });
          })
          .catch(error => console.error(error));
      });
  
      return {
        map
      };
    }
  };
  </script>