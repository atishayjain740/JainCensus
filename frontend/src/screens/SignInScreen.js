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

export default function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [phoneNumber, setPhoneNumber] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault(); // To prevent from refreshing the page.
    try {
      const { data } = await axios.post('/api/users/signin', {
        phoneNumber,
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      //if (!data.verified) {
      var redirectString = redirect !== '/' ? '?redirect=' + redirect : '';
      navigate('/enterOtp' + redirectString);
      //} else {
      //navigate(redirect || '/');
      //}
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.verified === true) {
      // User logged in take it to the redirect page.
      navigate(redirect);
    } else if (userInfo && userInfo.verified === false) {
      // User logged in but not verified. Sign out.
      ctxDispatch({ type: 'USER_SIGNOUT' });
      toast.error('Account not verified. Log in again');
    }
  }, [ctxDispatch, redirect, navigate, userInfo]);

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="phone-number">
            <FormLabel>Phone number</FormLabel>
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
          <div className="mb-3">
            <Button type="submit">Submit</Button>
          </div>
          <div>
            <div className="mb-3 float-start">
              New user?{' '}
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}
