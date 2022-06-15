import {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "./Navbar";
import {ApiBaseUrl} from "./api";

const Profile = () => {
    const [state, setState] = useState({
        name: "",
        email: '',
        gender: "", dateOfBirth: ""
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }


    const updateProfile = () => {
        const {name, gender, dateOfBirth} = state
        fetch(`${ApiBaseUrl}/profile`, {
            method: 'POST',
            body: JSON.stringify({name, gender, dateOfBirth}),
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((newUser) => setState(newUser))
    }


    useEffect(() => {
        fetch(`${ApiBaseUrl}/profile`, {
            headers: {Authorization: localStorage.getItem('Authorization')}
        }).then(res => res.json()).then((profile) => setState(profile))
    }, []);


    return (
        <>
            <NavBar/>
            <Container className="mt-4" fluid="sm">
                <h4 className={"mb-4"}>
                    Profile
                </h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={state.name} onChange={handleChange} placeholder="Enter name"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control name="gender" value={state.gender} onChange={handleChange}
                                      placeholder="Enter gender"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" name="dateOfBirth" value={state.dateOfBirth} onChange={handleChange}
                                      placeholder="Enter date of birth"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control disabled={true} type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Button variant="primary" onClick={updateProfile}>
                        Submit
                    </Button>
                </Form>
            </Container>  </>
    );
}

export default Profile;