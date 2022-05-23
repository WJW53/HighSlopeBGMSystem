<template>
  <PageWrapper title="上传Execl文件导入项目数据">
    <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
      <a-button class="m-3"> 导入Excel </a-button>
    </ImpExcel>
    <a-button class="m-3" v-show="formattedResultsRef?.length > 0" @click="uploadProjectInfoList">
      确定上传
    </a-button>
    <BasicTable
      v-for="(table, index) in tableListRef"
      :key="index"
      :title="table.title"
      :columns="table.columns"
      :dataSource="table.dataSource"
      :showIndexColumn="false"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { mapArrHeader } from './data';
  import { createProject } from '/@/api/demo/project';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'UploadExcel',
    components: { BasicTable, ImpExcel, PageWrapper },

    setup() {
      const tableListRef = ref<
        {
          title: string;
          columns?: any[];
          dataSource?: any[];
        }[]
      >([]);
      const formattedResultsRef = ref();

      async function loadDataSuccess(excelDataList: ExcelData[]) {
        tableListRef.value = [];
        console.log('loadDataSuccess-Result', excelDataList);
        const {
          header,
          results,
          meta: { sheetName },
        } = excelDataList[0];
        const columns: BasicColumn[] = [];
        for (const title of header) {
          columns.push({ title, dataIndex: title });
        }
        tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        const formattedResults = results.map((item) => {
          const ans = {};
          for (const key of Object.keys(item)) {
            ans[mapArrHeader[key]] = item[key];
          }
          return ans;
        });
        formattedResultsRef.value = formattedResults;
        console.log('formattedResults', formattedResults);
      }

      async function uploadProjectInfoList() {
        if (formattedResultsRef.value && formattedResultsRef.value.length > 0) {
          const res = await createProject(formattedResultsRef.value);
          console.log('response', res);
          if (res) {
            message.success('项目数据已导入成功！');
            tableListRef.value = null;
            formattedResultsRef.value = null;
          } else {
            message.error('系统异常！数据导入失败！');
          }
        }
      }

      return {
        loadDataSuccess,
        tableListRef,
        uploadProjectInfoList,
        formattedResultsRef,
      };
    },
  });
</script>
