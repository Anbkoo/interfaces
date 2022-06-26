import '@testing-library/jest-dom';

import {fireEvent, render} from '@testing-library/react';
import {AuthProvider} from "../AuthContext";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";


export const CustomRender = ({children}) =>
    <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter></AuthProvider>

const testBlog = {
    title: 'Blog title' + Math.random(),
    description: 'Blog description' + Math.random(),
}

const testComment = {
    description: 'Comment description' + Math.random(),
}

test('loads and displays add blog button', async () => {
    const {getByTestId} = render(<CustomRender><Blog/></CustomRender>);
    expect(getByTestId('open-post')).toBeInTheDocument();
});

test('opens form to add blog post', async () => {
    const {getByTestId, getByPlaceholderText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));
    expect(getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter description")).toBeInTheDocument();
});

test('closes form to add blog post', async () => {
    const {getByTestId, getByPlaceholderText, queryByPlaceholderText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));
    expect(getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter description")).toBeInTheDocument();
    userEvent.click(getByTestId('close-post'));
    expect(queryByPlaceholderText("Enter title")).not.toBeInTheDocument();
    expect(queryByPlaceholderText("Enter description")).not.toBeInTheDocument();
});


test('adds blog', async () => {
    const {getByTestId, getByPlaceholderText, getByText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));

    userEvent.type(getByPlaceholderText("Enter title"), testBlog.title);
    userEvent.type(getByPlaceholderText("Enter description"), testBlog.description);

    userEvent.click(getByTestId('add-post'));

    expect(getByText(testBlog.title)).toBeInTheDocument()
    expect(getByText(testBlog.description)).toBeInTheDocument()
});

test('deletes blog', async () => {
    const {getByTestId, getByPlaceholderText, getByText, queryByText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));

    userEvent.type(getByPlaceholderText("Enter title"), testBlog.title);
    userEvent.type(getByPlaceholderText("Enter description"), testBlog.description);

    userEvent.click(getByTestId('add-post'));

    expect(getByText(testBlog.title)).toBeInTheDocument()
    expect(getByText(testBlog.description)).toBeInTheDocument()

    userEvent.click(getByTestId('delete-post'));
    expect(queryByText(testBlog.title)).not.toBeInTheDocument()
    expect(queryByText(testBlog.description)).not.toBeInTheDocument()
});

test('adds comment to blog', async () => {
    const {getByTestId, getByPlaceholderText, getByText, queryByText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));

    userEvent.type(getByPlaceholderText("Enter title"), testBlog.title);
    userEvent.type(getByPlaceholderText("Enter description"), testBlog.description);

    userEvent.click(getByTestId('add-post'));

    expect(getByText(testBlog.title)).toBeInTheDocument()
    expect(getByText(testBlog.description)).toBeInTheDocument()

    userEvent.type(getByPlaceholderText("Leave your comment"), testComment.description);
    userEvent.click(getByTestId('send-comment'));

    expect(getByText(testComment.description)).toBeInTheDocument()
});

test('deletes comment from blog', async () => {
    const {getByTestId, getByPlaceholderText, getByText, queryByText} = render(<CustomRender><Blog/></CustomRender>);
    userEvent.click(getByTestId('open-post'));

    userEvent.type(getByPlaceholderText("Enter title"), testBlog.title);
    userEvent.type(getByPlaceholderText("Enter description"), testBlog.description);

    userEvent.click(getByTestId('add-post'));

    expect(getByText(testBlog.title)).toBeInTheDocument()
    expect(getByText(testBlog.description)).toBeInTheDocument()

    userEvent.type(getByPlaceholderText("Leave your comment"), testComment.description);
    userEvent.click(getByTestId('send-comment'));

    expect(getByText(testComment.description)).toBeInTheDocument()

    userEvent.click(getByTestId('delete-comment'));
    expect(queryByText(testComment.description)).not.toBeInTheDocument()

});