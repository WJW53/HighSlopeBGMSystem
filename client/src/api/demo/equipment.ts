import { defHttp } from '/@/utils/http/axios';

const equipmentUrl = '/equipmentInfo';
const equipmentListUrl = '/equipmentList';

export const getAllEquipment = (params) => defHttp.get({ url: equipmentUrl, params });
export const getAllEquipmentList = () => defHttp.get({ url: equipmentListUrl }); //主要是为了创建项目时关联的信息要拉取全量才行

export const getAnEquipment = (id, params) => defHttp.get({ url: `${equipmentUrl}/${id}`, params });

export const createEquipment = (params) => defHttp.post({ url: equipmentUrl, params });

export const deleteEquipment = (id) => defHttp.delete({ url: `${equipmentUrl}/${id}` });

export const updateEquipment = (id, params) =>
  defHttp.put({ url: `${equipmentUrl}/${id}`, params });

// export const isEquipmentExist = (params) =>
//   defHttp.post({ url: Api.isEquipmentExist, params }, { errorMessageMode: 'none' });
