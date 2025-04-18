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
    <Navbar className="header pe-4 ps-4 mt-0 animate__animated  animate__flipInX" expand="lg">
      <Navbar.Brand className='ms-5'><Nav.Link onClick={() => handleNavigation('/')}>Início</Nav.Link></Navbar.Brand>
      <div className='reverta'> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end mx-5">
          <Nav>
            <Nav.Link onClick={() => handleNavigation('/terapias')}>Terapias</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/blog')}>Blog</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/contato')}>Contato</Nav.Link>
            <Nav.Link data-testId="login-link" onClick={() => setOnHide(true)}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand className='me-5'><Nav.Link><NotificationsComponent /></Nav.Link></Navbar.Brand>
      </div>

      <LoginAndRegister show={show} onHide={onHide} />
    </Navbar>
  );
}

export default Header;
