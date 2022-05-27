import { defHttp } from '/@/utils/http/axios';

const stationUrl = '/stationInfo';
const stationListUrl = '/stationList';

export const getAllStation = (params) => defHttp.get({ url: stationUrl, params });
export const getAllStationList = () => defHttp.get({ url: stationListUrl }); //主要是为了创建项目时关联的信息要拉取全量才行

export const getAnStation = (id, params) => defHttp.get({ url: `${stationUrl}/${id}`, params });

export const createStation = (params) => defHttp.post({ url: stationUrl, params });

export const deleteStation = (id) => defHttp.delete({ url: `${stationUrl}/${id}` });

export const updateStation = (id, params) => defHttp.put({ url: `${stationUrl}/${id}`, params });

// export const isStationExist = (params) =>
//   defHttp.post({ url: Api.isStationExist, params }, { errorMessageMode: 'none' });
