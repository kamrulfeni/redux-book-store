import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./adminHeader.css";
import { useAppDispatch } from "../../redux/hooks";
import { addUser } from "../../redux/features/user/userSlice";
import { usePostLogoutMutation } from "../../redux/features/user/userApi";

function AdminHeader() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = usePostLogoutMutation(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logoutHandler = async (): Promise<void> => {
    localStorage.clear();
    setIsLogin(false);
    navigate("/signin");
    dispatch(addUser(null));
    await logout({});
  };

  return (
    <Navbar expand="md" className="bg-dark-subtle">
      <Container fluid>
        <NavLink to="/" className="navbar-brand">
          <div className="fw-bold">
            Books<span className="text-bg-primary pe-1 ">Bazar</span>
          </div>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink to="/books" className="nav-link text-capitalize">
              books
            </NavLink>
            <NavLink to="/userinformation" className="nav-link text-capitalize">
              User information
            </NavLink>
            <NavLink to="/wishlist" className="nav-link text-capitalize">
              wishlist
            </NavLink>{" "}
            <NavLink to="/admin" className="nav-link text-capitalize">
              admin
            </NavLink>
            <NavLink to="/add-new" className="nav-link text-capitalize">
              add new book
            </NavLink>
            <Nav />
            {isLogin ? (
              <>
                {/* <NavLink to="/add-new" className="nav-link text-capitalize">
                  add new book
                </NavLink> */}

                <Button
                  className="ms-2"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={logoutHandler}
                  variant="danger"
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavLink to="/signin" className="nav-link text-capitalize">
                Sign In
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
