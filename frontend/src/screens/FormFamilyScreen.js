import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';

export default function FormFamilyScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { familyFormInfo },
  } = state;

  const [numMembers, setNumMembers] = useState(familyFormInfo.numMembers || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/formFamilylInformation');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_FORM_FAMILY',
      payload: {
        numMembers,
      },
    });

    navigate('/formPhoto');
  };

  return (
    <div>
      <Helmet>Family Information</Helmet>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Family Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="numMembers">
            <FormLabel>Number of family members</FormLabel>
            <Form.Control
              value={numMembers}
              type="number"
              required
              onChange={(e) => setNumMembers(e.target.value)}
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
