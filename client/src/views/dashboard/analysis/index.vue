<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" :analysisData="analysisData" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" :analysisData="analysisData" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" :analysisData="analysisData" />
      <VisitSource
        class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full"
        :loading="loading"
        :analysisData="analysisData"
      />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" :analysisData="analysisData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import { getAnalysisRes } from '/@/api/demo/user';

  const loading = ref(true);
  const analysisData = ref({});
  //TODO: 获取分析页数据, 然后传递给每个组件即可

  const fetchAnalysisRes = async () => {
    const res = await getAnalysisRes();
    console.log('fetchAnalysisRes', res);
  }

  fetchAnalysisRes();

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
