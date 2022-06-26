import React from 'react';
import NavBar from "./Navbar";
import {Container} from "react-bootstrap";

const About = () => (
    <>
        <NavBar/>
        <Container className={"pt-4"}>
            This is blog, where you can create and delete blog posts, and comment them.
        </Container>
    </>
);

export default About;