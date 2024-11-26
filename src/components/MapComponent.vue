<template>
  <div class="map-container">
    <el-row>
      <el-col :span="12">
        <el-input v-model="fenceName" placeholder="请输入电子围栏名称"></el-input>
        <el-button type="primary" @click="addFence">添加电子围栏</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="map" style="height: 400px; border: 1px solid #ccc;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="fences" style="width: 100%">
          <el-table-column prop="name" label="围栏名称" />
          <el-table-column prop="coordinates" label="坐标" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import ElMessage from "element-plus";
import { defineComponent, ref } from 'vue';

interface Fence {
  name: string;
  coordinates: string;
}

export default defineComponent({
  name: 'MapComponent',
  setup() {
    const fenceName = ref('');
    const fences = ref<Fence[]>([]);

    const addFence = () => {
      if (fenceName.value) {
        const newFence: Fence = {
          name: fenceName.value,
          coordinates: '[经纬度示例]', // 这里可以添加实际的坐标
        };
        fences.value.push(newFence);
        fenceName.value = '';
        // 这里可以调用绘制电子围栏的逻辑
      } else {
        // 使用 Element Plus 提示框
        console.error('请填写电子围栏名称');
        ;
      }
    };

    return {
      fenceName,
      fences,
      addFence,
    };
  },
});
</script>

<style scoped>
.map-container {
  padding: 20px;
}
</style>
