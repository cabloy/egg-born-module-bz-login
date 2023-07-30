module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    layouts: {
      table: {
        blocks: {
          items: {
            columns: [
              {
                dataIndex: 'atomName',
                title: 'Atom Name',
                align: 'left',
                renderType: 'atomName',
              },
              {
                dataIndex: 'backImage',
                title: 'BackImage',
                align: 'center',
                renderType: 'image',
                params: {
                  size: {
                    height: 36,
                  },
                },
              },
              {
                dataIndex: 'isCurrent',
                title: 'IsCurrent',
                align: 'center',
                component: {
                  module: 'bz-login',
                  name: 'listLayoutTableCellIsCurrent',
                },
              },
              {
                dataIndex: 'userIdCreated',
                title: 'Creator',
                align: 'left',
                renderType: 'userName',
              },
              {
                dataIndex: 'atomCreatedAt',
                title: 'Created Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: 'atomUpdatedAt',
                title: 'Modification Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'LoginBackImage',
    atomStaticKey: 'layoutAtomListLoginBackImage',
    atomRevision: 6,
    description: '',
    layoutTypeCode: 3,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};
