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
          <NavItem eventKey={2} href="#">
            イラスト線画抽出器（Comming Soon）
          </NavItem>
          <NavItem eventKey={1} href="https://twitter.com/shopon1201">
            お問い合わせ・バグ報告(@shopon1201)
          </NavItem>
        </Nav>
      </Navbar>
    );
}

export default NavigationBar;