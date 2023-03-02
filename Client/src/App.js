import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import WriteBlog from './Pages/writeBlog/WriteBlog'
import ShowBlog from './Pages/showBlog/ShowBlog';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/writeblog' element={<WriteBlog />} />
          <Route exact path='/showBlog/:id' element={<ShowBlog />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
