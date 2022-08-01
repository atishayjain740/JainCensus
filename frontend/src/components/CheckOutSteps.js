import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function CheckOutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Basic</Col>
      <Col className={props.step2 ? 'active' : ''}>Additional</Col>
      <Col className={props.step3 ? 'active' : ''}>Family</Col>
      <Col className={props.step4 ? 'active' : ''}>Payment</Col>
    </Row>
  );
}
