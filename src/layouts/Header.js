import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="vertical" theme="dark">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/customers">
        <Link to="/customers">
          <Icon type="user" />
          Customers
        </Link>
      </Menu.Item>
      <Menu.Item key="/products">
        <Link to="/products">
          <Icon type="gift" />
          Products
        </Link>
      </Menu.Item>
      <Menu.Item key="/sales">
        <Link to="/sales">
          <Icon type="dollar" />
          Sales
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
