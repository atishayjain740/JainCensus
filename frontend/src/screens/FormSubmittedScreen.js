import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FormSubmittedScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const buttonHandler = () => {
    navigate(redirect || '/homeScreen');
  };
  return (
    <div>
      <Helmet>Form Submitted</Helmet>
      <div className="container small-container">
        <h1 className="my-3">You have succesfully submitted the form !!</h1>;
        <Button
          onClick={buttonHandler}
          className="primary m-3"
          size="lg"
          variant="primary"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
