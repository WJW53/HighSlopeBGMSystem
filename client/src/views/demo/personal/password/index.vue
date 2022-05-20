<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './pwd.data';
  import { changePassword } from '/@/api/demo/user';
  import { useUserStore } from '/@/store/modules/user';
import { message } from 'ant-design-vue';
  // import { useRouter } from 'vue-router';
  // import { useGo } from '/@/hooks/web/usePage';
  // import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const userStore = useUserStore();
      // const router = useRouter();
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const params = { ...values, account: userStore.$state.userInfo?.account };
          console.log('ChangePassword-handleSubmit', params);
          // custom api
          const resp = await changePassword(params);
          console.log(resp);
          if (resp) {
            message.success('密码修改成功！即将跳转到登录页！');
            setTimeout(()=>{
              userStore.logout(true); //退出并回到login页
            }, 1000);
          } else {
            console.error('修改密码失败', resp);
          }
        } catch (error) {
          console.error('修改密码失败', error);
        }
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
