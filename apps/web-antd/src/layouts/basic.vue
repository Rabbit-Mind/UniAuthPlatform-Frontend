<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';

import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import {
  DEFAULT_HOME_PATH,
  LOGIN_PATH,
  RM_DOC_URL,
  UA_GITHUB_URL,
} from '@vben/constants';
import { useWatermark } from '@vben/hooks';
import { BookOpenText, CircleHelp, MdiGithub } from '@vben/icons';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { VbenLogo } from '@vben-core/shadcn-ui';

import { checkTokenApi } from '#/api';
import { $t } from '#/locales';
import { useAuthStore, useIndexStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

const notifications = ref<NotificationItem[]>([
  {
    avatar: 'https://avatar.vercel.sh/vercel.svg?text=VB',
    date: '3小时前',
    isRead: true,
    message: '描述信息描述信息描述信息',
    title: '收到了 14 份新周报',
  },
  {
    avatar: 'https://avatar.vercel.sh/1',
    date: '刚刚',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '朱偏右 回复了你',
  },
  {
    avatar: 'https://avatar.vercel.sh/1',
    date: '2024-01-01',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '曲丽丽 评论了你',
  },
  {
    avatar: 'https://avatar.vercel.sh/satori',
    date: '1天前',
    isRead: false,
    message: '描述信息描述信息描述信息',
    title: '代办提醒',
  },
]);

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const router = useRouter();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

const menus = computed(() => [
  {
    handler: () => {
      openWindow(RM_DOC_URL, {
        target: '_blank',
      });
    },
    icon: BookOpenText,
    text: $t('ui.widgets.document'),
  },
  {
    handler: () => {
      openWindow(UA_GITHUB_URL, {
        target: '_blank',
      });
    },
    icon: MdiGithub,
    text: 'GitHub',
  },
  {
    handler: () => {
      openWindow(`${UA_GITHUB_URL}/issues`, {
        target: '_blank',
      });
    },
    icon: CircleHelp,
    text: $t('ui.widgets.qa'),
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

function handleNoticeClear() {
  notifications.value = [];
}

function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
}
watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);

const tokenCheckInterval = setInterval(check_token, 5000);

async function check_token() {
  try {
    const is_token: any = await checkTokenApi();
    if (is_token.code === 401) {
      if (router.currentRoute.value.fullPath === DEFAULT_HOME_PATH) {
        await router.push(LOGIN_PATH);
      } else {
        router.currentRoute.value.query.redirect =
          router.currentRoute.value.fullPath;
        await router.push(
          `${LOGIN_PATH}?redirect=${decodeURIComponent(
            router.currentRoute.value.fullPath,
          )}`,
        );
      }

      clearInterval(tokenCheckInterval);
    }
  } catch {
    // 不作任何处理，否则会重复报错
  }
}

const indexStore = useIndexStore();
const siteSettings = indexStore.getSiteSettings;
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #logo>
      <VbenLogo
        v-if="preferences.logo.enable"
        :src="siteSettings.logo"
        :text="siteSettings.title"
      />
    </template>
    <template #user-dropdown>
      <UserDropdown
        :avatar="userStore.userInfo?.avatar"
        :menus
        :text="userStore.userInfo?.nickName"
        :description="`${$t('layouts.basic.userId')}: ${userStore.userInfo?.userId}`"
        :tag-text="$t(userStore.userInfo?.label ?? '')"
        @logout="handleLogout"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @make-all="handleMakeAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
