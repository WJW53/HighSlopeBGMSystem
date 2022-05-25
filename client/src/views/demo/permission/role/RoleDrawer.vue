<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menuList="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'menuNo' }"
          checkable
          toolbar
          title="菜单分配"
          style="width: 365px; left: 50px"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getAllMenuBasicInfo, createRole, updateRole } from '/@/api/demo/system';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getAllMenuBasicInfo().then(
            (result) => {
              if (result.menuList) {
                return result.menuList;
              }
              return result;
            },
            (error) => {
              console.error('拉取全量菜单信息失败', error);
              message.error('拉取全量菜单信息失败');
            },
          )) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        updateSchema([
          {
            field: 'roleValue',
            componentProps: {
              disabled: unref(isUpdate),
            },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // custom api
          console.log('drawer内要提交的数据: ', values); //虽然menu是代理对象, 但是不影响提交上去的对象是普通对象
          if (!unref(isUpdate)) {
            const res = await createRole(values);
            console.log(res);
            if (res) {
              message.success('该角色数据新增成功！');
            } else {
              message.error('角色数据新增失败！');
            }
          } else {
            const res = await updateRole(values.id, values);
            console.log(res);
            if (res) {
              message.success('角色数据更新成功！');
            } else {
              message.error('角色数据更新失败');
            }
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
