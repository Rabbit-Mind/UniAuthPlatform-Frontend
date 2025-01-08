import type { RouteRecordRaw } from 'vue-router';

import { RM_DOC_URL, RM_LOGO_URL, UA_GITHUB_URL } from '@vben/constants';

import { BasicLayout, IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'dot',
      icon: RM_LOGO_URL,
      order: 9999,
      title: $t('about.title'),
    },
    name: 'About',
    path: '/about',
    children: [
      {
        name: 'Project',
        path: '/about/project',
        component: () => import('#/views/_core/about/index.vue'),
        meta: {
          icon: 'lucide:copyright',
          title: $t('about.project'),
        },
      },
      {
        name: 'Document',
        path: '/about/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: RM_DOC_URL,
          title: $t('about.document'),
        },
      },
      {
        name: 'Github',
        path: '/about/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: UA_GITHUB_URL,
          title: 'Github',
        },
      },
    ],
  },
];

export default routes;
