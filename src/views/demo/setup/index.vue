<template>
  <PageWrapper title="用户引导" content="这有一份简易的用户引导教程。">
    <a-button type="primary" @click="handleStart">开始</a-button>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useDesign } from '/@/hooks/web/useDesign';
  import intro from 'intro.js';
  import 'intro.js/minified/introjs.min.css';

  export default defineComponent({
    components: { PageWrapper },
    setup() {
      const { prefixVar } = useDesign('');

      function handleStart() {
        intro()
          .setOptions({
            steps: [
              {
                // title: 'Welcome',
                // intro: 'Hello World! 👋',
                title: '你好！',
                intro: '欢迎来到高边坡监测后台系统用户引导！',
              },
              {
                // title: 'Collapse Button',
                // intro: 'This is the menu collapse button.',
                title: '菜单折叠按钮',
                intro: '点击可 闭合/展开 左侧菜单栏',
                element: document.querySelector(`.${prefixVar}-layout-header-trigger`)!,
              },
              {
                // title: 'User Action',
                // intro: 'This is the user function area.',
                title: '额外的功能入口区域',
                intro: '提供了一些系统额外的操作与功能',
                element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
              },
            ],
          })
          .start();
      }
      return { handleStart };
    },
  });
</script>
