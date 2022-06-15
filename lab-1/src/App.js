import 'bootstrap/dist/css/bootstrap.min.css';
import Blog from "./Blog";
import {AuthProvider} from "./AuthContext";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import About from "./About";
import Profile from "./Profile";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/about" element={<About/>}/></Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
