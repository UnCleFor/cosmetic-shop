// import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage/HomePage'
// import OrderPage from './pages/OrderPage/OrderPage'
// import ProductPage from './pages/ProductPage/ProductPage'
// import routes from './routes'

// function App() {

//   return (
//     <div>
//       <Router>
//         <Routes>
//           {routes.map((route) => (
//             <Route key={route.path} path={route.path} element={route.element} />
//           ))}
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  );
}
