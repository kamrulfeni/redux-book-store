import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <footer className="mt-auto bg-dark-subtle pb-4 pt-5">
      <Container>
        <Row>
          <Col lg={4}>
            <Link to="/">
              <h5 className="fw-bold">
                Books<span className="text-bg-primary pe-1 ">Bazar</span>
              </h5>
            </Link>
          </Col>
          <Col lg={4}>
            <h5 className="fw-bold mb-0 text-capitalize"> MENU</h5>
            <hr />
            <ul className="footerNav">
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/books"> All books </Link>
              </li>
              <li>
                <Link to="/wishlist"> Wishlist </Link>
              </li>
              {isLogin ? (
                <li onClick={logoutHandler} className="text-danger">
                  Logout
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signin"> Sign in </Link>
                  </li>
                  <li>
                    <Link to="/signup"> Sign up </Link>
                  </li>
                </>
              )}
            </ul>
          </Col>
          <Col lg={4}>
            <h5 className="fw-bold mb-0 text-capitalize"> Contact</h5>
            <hr />
            <ul className="footerNav">
              <li>
                <Link to="/">
                  <FaFacebookF className="me-2" /> <span> Facebook </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <BsFillTelephoneFill className="me-2" /> <span> Phone </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <MdEmail className="me-2" /> <span> Email </span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
