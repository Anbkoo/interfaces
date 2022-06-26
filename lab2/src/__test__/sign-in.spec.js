import '@testing-library/jest-dom';

import {render} from '@testing-library/react';
import SignIn from "../SignIn";
import {AuthProvider} from "../AuthContext";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
}

test('loads and displays all fields', async () => {
    const {getByPlaceholderText} = render(<CustomRender><SignIn/></CustomRender>);
    expect(getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
});

test('changes fields', async () => {
    const {getByPlaceholderText} = render(<CustomRender><SignIn/></CustomRender>);
    userEvent.type(getByPlaceholderText('Enter email'), testData.email)
    userEvent.type(getByPlaceholderText('Password'), testData.password)
    expect(getByPlaceholderText('Password')).toHaveValue(testData.password);
    expect(getByPlaceholderText('Enter email')).toHaveValue(testData.email);
});

test('signs in', async () => {
    const {getByText, queryByPlaceholderText, getByPlaceholderText} = render(<CustomRender><SignIn/></CustomRender>);
    userEvent.type(getByPlaceholderText('Enter email'), testData.email)
    userEvent.type(getByPlaceholderText('Password'), testData.password)
    userEvent.click(getByText('Submit'))
    expect(mockedUsedNavigate).toBeCalled()
});
