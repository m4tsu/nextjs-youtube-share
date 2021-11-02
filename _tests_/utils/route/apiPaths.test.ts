import { ApiPaths, getFetchKey } from '@/utils/route/apiPaths';

describe('getFetchKey()', () => {
  it('paramsを全て渡した場合、期待した文字列が返ること', () => {
    const userName = 'hoge';
    const postId = 333;
    expect(getFetchKey({ path: '/api/auth/me' })).toBe('/api/auth/me');
    expect(
      getFetchKey({
        path: '/api/users/[userName]/posts/[postId]',
        params: { userName, postId },
      })
    ).toBe(`/api/users/${userName}/posts/${postId}`);
  });

  describe('paramsが必要なrouteで、params に null | undefined を渡したとき', () => {
    it('paramsの一つにundefinedを渡したときに nullが返されること', () => {
      const userName = undefined;
      const postId = 333;
      expect(
        getFetchKey({
          path: '/api/users/[userName]/posts/[postId]',
          params: { userName, postId },
        })
      ).toBe(null);
    });
    it('paramsの一つにnullを渡したときに nullが返されること', () => {
      const userName = 1;
      const postId = null;
      expect(
        getFetchKey({
          path: '/api/users/[userName]/posts/[postId]',
          params: { userName, postId },
        })
      ).toBe(null);
    });
  });
});
