import React, { useContext } from 'react';
import CheckOutSteps from '../components/CheckOutSteps';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import { Store } from '../Store';
import IdCard from '../components/IdCard';
import Col from 'react-bootstrap/esm/Col';

export default function FormPreviewScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, form } = state;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    var name = userInfo.name;
    var phoneNumber = userInfo.phoneNumber;
    var isAdmin = userInfo.isAdmin;
    var formData = form;

    try {
      const { data } = await axios.post('/api/users/formSubmit', {
        name,
        phoneNumber,
        isAdmin,
        formData,
      });

      ctxDispatch({
        type: 'USER_SUBMIT_FORM',
        payload: {
          formSubmitted: data.formSubmitted,
          generatedId: data.generatedId,
        },
      });

      navigate('/formSubmittedScreen');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const editFormHandler = () => {
    navigate('/formBasicInformation');
  };

  return (
    <div>
      <Helmet>Preview</Helmet>
      <CheckOutSteps step1 step2 step3 step4 step5></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Preview</h1>
        <p>Click edit to edit the form</p>
        <p>Click on submit to submit the form and generate QR Code</p>
        <Col>
          <Button
            onClick={editFormHandler}
            className="primary m-3"
            size="lg"
            variant="primary"
          >
            Edit
          </Button>
          <Button
            onClick={submitFormHandler}
            className="primary m-3"
            size="lg"
            variant="primary"
          >
            Submit
          </Button>
        </Col>
        <span id="idcard" style={{ display: 'inline-block' }}>
          <IdCard form={form} />
        </span>
      </div>
    </div>
  );
}
