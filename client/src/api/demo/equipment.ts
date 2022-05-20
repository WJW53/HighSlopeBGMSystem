import { defHttp } from '/@/utils/http/axios';

const equipmentUrl = '/equipmentInfo';

export const getAllEquipment = (params) => defHttp.get({ url: equipmentUrl, params });

export const getAnEquipment = (id, params) => defHttp.get({ url: `${equipmentUrl}/${id}`, params });

export const createEquipment = (params) => defHttp.post({ url: equipmentUrl, params });

export const deleteEquipment = (id) => defHttp.delete({ url: `${equipmentUrl}/${id}` });

export const updateEquipment = (id, params) =>
  defHttp.put({ url: `${equipmentUrl}/${id}`, params });

// export const isEquipmentExist = (params) =>
//   defHttp.post({ url: Api.isEquipmentExist, params }, { errorMessageMode: 'none' });
