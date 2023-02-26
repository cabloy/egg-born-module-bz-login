module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // menu
    {
      atomName: 'Create LoginBackImage',
      atomStaticKey: 'createLoginBackImage',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.Create',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'loginBackImage',
        atomAction: 'create',
      }),
      resourceIcon: '::add',
      appKey: 'a-appbooster:appGeneral',
      resourceRoles: 'authenticated',
    },
    {
      atomName: 'LoginBackImage List',
      atomStaticKey: 'listLoginBackImage',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.List',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'loginBackImage',
        atomAction: 'read',
      }),
      resourceIcon: ':outline:data-list-outline',
      appKey: 'a-appbooster:appGeneral',
      resourceRoles: 'authenticated',
    },
  ];
  return resources;
};
