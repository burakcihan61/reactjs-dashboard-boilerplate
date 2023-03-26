import { Button, Card } from 'antd';

import Logo from 'assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import './index.css';

export default function HomePage() {
  const {t} =useTranslation(["home"])
  return (
    <div className="page-home">
      <Card className="login-card">
        <img src={Logo} alt="lostcart-logo" />
        <hr className="my-10 w-full" />
        <Button type="primary" className="w-full">
          {t('login')}
        </Button>
      </Card>
    </div>
  );
}
