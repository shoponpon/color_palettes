import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

export default class NavigationBar extends Component {
  render(props) {
    return (
      <Navbar style={{ marginBottom: 0 }}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="">カラーパレットこんばーた（β）</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">
              イラスト線画抽出器（Comming Soon）
          </NavItem>
            <NavItem eventKey={1} href="https://twitter.com/shopon1201">
              お問い合わせ・バグ報告(@shopon1201)
          </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}