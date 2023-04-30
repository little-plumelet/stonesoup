import {
  DownOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Divider, Dropdown, Space, Typography } from 'antd';
import { MOBILE_SCREEN_WIDTH_BREACKPOINT } from '../../constants';
import { routes } from '../../constants-routes';
import { useVeiwPort } from '../../customHooks/useViewPort';
import style from './style.module.css';
import { navItems, networkItems } from './utils';

export function Footer() {
  const { width } = useVeiwPort();

  return (
    <footer
      className={style.footer}
      style={{ backgroundColor: 'var(--color-light-gray)' }}
    >
      <div className={style.footerBlock}>
        <div className={style.logoBlock}>
          <h2 className={style.logo}>Stonesoup</h2>
          <p className={style.logoContent}>
            Indulge in culinary magic with tantalizing recipes and the
            enchanting tale of Stone Soup, where flavors blend like a fairytale
            come true.
          </p>
        </div>
        {width >= MOBILE_SCREEN_WIDTH_BREACKPOINT && (
          <div className={style.navBlock}>
            <nav className={style.nav}>
              <p>{navItems.title}</p>
              {navItems.items?.map((item) => item.label)}
            </nav>
            <nav className={style.nav}>
              <p>{networkItems.title}</p>
              {networkItems.items?.map((item) => item.label)}
            </nav>
          </div>
        )}
        {width < MOBILE_SCREEN_WIDTH_BREACKPOINT && (
          <>
            <Dropdown
              menu={{
                selectable: true,
                items: navItems.items,
                defaultSelectedKeys: [routes.home.title],
              }}
              placement="bottomLeft"
              arrow
            >
              <Typography.Link>
                <Space className={style.navDropDownButton}>
                  {navItems.title}
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
            <Dropdown
              menu={{
                selectable: true,
                items: networkItems.items,
                defaultSelectedKeys: [routes.home.title],
              }}
              placement="bottomLeft"
              arrow
            >
              <Typography.Link>
                <Space className={style.navDropDownButton}>
                  {networkItems.title}
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
          </>
        )}
      </div>
      {width >= MOBILE_SCREEN_WIDTH_BREACKPOINT && <Divider />}
      <div className={style.footerBlock}>
        <p className={style.copyright}>
          &#169; 2023 Stonesoup - all rights reserved
        </p>
        <div className={style.socialNetBlock}>
          <InstagramOutlined className={style.icon} />
          <FacebookOutlined className={style.icon} />
          <YoutubeOutlined className={style.icon} />
        </div>
      </div>
    </footer>
  );
}
