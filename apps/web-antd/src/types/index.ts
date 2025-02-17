interface Ext {
  showCodeLogin: boolean;
  showForgetPassword: boolean;
  showQrcodeLogin: boolean;
  showRegister: boolean;
  showRememberMe: boolean;
  showThirdPartyLogin: boolean;
}

export interface SiteSettings {
  tenantCode: string;
  title: string;
  subTitle: string;
  logo: string;
  ext: Ext;
}
