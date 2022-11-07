import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import { useContext } from 'react';
import { Store } from './Store';
import SignUpScreen from './screens/SignUpScreen';
import FormBasicScreen from './screens/FormBasicScreen';
import FormAdditionalScreen from './screens/FormAdditionalScreen';
import FormFamilyScreen from './screens/FormFamilyScreen';
import FormSubmittedScreen from './screens/FormSubmittedScreen';
import FormPhotoScreen from './screens/FormPhotoScreen';
import FormPreviewScreen from './screens/FormPreviewScreen';
import ViewIdCardScreen from './screens/ViewIdCardScreen';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import EnterOtpScreen from './screens/EnterOtpScreen';
import FormMemberBasicScreen from './screens/memberform/FormMemberBasicScreen';
import FormMemberPhotoScreen from './screens/memberform/FormMemberPhotoScreen';
import FormMemberPreviewScreen from './screens/memberform/FormMemberPreviewScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="d-flex" bg="light" variant="light">
            <Container>
              <div>
                <LinkContainer to="/">
                  <img className="main-logo" src="images/logo.svg" alt="" />
                </LinkContainer>
                <LinkContainer to="/">
                  <Navbar.Brand>World Jain Census</Navbar.Brand>
                </LinkContainer>
                <br></br>
                <div style={{ fontSize: '10px' }} className="text-center">
                  Powered by: Global Digambar Jain Mahasabha, Rashtriya Jain
                  Sanghatan
                  <br></br>
                  <img
                    className="logo-image-small"
                    src="images/logo2.jpg"
                    alt=""
                  />
                  <img
                    className="logo-image-small"
                    src="images/logo3.jpg"
                    alt=""
                  />
                  <img
                    className="logo-image-small"
                    src="images/logo4.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="ml-auto">
                <Nav>
                  {userInfo && userInfo.isAdmin ? (
                    <Link className="nav-link" to="/datatable">
                      Data-Table
                    </Link>
                  ) : (
                    ''
                  )}
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={signOutHandler}
                      >
                        Sign out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </div>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/enterOtp" element={<EnterOtpScreen />} />
              <Route
                path="/formBasicInformation"
                element={<FormBasicScreen />}
              />
              <Route
                path="/formAdditionalInformation"
                element={<FormAdditionalScreen />}
              />
              <Route
                path="/formFamilyInformation"
                element={<FormFamilyScreen />}
              />
              <Route path="/formPhoto" element={<FormPhotoScreen />} />
              <Route path="/formPreview" element={<FormPreviewScreen />} />
              <Route
                path="/formSubmittedScreen"
                element={<FormSubmittedScreen />}
              />
              <Route path="/idCard" element={<ViewIdCardScreen />} />
              <Route
                path="/formMemberBasicScreen"
                element={<FormMemberBasicScreen />}
              />
              <Route
                path="/formMemberPhoto"
                element={<FormMemberPhotoScreen />}
              />
              <Route
                path="/formMemberPreview"
                element={<FormMemberPreviewScreen />}
              />
            </Routes>
          </Container>
        </main>
        <footer>
          <Col className="contact-us">
            <Row className="text-center mx-0">
              <strong>
                <u>Our Team</u>
              </strong>
            </Row>
            <Row className="justify-content-md-center mt-2 mx-0">
              <Col xs lg="3">
                <div className="float-start">
                  <strong>Product team:</strong>
                  <ul>
                    <li>
                      Mahesh Jain (su72kh@gmail.com)
                      <br></br>
                      Dimapur, Nagaland
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs lg="3">
                <div className="float-start">
                  <strong>Technical team:</strong>
                  <ul>
                    <li>
                      Atishay Jain (atishayjain740@gmail.com)
                      <br></br>
                      Dimapur, Nagaland
                    </li>
                    <li>
                      Kashish Nagpal (kashish2803@gmail.com)
                      <br></br>
                      New Delhi
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Col>
          <div className="text-center footer">
            Powered by: Global Digambar Jain Mahasabha, Rashtriya Jain Sanghatan
            <br></br>
            <img className="logo-image" src="images/logo2.jpg" alt="" />
            <img className="logo-image" src="images/logo3.jpg" alt="" />
            <img className="logo-image" src="images/logo4.jpg" alt="" />
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
