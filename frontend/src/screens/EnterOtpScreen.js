import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function EnterOtpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [otp, setOtp] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault(); // To prevent from refreshing the page.
    try {
      const { data } = await axios.post('/api/users/verifyOTP', {
        userId: userInfo._id,
        otp,
      });

      ctxDispatch({ type: 'USER_VERIFIED', payload: data });
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const resendOtpHandler = async (e) => {
    e.preventDefault(); // To prevent from refreshing the page.
    try {
      const { data } = await axios.post('/api/users/resendOTP', {
        id: userInfo._id,
        phoneNumber: userInfo.phoneNumber,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.verified === true) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Enter OTP</title>
        </Helmet>
        <h1 className="my-3">Enter OTP</h1>
        <Form.Text muted>Enter the OTP sent to your phone number</Form.Text>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="otp">
            <Form.Control
              className="phone-number"
              type="number"
              minLength={6}
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setOtp(e.target.value);
              }}
            />
          </Form.Group>
          <div>
            <div className="mb-3 float-start">
              <Button onClick={resendOtpHandler}>Resend OTP</Button>
            </div>
            <div className="mb-3 mx-3 float-start">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}
