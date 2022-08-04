import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';

export default function FormBasicScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { basicFormInfo },
  } = state;

  const [fullName, setFullName] = useState(basicFormInfo.fullName || '');
  const [gender, setGender] = useState(basicFormInfo.gender || '');
  const [address, setAddress] = useState(basicFormInfo.address || '');
  const [city, setCity] = useState(basicFormInfo.city || '');
  const [postalCode, setPostalCode] = useState(basicFormInfo.postalCode || '');
  const [country, setCountry] = useState(basicFormInfo.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/formBasicInformation');
      return;
    }
    if (userInfo['formSubmitted']) {
      navigate('/formSubmittedScreen');
      return;
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_FORM_BASIC',
      payload: {
        fullName,
        gender,
        address,
        city,
        postalCode,
        country,
      },
    });

    navigate('/formAdditionalInformation');
  };

  return (
    <div>
      <Helmet>Basic Information</Helmet>
      <CheckOutSteps step1></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Basic Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <FormLabel>Full Name</FormLabel>
            <Form.Control
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <FormLabel>Gender</FormLabel>
            <Form.Control
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <FormLabel>Address</FormLabel>
            <Form.Control
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <FormLabel>City</FormLabel>
            <Form.Control
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <Form.Control
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <FormLabel>Country</FormLabel>
            <Form.Control
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Save and Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
