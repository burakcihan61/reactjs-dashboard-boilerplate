export { default as appTheme } from './theme';
export { default as routes } from './routes';
export { default as http } from './http';

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}


export enum QUERY_KEY_TYPES {
  todos = 'todos',
  detail = 'detail',
}
