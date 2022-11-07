import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import formData from '../../formdata/formData';
import formDataCountry from '../../formdata/formDataCountry';
import formDataState from '../../formdata/formDataState';
import CheckOutStepsMember from '../../components/CheckOutStepsMember';

export default function FormMemberBasicScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { membersFormInfo },
  } = state;

  var currentMember = {};
  if (membersFormInfo && membersFormInfo.length > 0) {
    currentMember = membersFormInfo[membersFormInfo.length - 1].basicFormInfo;
  }

  const [fullName, setFullName] = useState(
    (currentMember && currentMember.fullName) || ''
  );
  const [gender, setGender] = useState(
    (currentMember && currentMember.gender) || ''
  );
  const [dob, setDob] = useState((currentMember && currentMember.dob) || '');
  const [phoneNumber, setPhoneNumber] = useState(
    (currentMember && currentMember.phoneNumber) ||
      (userInfo && userInfo.phoneNumber) ||
      ''
  );
  const [emergencyNumber, setEmergencyNumber] = useState(
    (currentMember && currentMember.emergencyNumber) || ''
  );
  const [aadhar, setAadhar] = useState(
    (currentMember && currentMember.aadhar) || ''
  );
  const [email, setEmail] = useState(
    (currentMember && currentMember.setEmail) || ''
  );
  const [address, setAddress] = useState(
    (currentMember && currentMember.address) || ''
  );
  const [country, setCountry] = useState(
    (currentMember && currentMember.country) || 'India'
  );
  const [indState, setIndState] = useState(
    (currentMember && currentMember.indState) || ''
  );
  const [district, setDistrict] = useState(
    (currentMember && currentMember.district) || ''
  );
  const [city, setCity] = useState((currentMember && currentMember.city) || '');
  const [postalCode, setPostalCode] = useState(
    (currentMember && currentMember.postalCode) || ''
  );
  const [bloodGroup, setBloodGroup] = useState(
    (currentMember && currentMember.bloodGroup) || ''
  );
  const [educationQualification, setEducationQualification] = useState(
    (currentMember && currentMember.educationQualification) || ''
  );
  const [occupation, setOccupation] = useState(
    (currentMember && currentMember.occupation) || ''
  );
  const [married, setMarried] = useState(
    (currentMember && currentMember.married) || ''
  );

  useEffect(() => {
    // If the user is not logged in or not verified. Go to sign in screen.
    if (!userInfo) {
      navigate('/signin?redirect=/formMemberBasicScreen');
      return;
    } else if (userInfo && userInfo.verified !== true) {
      navigate('/signin?redirect=/formMemberBasicScreen');
      return;
    }

    // If form already submitted. Go to form submitted screen.
    /*if (userInfo['formSubmitted']) {
      navigate('/formSubmittedScreen');
      return;
    }*/
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    let countryCode = formDataCountry.country.find(
      (o) => o.name === country
    ).code;

    ctxDispatch({
      type: 'SAVE_FORM_BASIC_MEMBER',
      payload: {
        fullName,
        gender,
        dob,
        phoneNumber,
        emergencyNumber,
        aadhar,
        email,
        address,
        city,
        postalCode,
        country,
        countryCode,
        indState,
        district,
        bloodGroup,
        educationQualification,
        occupation,
        married,
      },
    });

    navigate('/formMemberPhoto');
  };

  return (
    <div>
      <Helmet>Basic Information</Helmet>
      <CheckOutStepsMember step1></CheckOutStepsMember>
      <div className="container small-container">
        <h1 className="my-3">Basic Information</h1>
        <p className="text-danger">
          Please provide valid information in the form. Filling of all the
          required fields are mandatory.
        </p>
        <p className="text-danger"></p>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <FormLabel>Full Name</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <FormLabel>Gender</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dob">
            <FormLabel>Date Of Birth</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="date"
              value={dob}
              required
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="number"
              className="phone-number"
              value={phoneNumber}
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emergencyNumber">
            <FormLabel>Emergency phone number</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="number"
              className="phone-number"
              value={emergencyNumber}
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setEmergencyNumber(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <FormLabel>Email</FormLabel>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <FormLabel>Address</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={address}
              maxLength="50"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={country}
              required
              onChange={(e) => {
                if (e.target.value !== 'India') {
                  setIndState('');
                  setDistrict('');
                  setAadhar('');
                }
                setCountry(e.target.value);
              }}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formDataCountry.country.map((country) => (
                <option value={country.name}>{country.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="indState">
            <Form.Label>State</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              disabled={country !== 'India'}
              value={indState}
              required
              onChange={(e) => setIndState(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formDataState.states.map((state) => (
                <option value={state.state}>{state.state}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="district">
            <Form.Label>District</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              disabled={country !== 'India'}
              value={district}
              required
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formDataState.states.find((o) => o.state === indState)
                ? formDataState.states
                    .find((o) => o.state === indState)
                    .districts.map((district) => (
                      <option value={district}>{district}</option>
                    ))
                : ''}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <FormLabel>City</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="number"
              className="phone-number"
              value={postalCode}
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setPostalCode(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="aadhar">
            <FormLabel>Aadhar No.</FormLabel>
            <span className="text-danger">*</span>
            <Form.Control
              type="number"
              className="phone-number"
              disabled={country !== 'India'}
              value={aadhar}
              required
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                var num = e.target.value.match(/^\d+$/);
                if (num === null) {
                  e.target.value = '';
                }
                setAadhar(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bloodGroup">
            <Form.Label>Blood Group</Form.Label>
            <Form.Control
              as="select"
              default=""
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.bloodGroups.map((bloodGroup) => (
                <option value={bloodGroup}>{bloodGroup}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="educationQualification">
            <Form.Label>Educational qualification</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={educationQualification}
              required
              onChange={(e) => setEducationQualification(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.educationQualifications.map(
                (educationQualification) => (
                  <option value={educationQualification}>
                    {educationQualification}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="occupation">
            <Form.Label>Occupation</Form.Label>
            <span className="text-danger">*</span>
            <Form.Control
              as="select"
              default=""
              value={occupation}
              required
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {formData.occupations.map((occupation) => (
                <option value={occupation}>{occupation}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="married">
            <FormLabel>Married</FormLabel>
            <span className="text-danger">*</span>
            <br></br>
            <Form.Check
              name="married"
              required
              value="Yes"
              checked={married === 'Yes'}
              inline
              label="Yes"
              type="radio"
              onChange={(e) => setMarried(e.target.value)}
            />
            <Form.Check
              name="married"
              required
              value="No"
              checked={married === 'No'}
              inline
              label="No"
              type="radio"
              onChange={(e) => setMarried(e.target.value)}
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
