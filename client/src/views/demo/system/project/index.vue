<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <!-- fixedHeight若加上了, 表格下面的分页模块就看不见了, 被页脚遮住了;这个注释不能放在上面, 会引起多个根节点！导致切换tab空白 -->
    <BasicTable @register="registerTable" class="w-full xl:w-full" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增项目</a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看项目详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑项目资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此项目',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProjectModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import ProjectModal from './ProjectModal.vue';

  import { columns, searchFormSchema } from './project.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { getAllProject, deleteProject } from '/@/api/demo/project';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'ProjectManagement',
    components: { BasicTable, PageWrapper, ProjectModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '项目列表',
        api: getAllProject,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log('delete', record);
        deleteProject(record.id).then(
          (resp) => {
            console.log(resp);
            if (resp) {
              message.success('该项目删除成功！');
              reload();
            } else {
              message.error('该项目删除失败！');
            }
          },
          (err) => {
            console.error('删除该项目失败！', err);
            message.error('系统异常，删除该项目失败！');
          },
        );
      }

      function handleSuccess({ isUpdate, values }) {
        // if (isUpdate) {
        //   //演示不刷新表格直接更新内部数据。
        //   //注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        //   const result = updateTableDataRecord(values.id, values);
        //   console.log(result);
        // } else {
        //   reload();
        // }
        reload();
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/project_detail/' + record.id);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
