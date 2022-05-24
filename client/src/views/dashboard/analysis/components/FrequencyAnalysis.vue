<template>
  <Card title="监测项目的采集频率数据统计" :loading="loading" class="space-y-5">
    <div ref="chartRef" :style="{ width, height, marginTop: '-35px' }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  const props = defineProps({
    analysisData: {
      type: Object,
    },
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.analysisData,
    () => {
      if (props?.analysisData?.frequencyAnalysisData) {
        const frequencyAnalysisList = props.analysisData.frequencyAnalysisData;
        setOptions({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '1%',
            left: 'center',
          },
          series: [
            {
              // color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              color: ['#3ca170', '#5470c6', '#91cd77', '#ef6567', '#f9c956', '#75bedc'],
              name: '监测项目的采集频率数据统计',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: frequencyAnalysisList,
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 100;
              },
            },
          ],
        });
      }
    },
    { immediate: true },
  );
</script>
