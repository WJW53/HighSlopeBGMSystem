<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
    :loading="loading"
  >
    <p v-if="activeKey === 'monitorCity'">
      <CityAnalysisMain :cityList="cityList" />
    </p>
    <p v-else-if="activeKey === 'monitorTimeDiff'">
      <DiffTimeAnalysisBar :diffTimeList="diffTimeList" />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import CityAnalysisMain from './CityAnalysisMain.vue';
  import DiffTimeAnalysisBar from './DiffTimeAnalysisBar.vue';

  const activeKey = ref('monitorCity');
  const tabListTitle = [
    {
      key: 'monitorCity',
      tab: '监测工位所在城市统计',
    },
    {
      key: 'monitorTimeDiff',
      tab: '监测项目时长统计',
    },
  ];

  const props = defineProps({
    analysisData: {
      type: Object,
      required: true,
    },
  });
  const cityList = ref({});
  const diffTimeList = ref([]);
  const loading = ref(true);

  watch(
    () => props.analysisData,
    () => {
      if (props?.analysisData?.cityAnalysisData) {
        cityList.value = props.analysisData.cityAnalysisData;
        diffTimeList.value = props.analysisData.monitorDiffTimeAnalysisData;
        loading.value = false;
      }
    },
    { immediate: true },
  );

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
