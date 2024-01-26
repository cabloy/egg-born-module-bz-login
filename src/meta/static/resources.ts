const resources = [
  // menu
  {
    atomName: 'LoginBackImages',
    atomStaticKey: 'listLoginBackImage',
    atomRevision: 1,
    atomCategoryId: 'a-base:menu.BasicProfile',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'loginBackImage',
      atomAction: 'read',
    }),
    resourceIcon: ':outline:login-outline',
    appKey: 'a-appbooster:appSystem',
    resourceRoles: 'template.system',
  },
];
export default resources;
