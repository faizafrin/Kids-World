import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigate("/");
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      email,
      password,
    };
    setIsLoading(true);
    dispatch(LoginUser(values));
  };
  return (
    <Container fluid>
      <Row>
        <Col md={6} className="login__form--container">
          <Form onSubmit={handleSubmit} style={{ width: "100%" }} >
            
            <h1 style={{ color: 'white' }}>Login to your account</h1>

           
            <Form.Group>
              {/* <Form.Label>Email Address</Form.Label> */}
              <Form.Label style={{ color: 'white' }}>Email Address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
             <Form.Label style={{color:'white'}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                color="red"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading} >
                Login
              </Button>
            </Form.Group>

            <p className="pt-3 text-center" style={{ color: 'white' }}>
                   Don't have an account? <Link to="/signup" style={{ color: 'red' }}>Create account</Link>{" "}
                 </p>

          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
};

export default Login;
