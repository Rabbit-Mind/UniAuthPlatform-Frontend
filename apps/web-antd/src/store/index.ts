import type { SiteSettings } from '#/types';

import { defineStore } from 'pinia';

import { loadTenantSetting } from '#/api';

export * from './auth';

export const useIndexStore = defineStore('index', {
  state: (): SiteSettings => ({
    tenantCode: '',
    title: '',
    subTitle: '',
    logo: '',
    ext: {
      showCodeLogin: false,
      showForgetPassword: false,
      showQrcodeLogin: false,
      showRegister: false,
      showRememberMe: false,
      showThirdPartyLogin: false,
    },
  }),
  getters: {
    getSiteSettings: (state) => state,
  },
  actions: {
    async setSiteSettings() {
      const siteSettings: SiteSettings = await loadTenantSetting();
      this.tenantCode = siteSettings.tenantCode;
      this.title = siteSettings.title;
      this.subTitle = siteSettings.subTitle;
      this.logo = siteSettings.logo;
      this.ext.showCodeLogin = siteSettings.ext.showCodeLogin;
      this.ext.showForgetPassword = siteSettings.ext.showForgetPassword;
      this.ext.showQrcodeLogin = siteSettings.ext.showQrcodeLogin;
      this.ext.showRegister = siteSettings.ext.showRegister;
      this.ext.showRememberMe = siteSettings.ext.showRememberMe;
      this.ext.showThirdPartyLogin = siteSettings.ext.showThirdPartyLogin;
    },
  },
});
