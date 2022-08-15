import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import formData from '../formData';

export default function FormFamilyScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { basicFormInfo, familyFormInfo },
  } = state;

  const [numMembers, setNumMembers] = useState(familyFormInfo.numMembers || '');
  const [fatherName, setFatherName] = useState(familyFormInfo.fatherName || '');
  const [partnerName, setPartnerName] = useState(
    familyFormInfo.partnerName || ''
  );
  const [familyHeadName, setFamilyHeadName] = useState(
    familyFormInfo.familyHeadName || ''
  );
  const [headNumber, setHeadNumber] = useState(familyFormInfo.headNumber || '');
  const [house, setHouse] = useState(familyFormInfo.house || '');
  const [numVehicles, setNumVehicles] = useState(
    familyFormInfo.numVehicles || ''
  );
  const [economicClass, setEconomicClass] = useState(
    familyFormInfo.economicClass || ''
  );

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
        fatherName,
        partnerName,
        familyHeadName,
        headNumber,
        house,
        numVehicles,
        economicClass,
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
            <span className="text-danger">*</span>
            <Form.Control
              value={numMembers}
              type="number"
              required
              onChange={(e) => setNumMembers(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fatherName">
            <FormLabel>Father's Name</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={fatherName}
              required
              onChange={(e) => setFatherName(e.target.value)}
            />
          </Form.Group>
          {basicFormInfo.gender == 'Female' &&
          basicFormInfo.married == 'Yes' ? (
            <Form.Group className="mb-3" controlId="partnerName">
              <FormLabel>Husband's Name</FormLabel>
              <span className="text-danger">*</span>
              <Form.Control
                value={partnerName}
                required
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </Form.Group>
          ) : (
            ''
          )}
          {basicFormInfo.gender == 'Male' && basicFormInfo.married == 'Yes' ? (
            <Form.Group className="mb-3" controlId="partnerName">
              <FormLabel>Wife's Name</FormLabel>
              <span className="text-danger">*</span>
              <Form.Control
                value={partnerName}
                required
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </Form.Group>
          ) : (
            ''
          )}
          <Form.Group className="mb-3" controlId="familyHeadName">
            <FormLabel>
              Name of Head of Family (परिवार के मुखिया का नाम)
            </FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={familyHeadName}
              required
              onChange={(e) => setFamilyHeadName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="headNumber">
            <FormLabel>Phone Number of head of family</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="number"
              className="phone-number"
              value={headNumber}
              required
              onChange={(e) => setHeadNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="house">
            <Form.Label>House</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={house}
              required
              onChange={(e) => setHouse(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.houses.map((house) => (
                <option value={house}>{house}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="numVehicles">
            <FormLabel>
              Number of Vehicles (परिवार में वाहनों की संख्या)
            </FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={numVehicles}
              type="number"
              required
              onChange={(e) => setNumVehicles(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="economicClass">
            <Form.Label>Economic class</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={economicClass}
              required
              onChange={(e) => setEconomicClass(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.economicClasses.map((economicClass) => (
                <option value={economicClass}>{economicClass}</option>
              ))}
            </Form.Control>
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
