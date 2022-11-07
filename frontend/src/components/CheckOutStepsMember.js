import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function CheckOutStepsMember(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Basic</Col>
      <Col className={props.step2 ? 'active' : ''}>Photo</Col>
      <Col className={props.step3 ? 'active' : ''}>Preview</Col>
    </Row>
  );
}
