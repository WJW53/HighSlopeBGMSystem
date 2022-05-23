<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.account')"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :mobile="formData.mobile"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="newPassword" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.newPassword"
          :placeholder="t('sys.login.newPassword')"
        />
      </FormItem>
      <FormItem name="newConfirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.newConfirmPassword"
          :placeholder="t('sys.login.newConfirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { resetPassword } from '/@/api/demo/user';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    mobile: '',
    sms: '',
    newPassword: '',
    newConfirmPassword: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  async function handleReset() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
    resetPassword(data).then(
      (resp) => {
        console.log('重置密码后端返回的数据', resp);
        if (resp) {
          message.success('重置密码成功！');
          formRef.value.resetFields();
          handleBackLogin();
        } else {
          message.error(resp.message || '重置失败!');
        }
      },
      (error) => {
        console.error('系统异常！重置密码失败！', error);
      },
    );
  }
</script>
