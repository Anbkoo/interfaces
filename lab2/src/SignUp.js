import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router";

const SignUp = () => {
    const navigate = useNavigate()

    const [state, setState] = useState({
        name: "",
        email: '',
        password: "", gender: "", dateOfBirth: ""
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const signUp = () => {
        navigate('/sign-in')
    }

    return (
        <Container className="mt-4" fluid="sm">
            <h4 className={"mb-4"}>
                Sign up
            </h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" onChange={handleChange} placeholder="Enter name"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control name="gender" onChange={handleChange} placeholder="Enter gender"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control name="dateOfBirth" data-testid="date-of-birth-input" onChange={handleChange}
                                  type="date"
                                  placeholder="Enter date of birth"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password"/>
                </Form.Group>

                <Button onClick={signUp} variant="primary">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;