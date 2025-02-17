import type { SiteSettings } from '#/types';

import { requestClient } from '#/api/request';

export * from './auth';
export * from './menu';
export * from './user';

/**
 * 获取当前初始化配置
 */
export async function loadTenantSetting() {
  return requestClient.get<SiteSettings>('/iam/plat/site-setting');
}
