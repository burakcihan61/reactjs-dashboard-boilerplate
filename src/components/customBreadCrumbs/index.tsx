import { useMemo } from 'react';
import { Breadcrumb } from 'antd';

import { useTranslation } from 'react-i18next';
import { Link, useLocation, useMatch, useParams, Params } from 'react-router-dom';
import { routes } from 'utils';

export default function CustomBreadCrumbs() {
  const { t } = useTranslation(['routes']);
  const { pathname } = useLocation();
  const match = useMatch(pathname);
  const params = useParams();

  const crumbs = useMemo(
    () =>
      Object.entries(routes)
        .map((item) => ({ ...item[1] }))
        .filter(({ isPrivate }) => isPrivate)
        .map(({ path, ...rest }) => ({
          path: mergeParamWithLink(path, params),
          ...rest,
        }))
        .filter(({ path }) => match?.pattern.path.includes(path))
        .map(({ path, name }) => ({
          path,
          title: t(`routes:${name}`),
          breadcrumbName: t(`routes:${name}`),
        })),
    [params, match, t]
  );

  return <Breadcrumb routes={crumbs} itemRender={CustomLinkMapper} />;
}
function CustomLinkMapper(route: any, params: any, routes: any) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.title}</span> : <Link to={route.path}>{route.title}</Link>;
}

const mergeParamWithLink = (path: string, params: Readonly<Params<string>>) => {
  return !!Object.keys(params).length
    ? Object.keys(params).reduce(
        (path, param) => path.replace(`:${param}`, params[param] || ''),
        path
      )
    : path;
};
