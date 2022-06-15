import {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {ApiBaseUrl} from "./api";
import {useNavigate} from "react-router";
import useAuth from "./AuthContext";

const SignIn = () => {
    const navigate = useNavigate()
    const {setLoggedUser} = useAuth()
    const [state, setState] = useState({
        email: '',
        password: "",
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const signIn = () => {
        fetch(`${ApiBaseUrl}/sign-in`, {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((res) => {
            setLoggedUser(res)
            console.log(res)
            localStorage.setItem('Authorization', res.token)
            navigate('/blog')
        })
    }


    return (
        <Container className="mt-4" fluid="sm">
            <h4 className={"mb-4"}>
                Sign In
            </h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password"/>
                </Form.Group>

                <Button onClick={signIn} variant="primary">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default SignIn;