import { IncomingMessage } from 'http';
import createHttpError from 'http-errors';
import { RequestWithUserSession } from 'src/types/as';

export function Authentication(): MethodDecorator {
  return function (
    target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const childFunction: () => void = descriptor.value;

    descriptor.value = function value(...args: any[]) {
      const req: RequestWithUserSession = args.find(
        (arg) => arg instanceof IncomingMessage,
      );

      if (!req || !req.user) {
        throw new createHttpError.Unauthorized();
      }

      return childFunction.apply(this, args);
    };
    return descriptor;
  };
}
