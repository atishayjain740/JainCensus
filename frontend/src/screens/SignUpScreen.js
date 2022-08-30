import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault(); // To prevent from refreshing the page.
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        phoneNumber,
        password,
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <Form.Control required onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <FormLabel>Phone Number</FormLabel>
            <Form.Control
              className="phone-number"
              type="number"
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <FormLabel>Password</FormLabel>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
