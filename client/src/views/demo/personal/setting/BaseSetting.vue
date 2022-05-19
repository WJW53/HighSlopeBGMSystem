<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';

  import { getUserInfo, updateUserInfo } from '/@/api/demo/user';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();
      // const userId = userStore.$state.userInfo.id;
      const userId = '625d58940aa9a93f2c0771e1'; // TODO: 这里记得改回动态的

      const [register, { setFieldsValue, getFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await getUserInfo({ id: userId }); // 拉取用户基本信息
        console.log('userInfo', data);
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      //source就是src->base64, data是上传到服务器后, 返回的数据
      function updateAvatar({ source, data }) {
        console.log('已经上传给服务器base64地址了, 这个src就是base64', source, data);
        const userinfo = userStore.getUserInfo;
        // userinfo.avatar = source;
        userinfo.avatar = data.result; // TODO: 记得看看是否要改回来
        userStore.setUserInfo(userinfo);
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit: () => {
          const newUserInfo = getFieldsValue();
          // 把新数据发送给后端, 然后同步更新全局的数据
          console.log('准备新提交的用户信息', newUserInfo);
          updateUserInfo(userId, newUserInfo).then(
            (data) => {
              createMessage.success('更新成功！');
              console.log(userStore.getUserInfo);
              userStore.setUserInfo(data);
            },
            (error) => {
              console.error('系统异常！更新失败', error);
              createMessage.error('系统异常！更新失败');
            },
          );
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
