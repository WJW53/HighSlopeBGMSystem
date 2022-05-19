import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

interface IUploadConfig {
  id: string;
  suffixPath: string;
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  config: IUploadConfig,
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: `${uploadUrl}/${config.suffixPath}/${config.id}`,
      onUploadProgress,
    },
    params,
  );
}
