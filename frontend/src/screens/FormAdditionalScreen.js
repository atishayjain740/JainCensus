import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';

export default function FormAdditionalScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { additionalFormInfo },
  } = state;

  const [panth, setpanth] = useState(additionalFormInfo.panth || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/formAdditionalInformation');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_FORM_ADDITIONAL',
      payload: {
        panth,
      },
    });

    navigate('/formFamilyInformation');
  };

  return (
    <div>
      <Helmet>Additional Information</Helmet>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Additional Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="panth">
            <FormLabel>पंथ</FormLabel>
            <Form.Control
              value={panth}
              required
              onChange={(e) => setpanth(e.target.value)}
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
