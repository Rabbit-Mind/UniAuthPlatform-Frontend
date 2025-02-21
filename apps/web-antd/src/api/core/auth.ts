import { cloneDeep } from '@vben/utils';

import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
    tenantCode?: string;
    loginType?: string;
    code?: string;
    clientId?: string;
    clientSecret?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface TokenInfo {
    tokenName: string; // token名称
    tokenValue: string; // token值
    isLogin: boolean; // 此token是否已经登录
    loginId: string; // 此token对应的LoginId，未登录时为null
    loginType: string; // 账号类型标识
    tokenTimeout: number; // token剩余有效期 (单位: 秒)
    sessionTimeout: number; // Account-Session剩余有效时间 (单位: 秒)
    tokenSessionTimeout: number; // Token-Session剩余有效时间 (单位: 秒) (-2表示系统中不存在这个缓存)
    tokenActiveTimeout: number; // token 距离被冻结还剩的时间 (单位: 秒)
    loginDevice: string; // 登录设备类型
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  data = cloneDeep(data);
  data.loginType = 'password';
  data.clientId = 'pc-web';
  data.clientSecret = 'pc-web';
  return requestClient.post<AuthApi.LoginResult>('/iam/token/login', data);
}

export async function checkTokenApi() {
  return requestClient.get<AuthApi.TokenInfo>('/iam/token/check_token');
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.delete('/iam/token/logout');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/iam/token/func_permissions');
}
