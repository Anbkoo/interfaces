import '@testing-library/jest-dom';

import {render} from '@testing-library/react';
import {AuthProvider} from "../AuthContext";
import {BrowserRouter} from "react-router-dom";
import About from "../About";


export const CustomRender = ({children}) =>
    <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter></AuthProvider>


test('loads and displays all fields', async () => {
    const {getByText} = render(<CustomRender><About/></CustomRender>);
    expect(getByText('This is blog, where you can create and delete blog posts, and comment them.')).toBeInTheDocument();
})
