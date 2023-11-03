import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import Book from "./pages/book/Book";
import NotFound from "./pages/notFound/NotFound";
import Signin from "./pages/signin/SignIn";
import Signup from "./pages/signup/Singup";
import Wishlist from "./pages/wishlist/Wishlist";
import AddNew from "./pages/addNew/AddNew";
import UpdateBook from "./pages/updateBook/UpdateBook";
import AuthRoute from "./components/authRoute/AuthRoute";
import AdminRoute from "./components/adminRoute/AdminRoute";
import UserInformation from "./pages/admin/userInFormation/UserInformation";
const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/userinformation",
    element: (
      <UserInformation />
        
    ),
  },
  {
    path: "/admin",
    element: (
       <AdminRoute />
  ),
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/book/:bookId",
    element: <Book />,
  },
  {
    path: "/update-book/:bookId",
    element: (
      <AuthRoute>
        <UpdateBook />
      </AuthRoute>
    ),
  },
  {
    path: "add-new",
    element: (
      <AuthRoute>
        <AddNew />
      </AuthRoute>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default App;
