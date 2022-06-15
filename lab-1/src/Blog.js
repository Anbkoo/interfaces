import {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import NavBar from "./Navbar";
import useAuth from "./AuthContext";
import {ApiBaseUrl} from "./api";

const Blog = () => {
    const {loggedUser} = useAuth();
    const [isAdding, setIsAdding] = useState(false);

    const [blogs, setBlogs] = useState([])

    const [post, setPost] = useState({
        title: "", description: ""
    })

    useEffect(() => {
        fetch(`${ApiBaseUrl}/blog`, {
            headers: {Authorization: localStorage.getItem('Authorization')}
        }).then(res => res.json()).then((blogs) => setBlogs(blogs))
    }, []);

    const onPostChange = (e) => {
        setPost(post => ({...post, [e.target.name]: e.target.value}))
    }

    const onAddPost = () => {
        fetch(`${ApiBaseUrl}/blog`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((newPost) => setBlogs(old => [newPost, ...old]))

        setIsAdding(false)
        setPost({
            title: "", description: ""
        })
    }

    const onAddComment = (postId, comment) => {
        fetch(`${ApiBaseUrl}/blog/comment`, {
            method: 'POST',
            body: JSON.stringify({
                description: comment.description, postId
            }),
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((newPost) => setBlogs(old => old.map(post => post._id === postId ? newPost : post)))
    }

    const onDeletePost = (postId) => {
        fetch(`${ApiBaseUrl}/blog/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(() => setBlogs(old => old.filter(post => post._id !== postId)))
    }

    const onDeleteComment = (commentId, postId) => {
        fetch(`${ApiBaseUrl}/blog/comment/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((newPost) => setBlogs(old => old.map(post => post._id === postId ? newPost : post)))
    }

    return (
        <>
            <NavBar/>
            <Container className={"pt-4"}>
                <div>
                    {!isAdding && <Button onClick={() => setIsAdding(!isAdding)} variant="primary" type="submit">
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
                        <Button onClick={onAddPost} variant="primary" type="submit">
                            Add post
                        </Button>
                        <Button onClick={() => setIsAdding(!isAdding)} style={{marginLeft: '1em'}} variant="secondary">
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
            <Button variant="danger" onClick={() => onDeletePost(blogPost._id)} className="position-absolute"
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
                    <Button onClick={() => onDeleteComment(comment._id, blogPost._id)} variant="danger"
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
                <Button onClick={addComment} variant="primary">
                    Send
                </Button>
            </Form>
        </Container>

    </Card>
}

export default Blog;