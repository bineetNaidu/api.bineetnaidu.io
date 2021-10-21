import { IsAccessableMiddleware } from './is-accessable.middleware';

describe('IsAccessableMiddleware', () => {
  it('should be defined', () => {
    expect(new IsAccessableMiddleware()).toBeDefined();
  });
});
