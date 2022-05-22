import { Result } from '../utils';

const fakeUserInfo = {
  id: '1',
  account: 'vben',
  nickname: 'Vben Admin',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  role: [
    {
      roleName: 'Super Admin',
      roleValue: 'super',
    },
  ],
};
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo);
  }

  async getUserInfoById() {
    return Result.success(fakeUserInfo);
  }
}
