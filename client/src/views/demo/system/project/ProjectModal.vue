<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { projectFormSchema } from './project.data';
  import { createProject, updateProject } from '/@/api/demo/project';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'ProjectModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: projectFormSchema,
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

        // updateSchema([
        //   {
        //     field: 'id',
        //     show: false,
        //   },
        // ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增项目' : '编辑项目'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 在这里做新增/编辑请求即可
          console.log(values);
          if (!unref(isUpdate)) {
            const res = await createProject(values);
            console.log(res);
            if (res) {
              message.success('该项目数据新增成功！');
            }
          } else {
            const res = await updateProject(values.id, values);
            console.log(res);
            if (res) {
              message.success('该项目数据更新成功！');
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
