import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = () => (
    <Navbar bg="primary" variant="dark">
        <Container>
            <Link to="/blog" className="text-white" style={{marginRight: '1em'}}><h5>Blog</h5></Link>
            <Nav className="me-auto">
                <Link className="text-white" style={{marginRight: '1em'}} to="/about">About</Link>
                <Link className="text-white" to="/profile">Profile</Link>
            </Nav>
        </Container>
    </Navbar>
);

export default NavBar;