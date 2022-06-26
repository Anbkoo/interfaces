import {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import NavBar from "./Navbar";
import useAuth from "./AuthContext";
import {ApiBaseUrl} from "./api";

const Blog = () => {
    const [isAdding, setIsAdding] = useState(false);

    const [blogs, setBlogs] = useState([])

    const [post, setPost] = useState({
        title: "", description: ""
    })

    const onPostChange = (e) => {
        setPost(post => ({...post, [e.target.name]: e.target.value}))
    }

    const onAddPost = () => {
        setBlogs(old => [{...post, author: 'ann@gmail.com', comments: [], _id: Math.random().toString()}, ...old])
        setIsAdding(false)
        setPost({
            title: "", description: ""
        })
    }

    const onAddComment = (postId, comment) => {
        setBlogs(old => old.map(post => post._id === postId ? {
            ...post,
            comments: [{
                description: comment.description,
                _id: Math.random().toString(),
                author: 'ann@gmail.com'
            }, ...post.comments],
        } : post))
    }

    const onDeletePost = (postId) => {
        setBlogs(old => old.filter(post => post._id !== postId))
    }

    const onDeleteComment = (commentId, postId) => {
        setBlogs(old => old.map(post => post._id === postId ? {
            ...post,
            comments: post.comments.filter(comment => comment._id !== commentId)
        } : post))
    }

    return (
        <>
            <NavBar/>
            <Container className={"pt-4"}>
                <div>
                    {!isAdding &&
                        <Button data-testid='open-post' onClick={() => setIsAdding(!isAdding)} variant="primary"
                                type="submit">
                            Add Post
                        </Button>}
                    {isAdding && <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={post.title} onChange={onPostChange} name={"title"}
                                          placeholder="Enter title"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={post.description} onChange={onPostChange} name={"description"}
                                          placeholder="Enter description"/>
                        </Form.Group>
                        <Button data-testid='add-post' onClick={onAddPost} variant="primary">
                            Add post
                        </Button>
                        <Button data-testid='close-post' onClick={() => setIsAdding(!isAdding)}
                                style={{marginLeft: '1em'}} variant="secondary">
                            Cancel
                        </Button>
                    </Form>}
                </div>
                {blogs.map((blog) => <BlogPost onDeletePost={onDeletePost} onDeleteComment={onDeleteComment}
                                               onAddComment={onAddComment}
                                               blogPost={blog} key={blog._id}/>)}
            </Container></>
    );
}

const BlogPost = ({blogPost, onAddComment, onDeleteComment, onDeletePost}) => {
    const [comment, setComment] = useState('')

    const addComment = () => {
        onAddComment(blogPost._id, {description: comment})
        setComment('')
    }

    return <Card className="mt-4 pb-4 position-relative">
        <Card.Body>
            <Button variant="danger" onClick={() => onDeletePost(blogPost._id)} data-testid='delete-post'
                    className="position-absolute"
                    style={{top: '1em', right: '1em'}}>Delete</Button>
            <Card.Title>{blogPost.title}</Card.Title>
            <Card.Text>
                {blogPost.description}
            </Card.Text>
            <Card.Text style={{fontSize: '0.8em', color: 'gray'}}>
                {blogPost.author}
            </Card.Text>
        </Card.Body>
        <Container style={{width: '95%', margin: '0 auto'}}>
            {blogPost.comments.map((comment) => <Card key={comment._id} className="mt-4 mb-4 position-relative">
                <Card.Body>
                    <Card.Title>{comment.author}</Card.Title>
                    <Card.Text>
                        {comment.description}
                    </Card.Text>
                    <Button data-testid='delete-comment' onClick={() => onDeleteComment(comment._id, blogPost._id)}
                            variant="danger"
                            className="position-absolute"
                            style={{top: '1em', right: '1em'}}>Delete</Button>
                </Card.Body>
            </Card>)}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control value={comment} onChange={(e) => setComment(e.target.value)}
                                  placeholder="Leave your comment"/>
                </Form.Group>
                <Button data-testid='send-comment' onClick={addComment} variant="primary">
                    Send
                </Button>
            </Form>
        </Container>

    </Card>
}

export default Blog;