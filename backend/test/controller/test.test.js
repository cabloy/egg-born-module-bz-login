const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe.only('[your tests start from here]', () => {
  it('[atom]', async () => {
    app.mockSession({});

    // atomClass info
    const atomClassModule = mockInfo().relativeName;
    const atomClassName = 'loginBackImage';

    // login as root
    await app
      .httpRequest()
      .post(mockUrl('/a/auth/passport/a-authsimple/authsimple'))
      .send({
        data: {
          auth: 'root',
          password: '123456',
        },
      });

    // create
    let result = await app
      .httpRequest()
      .post(mockUrl('/a/base/atom/write'))
      .send({
        atomClass: { module: atomClassModule, atomClassName },
        item: {
          atomName: 'test',
          description: 'this is a test',
        },
      });
    assert(result.body.code === 0);
    const keyDraft = result.body.data;

    // submit
    result = await app
      .httpRequest()
      .post(mockUrl('/a/base/atom/submit'))
      .send({
        key: keyDraft,
        atomClass: { module: atomClassModule, atomClassName },
      });
    assert(result.body.code === 0);
    const keyFormal = result.body.data.formal.key;

    // read
    result = await app.httpRequest().post(mockUrl('/a/base/atom/read')).send({
      key: keyFormal,
    });
    assert(result.body.code === 0);

    // delete
    result = await app.httpRequest().post(mockUrl('/a/base/atom/delete')).send({
      key: keyFormal,
    });
    assert(result.body.code === 0);
  });
});
