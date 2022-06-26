import '@testing-library/jest-dom';

import {fireEvent, render} from '@testing-library/react';
import {AuthProvider} from "../AuthContext";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Profile from "../Profile";


export const CustomRender = ({children}) =>
    <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter></AuthProvider>

const testData = {
    email: 'ann@gmail.com',
    password: 'password',
    name: 'Ann',
    gender: 'Woman',
    dateOfBirth: "2022-06-16"
}

test('loads and displays all fields', async () => {
    const {getByPlaceholderText, getByTestId} = render(<CustomRender><Profile/></CustomRender>);
    expect(getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(getByTestId("date-of-birth-input")).toBeInTheDocument();
    expect(getByPlaceholderText('Enter gender')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter name')).toBeInTheDocument();
});

test('changes fields', async () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(<CustomRender><Profile/></CustomRender>);
    fireEvent.change(getByPlaceholderText('Enter name'), {target: {name: 'name', value: testData.name}})
    fireEvent.change(getByTestId("date-of-birth-input"),
        {
            target: {
                name: 'dateOfBirth',
                value: testData.dateOfBirth
            }

        })
    fireEvent.change(getByPlaceholderText('Enter gender'), {target: {name: 'gender', value: testData.gender}})
    userEvent.click(getByText('Submit'))

    expect(getByPlaceholderText('Enter email')).toBeDisabled();
    expect(getByTestId("date-of-birth-input")).toHaveValue(testData.dateOfBirth);
    expect(getByPlaceholderText('Enter name')).toHaveValue(testData.name);
    expect(getByPlaceholderText('Enter gender')).toHaveValue(testData.gender);
});

test('saves info', async () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<CustomRender><Profile/></CustomRender>);
    fireEvent.change(getByPlaceholderText('Enter name'), {target: {name: 'name', value: testData.name}})
    fireEvent.change(getByTestId("date-of-birth-input"), {
        target: {
            name: 'dateOfBirth',
            value: testData.dateOfBirth
        }

    })
    fireEvent.change(getByPlaceholderText('Enter gender'), {target: {name: 'gender', value: testData.gender}})

    userEvent.click(getByText('Submit'))
    expect(getByPlaceholderText('Enter email')).toBeDisabled();
    expect(getByTestId("date-of-birth-input")).toHaveValue(testData.dateOfBirth);
    expect(getByPlaceholderText('Enter name')).toHaveValue(testData.name);
    expect(getByPlaceholderText('Enter gender')).toHaveValue(testData.gender);
});
