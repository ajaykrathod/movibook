import logo from './logo.svg';
import './App.css';
import Header from 'components/Header/Header';
import Landing from 'components/Landing/Landing';

// function App() {
//   return (
//     <div className="App">
//       {/* <Header/>
//       <Landing/> */}
//       <Login/>
//     </div>
//   );
// }

// export default App;

// import { useRoutes } from "react-router-dom";
// import Home from 'components/Home/Home';
// import Movies from 'components/Movies/Movies';
// import About from 'components/About/About';
// import Books from 'components/Books/Books';

// function App() {
//   let element = useRoutes([
//     {
//       path: "/",
//       element: <Home />,
//       children: [
//         {
//           path: "/movies",
//           element: <Movies />,
//         },
//         { path: "/login", element: <Login /> },
//       ],s
//     },
//     { path: "/about", element: <About /> },
//     { path: "/books", element: <Books /> },
//   ]);

//   return element;
// }

// export default App;

import Login from 'components/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from 'components/Home/Home';
import About from 'components/About/About';
import Movies from 'components/Movies/Movies';
import Books from 'components/Books/Books';
import Forgot from 'components/Forgot/Forgot';
import SignUp from 'components/SignUp/SignUp';
import Contact from 'components/Contact/Contact';
import Layout from 'components/Layout/Layout';
import { ChangeFeature } from 'Context/NavigationContext';
import reducer,{initialState} from 'Context/reducer';
import { useEffect } from 'react';
function App({callback}) {
  
  useEffect(() => {
  },[])
  return (
    <>
      <ChangeFeature reducer={reducer} initialState={initialState}>
       <Layout>
      <BrowserRouter>
        <Routes>
          
          <Route path="/movies" element={<Movies />}/>
          <Route path="/books" element={<Books />}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />  
          <Route path="/login" element={<Login />} />
          <Route path='/forgot' element={<Forgot/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
      </Layout>
      </ChangeFeature>
      </>
  );
}

export default App;
