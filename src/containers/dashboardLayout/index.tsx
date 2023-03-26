import { Link } from 'react-router-dom';
import { IBaseComponent } from 'utils/types';
import { Button, Layout, Menu, Space } from 'antd';
import { MenuProps } from 'rc-menu';
import { CustomBreadCrumbs, MenuItem } from 'components';

import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import Logo from 'assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import i18n from 'utils/localization';

const { Header, Content, Sider } = Layout;

export default function DashboardLayout({ children }: IBaseComponent) {
  const { t } = useTranslation(['dashboard']);
  const leftNavbarMenu: MenuProps['items'] = [
    {
      key: 'dashboard',

      label: (
        <Link to="/">
          <MenuItem label={t('dashboard:sidebar_menu:dashboard')} icon={<DashboardOutlined />} />
        </Link>
      ),
    },
    {
      key: 'todos',
      label: (
        <Link to="todos">
          <MenuItem label={t('dashboard:sidebar_menu:todos')} icon={<TeamOutlined />} />
        </Link>
      ),
    },
  ];
  return (
    <Layout className="flex h-screen flex-col gap-y-2 pb-2">
      <Header className="h-20 bg-white">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="pc-logo" className="h-[50px] w-[50px]" />
          <Space>
            Burak C.
            <Button
              size="small"
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}
            >
              {i18n.language}
            </Button>
          </Space>
        </div>
      </Header>
      <Layout className="flex gap-x-2">
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={leftNavbarMenu}
          />
        </Sider>
        <Layout className="bg-white p-5">
          <CustomBreadCrumbs />
          <Content className="m-0 min-h-max pt-5">
            <>{children}</>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
