import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { getCurrentDate } from '../utils';

export default function IdCard(props) {
  const { form } = props;
  return (
    <div>
      <Card className="id-card">
        <Card.Body className="p-0">
          <Card.Title className="id-header p-1">
            <Row>
              <Col className="d-flex justify-content-center my-auto">
                <img height={60} src="images/jain-symbol.png" alt="" />
              </Col>
              <Col xs={10} className="d-flex justify-content-center my-auto">
                <div>
                  <p className="id-title">SHRI DIGAMBAR JAIN SAMAJ</p>
                  <p className="id-title-info">
                    REGD. NO. RS. 2305 Dt. 30.08.1993
                  </p>
                  <p className="id-title-info">
                    JAIN TEMPLE ROAD, DIMAPUR - 797112 : NAGALAND
                  </p>
                  <p className="id-title-info">03862-227504</p>
                </div>
              </Col>
            </Row>
          </Card.Title>
          <Card.Title className="id-sub-title">
            MINORITY IDENTITY CARD
          </Card.Title>
          <Card.Text className="px-2 py-1">
            <Row>
              <Col xs={9}>
                <Row>
                  <Col xs={3}>
                    <p className="id-body-info">Name</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info">:</p>
                  </Col>
                  <Col xs={8}>
                    <p className="id-body-info">
                      {form.basicFormInfo['fullName']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <p className="id-body-info">DoB</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info">:</p>
                  </Col>
                  <Col xs={8}>
                    <p className="id-body-info">{form.basicFormInfo['dob']}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <p className="id-body-info">Gender</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info">:</p>
                  </Col>
                  <Col xs={8}>
                    <p className="id-body-info">
                      {form.basicFormInfo['gender']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <p className="id-body-info">ID No.</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info">:</p>
                  </Col>
                  <Col xs={8}>
                    <p className="id-body-info"></p>
                  </Col>
                </Row>
              </Col>
              <Col
                className="id-photo d-flex justify-content-center my-auto"
                xs={3}
              >
                <img src={form.photoFormInfo} alt="Photo" />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="m-2"></div>
      <Card className="id-card">
        <Card.Body className="p-0">
          <Card.Title className="id-header p-1">
            <Row>
              <Col className="d-flex justify-content-center my-auto">
                <img height={30} src="images/jain-symbol.png" alt="" />
              </Col>
              <Col xs={10} className="d-flex justify-content-center my-auto">
                <div>
                  <p className="id-title">PERSONAL DETAILS</p>
                </div>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text className="px-2 py-1">
            <Row>
              <Col xs={9}>
                {form.basicFormInfo.gender === 'Female' &&
                form.basicFormInfo.married === 'Yes' ? (
                  <Row>
                    <Col xs={4}>
                      <p className="id-body-info2">Husband's Name</p>
                    </Col>
                    <Col xs={1}>
                      <p className="id-body-info2">:</p>
                    </Col>
                    <Col xs={7}>
                      <p className="id-body-info2">
                        {form.familyFormInfo['partnerName']}
                      </p>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col xs={4}>
                      <p className="id-body-info2">Father's Name</p>
                    </Col>
                    <Col xs={1}>
                      <p className="id-body-info2">:</p>
                    </Col>
                    <Col xs={7}>
                      <p className="id-body-info2">
                        {form.familyFormInfo['fatherName']}
                      </p>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Address</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">
                      {form.basicFormInfo['address']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Contact No.</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">
                      {form.basicFormInfo['phoneNumber']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">In case of need</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">
                      {form.basicFormInfo['emergencyNumber']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Blood Group</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">
                      {form.basicFormInfo['bloodGroup']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Aadhar No.</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">
                      {form.basicFormInfo['aadhar']}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Date of Issue</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2">{getCurrentDate()}</p>
                  </Col>
                </Row>
              </Col>
              <Col
                className="id-photo d-flex justify-content-center my-auto"
                xs={3}
              >
                QR Code
              </Col>
              <div>
                <hr
                  style={{
                    borderBottom: '5px solid red',
                    color: 'red',
                    marginTop: '10px',
                  }}
                ></hr>
              </div>
              <p className="id-footer">
                This card must be in the personal custody of the holder.
              </p>
              <p className="id-footer">
                Loss of card must be reported to the office of issuing
                authority.
              </p>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
