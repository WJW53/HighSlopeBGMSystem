<template>
  <Card title="快捷入口" v-bind="$attrs">
    <CardGrid v-for="item in navItems" :key="item">
      <span class="flex flex-col items-center">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <!-- <span class="text-md mt-2">{{ item.title }}</span> -->
        <RouterLink :to="{ path: item.path }">{{ item.title }}</RouterLink>
      </span>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { navItems } from './data';
  import { Icon } from '/@/components/Icon';

  const CardGrid = Card.Grid;
</script>
