import { defHttp } from '/@/utils/http/axios';

const projectUrl = '/projectInfo';

export const getAllProject = (params) => defHttp.get({ url: projectUrl, params });

export const getAnProject = (params) => defHttp.get({ url: projectUrl, params });

export const createProject = (params) => defHttp.post({ url: projectUrl, params });

export const deleteProject = (params) => defHttp.delete({ url: projectUrl, params });

export const updataProject = (params) => defHttp.put({ url: projectUrl + params.id, params });

// export const isAccountExist = (account: string) =>
//   defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
