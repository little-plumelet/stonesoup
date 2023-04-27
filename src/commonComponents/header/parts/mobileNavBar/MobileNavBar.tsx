import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { NavBar } from '../navBar';

export function MobileNavBar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        data-testid="burger-menu"
        onClick={showDrawer}
        icon={<MenuOutlined />}
        shape="circle"
      />
      <Drawer placement="top" open={open} onClose={handleClose}>
        <NavBar
          navStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        />
      </Drawer>
    </>
  );
}
