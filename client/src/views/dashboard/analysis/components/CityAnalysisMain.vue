<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    ...basicProps,
    cityList: {
      type: Object,
      required: true,
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.cityList,
    () => {
      const cityList = props.cityList;
      if (cityList) {
        const xList = cityList.map(item => item.name);
        const yList = cityList.map(item => item.value);
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
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xList,
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              max: Math.max(...yList),
              splitNumber: 4,
              axisTick: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              data: yList,
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#5ab1ef',
              },
            },
            // {
            //   smooth: true,
            //   data: [
            //     33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
            //     198, 60, 30, 22, 11,
            //   ],
            //   type: 'line',
            //   areaStyle: {},
            //   itemStyle: {
            //     color: '#019680',
            //   },
            // },
          ],
        });
      }
    },
    { immediate: true },
  );
</script>
