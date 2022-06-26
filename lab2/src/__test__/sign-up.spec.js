import '@testing-library/jest-dom';

import {render} from '@testing-library/react';
import {AuthProvider} from "../AuthContext";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUp from "../SignUp";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUsedNavigate,
}));

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
    const {getByPlaceholderText, getByTestId} = render(<CustomRender><SignUp/></CustomRender>);
    expect(getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByTestId("date-of-birth-input")).toBeInTheDocument();
    expect(getByPlaceholderText('Enter gender')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter name')).toBeInTheDocument();
});

test('changes fields', async () => {
    const {getByPlaceholderText, getByTestId} = render(<CustomRender><SignUp/></CustomRender>);
    userEvent.type(getByPlaceholderText('Enter email'), testData.email)
    userEvent.type(getByPlaceholderText('Password'), testData.password)
    userEvent.type(getByTestId("date-of-birth-input"), testData.dateOfBirth)
    userEvent.type(getByPlaceholderText('Enter gender'), testData.gender)
    userEvent.type(getByPlaceholderText('Enter name'), testData.name)
    expect(getByPlaceholderText('Password')).toHaveValue(testData.password);
    expect(getByPlaceholderText('Enter email')).toHaveValue(testData.email);
    expect(getByTestId("date-of-birth-input")).toHaveValue(testData.dateOfBirth);
    expect(getByPlaceholderText('Enter name')).toHaveValue(testData.name);
    expect(getByPlaceholderText('Enter gender')).toHaveValue(testData.gender);
});

test('signs in', async () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<CustomRender><SignUp/></CustomRender>);
    userEvent.type(getByPlaceholderText('Enter email'), testData.email)
    userEvent.type(getByPlaceholderText('Password'), testData.password)
    userEvent.type(getByTestId("date-of-birth-input"), testData.dateOfBirth)
    userEvent.type(getByPlaceholderText('Enter gender'), testData.gender)
    userEvent.type(getByPlaceholderText('Enter name'), testData.name)
    userEvent.click(getByText('Submit'))
    expect(mockedUsedNavigate).toBeCalled()
});
