import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

export default function HomeScreen() {
  const navigate = useNavigate();

  const fillFormHandler = () => {
    navigate('/signin?redirect=/formBasicInformation');
  };

  return (
    <div>
      <Helmet>
        <title>Jain Census</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <img className="img-large" src="images/image.jpg" alt=""></img>
        </Col>
        <Col md={6}>
          <h1 className="m-3">Welcome to Jain Census</h1>
          <h4 className="m-3">
            Click on the button below and get your Id card now!!
          </h4>
          <Button
            onClick={fillFormHandler}
            className="primary m-3"
            size="lg"
            variant="primary"
          >
            Fill up form
          </Button>
        </Col>
      </Row>
    </div>
  );
}
