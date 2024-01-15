import { RefreshTokenMiddleware } from './refresh-token.middleware';

describe('RefreshTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new RefreshTokenMiddleware()).toBeDefined();
  });
});
