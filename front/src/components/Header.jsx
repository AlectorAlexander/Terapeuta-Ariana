import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import NotificationsComponent from './NotificationComponent';
import LoginAndRegister from './user/LoginAndRegister';

function Header() {
  const router = useRouter();
  const [show, setOnHide] = useState(false);

  const onHide = () => {
    setOnHide(false);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Navbar className="header mt-0 animate__animated  animate__flipInX" expand="lg">
      <Navbar.Brand><Nav.Link onClick={() => handleNavigation('/')}>Início</Nav.Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end mx-5">
        <Nav>
          <Nav.Link onClick={() => handleNavigation('/terapias')}>Terapias</Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/blog')}>Blog</Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/contato')}>Contato</Nav.Link>
          <Nav.Link onClick={() => setOnHide(true)}>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand><Nav.Link><NotificationsComponent /></Nav.Link></Navbar.Brand>
      <LoginAndRegister show={show} onHide={onHide} />
    </Navbar>
  );
}

export default Header;
