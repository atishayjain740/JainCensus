import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { generateQrCodeUrl, getCurrentDate } from '../utils';
import QrCodeImage from './QrCodeImage';

export default function IdCard(props) {
  const { form, id } = props;
  return (
    <div>
      <div className="id-card">
        <div className="p-0">
          <div className="id-header p-1">
            <Row>
              <Col className="d-flex justify-content-center my-auto">
                <img height={60} src="images/jain-symbol.png" alt="" />
              </Col>
              <Col xs={10} className="d-flex justify-content-center my-auto">
                <div>
                  <p className="id-title">
                    विश्व जैन जनगणना (WORLD JAIN CENSUS)
                  </p>
                  <p className="id-title-info">
                    Powered by: Global Digambar Jain Mahasabha, Rashtriya Jain
                    Sanghatan
                  </p>
                  <div className="text-center">
                    <img
                      className="logo-image-small mx-2"
                      src="images/logo2.jpg"
                      alt=""
                    />
                    <img
                      className="logo-image-small mx-2"
                      src="images/logo3.jpg"
                      alt=""
                    />
                    <img
                      className="logo-image-small mx-2"
                      src="images/logo4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="id-sub-title">परिचय पत्र (Identity Card)</div>
          <div className="px-2 py-1">
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
                    <p className="id-body-info id-para">
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
                    <p className="id-body-info id-para">
                      {form.basicFormInfo['dob']}
                    </p>
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
                    <p className="id-body-info id-para">
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
                    <p className="id-body-info id-para">
                      {form.basicFormInfo['generatedId']
                        ? form.basicFormInfo['generatedId']
                        : ''}
                    </p>
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
          </div>
        </div>
      </div>
      <div className="m-2"></div>
      <div className="id-card">
        <div className="p-0">
          <div className="id-header p-1">
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
          </div>
          <div className="px-2 py-1">
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
                      <p className="id-body-info2 id-para">
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
                      <p className="id-body-info2 id-para">
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
                    <p className="id-body-info2 id-para">
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
                    <p className="id-body-info2 id-para">
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
                    <p className="id-body-info2 id-para ">
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
                    <p className="id-body-info2 id-para">
                      {form.basicFormInfo['bloodGroup']}
                    </p>
                  </Col>
                </Row>
                {form.basicFormInfo['aadhar'] !== '' ? (
                  <Row>
                    <Col xs={4}>
                      <p className="id-body-info2">Aadhar No.</p>
                    </Col>
                    <Col xs={1}>
                      <p className="id-body-info2 id-para">:</p>
                    </Col>
                    <Col xs={7}>
                      <p className="id-body-info2">
                        {form.basicFormInfo['aadhar']}
                      </p>
                    </Col>
                  </Row>
                ) : (
                  ''
                )}
                <Row>
                  <Col xs={4}>
                    <p className="id-body-info2">Date of Issue</p>
                  </Col>
                  <Col xs={1}>
                    <p className="id-body-info2">:</p>
                  </Col>
                  <Col xs={7}>
                    <p className="id-body-info2 id-para">{getCurrentDate()}</p>
                  </Col>
                </Row>
              </Col>
              <Col
                className="id-photo d-flex justify-content-center my-auto"
                xs={3}
              >
                {id ? (
                  <QrCodeImage address={generateQrCodeUrl(id)} />
                ) : (
                  'QR Code'
                )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
