<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { watch, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    ...basicProps,
    diffTimeList: {
      type: Array,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.diffTimeList,
    () => {
      if (props.diffTimeList?.length > 0) {
        const xList = props.diffTimeList.map((item) => `${item.name}天`);
        const yList = props.diffTimeList.map((item) => item.value);
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: xList,
          },
          yAxis: {
            type: 'value',
            max: Math.max(...yList),
            splitNumber: 4,
          },
          series: [
            {
              data: yList,
              type: 'bar',
              barMaxWidth: 80,
            },
          ],
        });
      }
    },
    { immediate: true },
  );
</script>
