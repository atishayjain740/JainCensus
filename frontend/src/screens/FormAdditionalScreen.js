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
  const [knownJati, setKnownJati] = useState(additionalFormInfo.jati || '');
  const [otherJati, setOtherJati] = useState(additionalFormInfo.jati || '');
  const [knownGotr, setKnownGotr] = useState(additionalFormInfo.gotr || '');
  const [otherGotr, setOtherGotr] = useState(additionalFormInfo.gotr || '');
  const [nearestJainTemple, setNearestJainTemple] = useState(
    additionalFormInfo.nearestJainTemple || ''
  );
  const [templeHeadName, setTempleHeadName] = useState(
    additionalFormInfo.templeHeadName || ''
  );

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/formAdditionalInformation');
      return;
    }

    // Set the value of jati. Dropdown and text.
    var jati = additionalFormInfo.jati;
    if (!jati) {
      setKnownJati('');
      setOtherJati('');
    } else if (formData.jatis.includes(jati)) {
      setKnownJati(jati);
      setOtherJati('');
    } else {
      setKnownJati('others');
      setOtherJati(jati);
    }

    // Set the value of gotr. Dropdown and text.
    var gotr = additionalFormInfo.gotr;

    if (!gotr) {
      setKnownGotr('');
      setOtherGotr('');
    } else if (formData.gotras[jati] && formData.gotras[jati].includes(gotr)) {
      setKnownGotr(gotr);
      setOtherGotr('');
    } else {
      setKnownGotr('others');
      setOtherGotr(gotr);
    }
  }, [userInfo, navigate.additionalFormInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    var jati = knownJati !== 'others' ? knownJati : otherJati;

    var gotr = knownGotr !== 'others' ? knownGotr : otherGotr;

    ctxDispatch({
      type: 'SAVE_FORM_ADDITIONAL',
      payload: {
        aamnaya,
        panth,
        varn,
        jati,
        gotr,
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
              {aamnaya !== ''
                ? formData.panths[aamnaya].map((panth) => (
                    <option value={panth}>{panth}</option>
                  ))
                : ''}
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
              value={knownJati}
              required
              onChange={(e) => {
                if (e.target.value !== 'others') {
                  setOtherJati('');
                }
                setKnownJati(e.target.value);
              }}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.jatis.map((jati) => (
                <option value={jati}>{jati}</option>
              ))}
              <option value="others">अन्य/Others</option>
            </Form.Control>
            <Form.Control
              className="mt-1"
              value={otherJati}
              disabled={knownJati !== 'others'}
              required
              placeholder="Specify your जाति"
              onChange={(e) => setOtherJati(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gotr">
            <Form.Label>गोत्र</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={knownGotr}
              required
              onChange={(e) => {
                if (e.target.value !== 'others') {
                  setOtherGotr('');
                }
                setKnownGotr(e.target.value);
              }}
            >
              <option value="" disabled>
                Choose an option
              </option>

              {!formData.gotras.hasOwnProperty(
                knownJati === 'others' ? otherJati : knownJati
              )
                ? ''
                : formData.gotras[
                    knownJati === 'others' ? otherJati : knownJati
                  ].map((gotr) => <option value={gotr}>{gotr}</option>)}
              <option value="others">अन्य/Others</option>
            </Form.Control>
            <Form.Control
              className="mt-1"
              value={otherGotr}
              disabled={knownGotr !== 'others'}
              required
              placeholder="Specify your गोत्र"
              onChange={(e) => setOtherGotr(e.target.value)}
            />
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
