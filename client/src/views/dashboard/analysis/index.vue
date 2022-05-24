<template>
  <div class="p-4">
    <GrowCard class="enter-y" :analysisData="analysisData" />
    <div class="md:flex enter-y">
      <CityAnalysis class="md:w-2/3 !my-4 w-full enter-y" :analysisData="analysisData" />
      <!-- <VisitRadar class="md:w-1/3 w-full" :loading="loading" :analysisData="analysisData" /> -->
      <FrequencyAnalysis class="md:w-1/3 !md:mx-4 !md:my-4 w-full" :analysisData="analysisData" />
      <!-- <SalesProductPie class="md:w-1/3 w-full" :loading="loading" :analysisData="analysisData" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import CityAnalysis from './components/CityAnalysis.vue';
  import FrequencyAnalysis from './components/FrequencyAnalysis.vue';
  // import VisitRadar from './components/VisitRadar.vue';
  // import SalesProductPie from './components/SalesProductPie.vue';
  import { getAnalysisRes } from '/@/api/demo/user';
  import { message } from 'ant-design-vue';

  interface IAnalysisData {
    stationCount: Number;
    equipmentCount: Number;
    projectCount: Number;
    visitCount: Number;
    cityAnalysisData: Number;
    frequencyAnalysisData: Number;
  }

  const analysisData = ref<IAnalysisData>();

  //获取分析页数据, 然后传递给每个组件即可
  const fetchAnalysisRes = () => {
    getAnalysisRes().then(
      (data) => {
        console.log('fetchAnalysisRes', data);
        analysisData.value = data;
      },
      (error) => {
        console.error('fetchAnalysisRes失败!', error);
        message.error('系统异常！拉取分析数据失败！');
      },
    );
  };
  fetchAnalysisRes();
</script>
