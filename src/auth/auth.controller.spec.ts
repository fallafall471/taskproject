import 'reflect-metadata';
import { AuthController } from './auth.controller';
import { IS_PUBLIC_KEY } from './public.decorateur';

describe('AuthController', () => {
  it('marks login as public for the global JWT guard', () => {
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, AuthController.prototype.login),
    ).toBe(true);
  });
});
