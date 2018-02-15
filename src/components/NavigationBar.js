import React from 'react';
import { 
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

const NavigationBar = (props) => {
    return (
        <Navbar style={{marginBottom:0}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">カラーパレットこんばーた</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            お問い合わせ・バグ報告
          </NavItem>
          <NavItem eventKey={2} href="#">
            新規登録
          </NavItem>
          <NavItem eventKey={2} href="#">
            ログイン
          </NavItem>
        </Nav>
      </Navbar>
    );
}

export default NavigationBar;