import { onMounted, ref } from 'vue';

import { loadTenantSetting } from '#/api';

export function getTenantSettings() {
  const tenantSettingsRef = ref();
  const tenantSettingsPropsRef = ref();

  onMounted(async () => {
    const formApi = tenantSettingsRef.value.getFormApi();
    await loadTenantSetting().then((ret) => {
      tenantSettingsPropsRef.value = ret;
      if (ret.tenantCode) {
        formApi.updateSchema([
          {
            fieldName: 'tenantCode',
            dependencies: {
              show: false,
            },
          },
        ]);
        formApi.setFieldValue('tenantCode', ret.tenantCode);
      }
    });
  });

  return {
    tenantSettingsRef,
    tenantSettingsPropsRef,
  };
}
