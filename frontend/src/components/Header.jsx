import React from "react";
import { Row, Col, Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Navbar className="header" bg="primary">
      <Container>
        <Nav>
          {userInfo && (
            <Nav.Link>
              <Button className="btn btn-primary">
                Hi, {userInfo.first_name}
              </Button>
            </Nav.Link>
          )}
          <Nav.Link as="div">
            <Link as="Button" className="btn btn-primary" to="/">
              Home
            </Link>
          </Nav.Link>
          {userInfo ? (
            <>
              <Nav.Link as="div">
                <Link to="/create-post" className="btn btn-primary" as="Button">
                  Create Post
                </Link>
              </Nav.Link>
              <Nav.Link as="div">
                <Link
                  to=""
                  className="btn btn-primary"
                  as="Button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                >
                  Logout
                </Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as="div">
                <Link as="Button" className="btn btn-primary" to="/login">
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link as="div">
                <Link
                  as="Button"
                  className="btn btn-primary"
                  to="/registration"
                >
                  Registration
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
