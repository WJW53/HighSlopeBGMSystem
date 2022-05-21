<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { createAccount, updateAccount } from '/@/api/demo/system';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 150,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        // 无论是否为超级管理员: 账号名不允许修改,密码可以改
        updateSchema([
          {
            field: 'account',
            show: !unref(isUpdate),
          },
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field: 'mobile',
            show: !unref(isUpdate),
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 在这里做新增/编辑请求即可
          console.log(values);
          if (!unref(isUpdate)) {
            const res = await createAccount(values);
            console.log(res);
            if (res) {
              message.success('该账号数据新增成功！');
            } else {
              message.success('账号数据新增失败！');
            }
          } else {
            const res = await updateAccount(values.id, values);
            console.log(res);
            if (res) {
              message.success('账号数据更新成功！');
            } else {
              message.success('账号数据更新失败');
            }
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
