<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';

import { getTenantSettings } from './login';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '租户编码',
      },
      dependencies: {
        show: true,
        triggerFields: [''],
      },
      fieldName: 'tenantCode',
      label: '租户编码',
      rules: z
        .string()
        .max(6, { message: '租户编码不能大于6位' })
        .min(4, { message: '租户编码不能小于4位' }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ];
});

const { tenantSettingsRef, tenantSettingsPropsRef } = getTenantSettings();
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
    ref="tenantSettingsRef"
    :show-code-login="tenantSettingsPropsRef?.showCodeLogin"
    :show-forget-password="tenantSettingsPropsRef?.showForgetPassword"
    :show-qrcode-login="tenantSettingsPropsRef?.showQrcodeLogin"
    :show-register="tenantSettingsPropsRef?.showRegister"
    :show-remember-me="tenantSettingsPropsRef?.showRememberMe"
    :show-third-party-login="tenantSettingsPropsRef?.showThirdPartyLogin"
    :sub-title="tenantSettingsPropsRef?.subTitle"
    :title="tenantSettingsPropsRef?.title"
  />
</template>
