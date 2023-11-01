import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser } from "../redux/actions/userAction";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name,
      email,
      password,
    };
    dispatch(SignUpUser(values));
  };
  return (
    <Container fluid>
      <Row>
        <Col md={6} className="login__form--container">
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <h1 style={{ color: 'white' }}>Create a new account</h1>

            {/* {isError && <Alert variant="danger">{error.data}</Alert>} */}
            <Form.Group>
            <Form.Label style={{ color: 'white' }}>Enter the user name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
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
            <Form.Label style={{ color: 'white' }}>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit">Register</Button>
            </Form.Group>

            <p className="pt-3 text-center" style={{ color: 'white' }}>
              Already have an account?{" "}
              <Link to="/login"style={{ color: 'red' }}>Login to your account</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
