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
import About from './Pages/AboutPage/About';
import Category from './Pages/CategoryPage/Category';
import Service from './Pages/ServicePage/Service';
import SearchPage from './Pages/SearchPage/SearchPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/writeblog' element={<WriteBlog />} />
          <Route exact path='/showBlog/:id' element={<ShowBlog />} />
          <Route exact path='/category/:categoryname' element={<Category />} />
          <Route exact path='/service/:type' element={<Service />} />
          <Route exact path='/search/:search' element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
