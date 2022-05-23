<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue';
  import { Button, message } from 'ant-design-vue';
  import { useCountdown } from './useCountdown';
  import { isFunction } from '/@/utils/is';
  import { useI18n } from '/@/hooks/web/useI18n';

  const props = {
    value: { type: [Object, Number, String, Array] },
    count: { type: Number, default: 60 },
    beforeStartFunc: {
      type: Function as PropType<(params) => Promise<boolean>>,
      default: null,
    },
    mobile: {
      type: String,
      default: '',
    },
  };

  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    props,
    setup(props) {
      const loading = ref(false);

      const { currentCount, isStart, start, reset } = useCountdown(props.count);
      const { t } = useI18n();

      const getButtonText = computed(() => {
        return !unref(isStart)
          ? t('component.countdown.normalText')
          : t('component.countdown.sendText', [unref(currentCount)]);
      });

      watchEffect(() => {
        props.value === undefined && reset();
      });

      /**
       * @description: Judge whether there is an external function before execution, and decide whether to start after execution
       */
      async function handleStart() {
        const { beforeStartFunc, mobile } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            if (typeof mobile === 'string' && mobile.length === 11) {
              console.log('mobile', mobile);
              const canStart = await beforeStartFunc({ mobile });
              canStart && start();
            }else if(mobile){
              message.error('请先输入合法手机号，再点击获取验证码');
            }
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart };
    },
  });
</script>
