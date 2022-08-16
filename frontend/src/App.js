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
                  <img src="images/logo.svg" alt="" />
                </LinkContainer>
                <LinkContainer to="/">
                  <Navbar.Brand>Jain Census</Navbar.Brand>
                </LinkContainer>
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
                        to="#signOut"
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
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
