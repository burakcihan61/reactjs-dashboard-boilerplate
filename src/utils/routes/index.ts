export interface IAppRoute {
  [key: string]: {
    name: string;
    path: string;
    isPrivate: boolean;
  };
}
const routes: IAppRoute = {
  home: {
    name: 'dashboard',
    path: '/',
    isPrivate: true,
  },
  login: { name: 'login', path: '/login', isPrivate: false },
};

export default routes;
