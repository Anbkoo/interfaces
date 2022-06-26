import {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "./Navbar";

const Profile = () => {
    const [state, setState] = useState({
        name: "Anna",
        email: 'ann123@gmail.com',
        gender: "Woman", dateOfBirth: "2022-06-16"
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const updateProfile = () => {
        const {name, gender, dateOfBirth} = state
        setState(prev => ({...prev, name, gender, dateOfBirth}))
    }

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
                        <Form.Control type="date" data-testid="date-of-birth-input" name="dateOfBirth"
                                      value={state.dateOfBirth} onChange={handleChange}
                                      placeholder="Enter date of birth"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={state.email} disabled={true} type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Button variant="primary" onClick={updateProfile}>
                        Submit
                    </Button>
                </Form>
            </Container>  </>
    );
}

export default Profile;