import React, { useContext } from 'react';
import CheckOutSteps from '../components/CheckOutSteps';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import { Store } from '../Store';

export default function FormPaymentScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

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
        payload: data.formSubmitted,
      });

      navigate('/formSubmittedScreen');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <Helmet>Payment</Helmet>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Payment</h1>;
        <Button
          onClick={submitFormHandler}
          className="primary m-3"
          size="lg"
          variant="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
