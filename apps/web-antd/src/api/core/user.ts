import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/iam/token/userinfo');
}

export async function getUserByIds(values: any) {
  const data = Array.isArray(values[0]) ? values[0] : values;
  return requestClient.post<any>('/iam/users/ids', data);
}
