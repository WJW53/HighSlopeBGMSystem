import { defHttp } from '/@/utils/http/axios';

const projectUrl = '/projectInfo';

export const getAllProject = (params) => defHttp.get({ url: projectUrl, params });

export const getAnProject = (id, params) => defHttp.get({ url: `${projectUrl}/${id}`, params });

export const createProject = (params) => defHttp.post({ url: projectUrl, params });

export const deleteProject = (id) => defHttp.delete({ url: `${projectUrl}/${id}` });

export const updateProject = (id, params) => defHttp.put({ url: `${projectUrl}/${id}`, params });

// export const isAccountExist = (account: string) =>
//   defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
