import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">ASMB</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#events">Events</Nav.Link>
          <Nav.Link href="#users">Users</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <br />
    </div>

  )
}

export default AppNavbar;