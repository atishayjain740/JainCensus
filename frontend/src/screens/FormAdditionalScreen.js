import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import formData from '../formData';

export default function FormAdditionalScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { additionalFormInfo },
  } = state;

  const [aamnaya, setAamnaya] = useState(additionalFormInfo.aamnaya || '');
  const [panth, setPanth] = useState(additionalFormInfo.panth || '');
  const [varn, setVarn] = useState(additionalFormInfo.varn || '');
  const [jati, setJati] = useState(additionalFormInfo.jati || '');
  const [nearestJainTemple, setNearestJainTemple] = useState(
    additionalFormInfo.nearestJainTemple || ''
  );
  const [templeHeadName, setTempleHeadName] = useState(
    additionalFormInfo.templeHeadName || ''
  );

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
        aamnaya,
        panth,
        varn,
        jati,
        nearestJainTemple,
        templeHeadName,
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
          <Form.Group className="mb-3" controlId="aamnaya">
            <Form.Label>आम्नाय</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={aamnaya}
              required
              onChange={(e) => setAamnaya(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.aamnayas.map((aamnaya) => (
                <option value={aamnaya}>{aamnaya}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="panth">
            <Form.Label>पंथ</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={panth}
              required
              onChange={(e) => setPanth(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.panths.map((panth) => (
                <option value={panth}>{panth}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="varn">
            <Form.Label>वर्ण</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={varn}
              required
              onChange={(e) => setVarn(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.varns.map((varn) => (
                <option value={varn}>{varn}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="jati">
            <Form.Label>जाति</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={jati}
              required
              onChange={(e) => setJati(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.jatis.map((jati) => (
                <option value={jati}>{jati}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nearestJainTemple">
            <FormLabel>
              Nearest Jain Temple and Address (निकटतम जैन मंदिर/स्थानक का पता)
            </FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={nearestJainTemple}
              required
              onChange={(e) => setNearestJainTemple(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="templeHeadName">
            <FormLabel>
              Name of head of Temple (मन्दिर/स्थानक/समाज के अध्यक्ष का नाम)
            </FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={templeHeadName}
              required
              onChange={(e) => setTempleHeadName(e.target.value)}
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
