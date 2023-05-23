import { ExceptionResponse } from './exception.response';

export function isResponseObject(
  data: string | object,
): data is ExceptionResponse {
  if (!data) return false;

  const object = data as ExceptionResponse;
  return object.message !== undefined && object.statusCode !== undefined;
}
