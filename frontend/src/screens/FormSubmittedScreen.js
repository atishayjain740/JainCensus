import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import IdCard from '../components/IdCard';
import { Store } from '../Store';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, form: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function FormSubmittedScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, form }, dispatch] = useReducer(reducer, {
    form: null,
    loading: true,
    error: '',
  });

  const [formId, setFormId] = useState('');

  useEffect(() => {
    // If the user is not logged in or not verified. Go to sign in screen.
    if (!userInfo) {
      navigate('/signin?redirect=/formSubmittedScreen');
      return;
    } else if (userInfo && userInfo.verified !== true) {
      navigate('/signin?redirect=/formSubmittedScreen');
      return;
    }

    if (userInfo.formSubmitted) {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          /*const result = await axios.get(
            `/api/users/form/${userInfo.phoneNumber}`
          );*/
          const result = await axios.get(`/api/users/form/${userInfo.formId}`);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data['form'] });

          // Set form id to generate qr code.
          setFormId(result.data['_id']);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    } else {
      dispatch({ type: 'FETCH_FAIL', payload: 'Form not filled.' });
    }
  }, [userInfo, navigate]);

  const downloadHandler = () => {
    const input = document.getElementById('idcard');
    html2canvas(input, {
      imageTimeout: 15000,
      scale: 2,
      backgroundColor: '#FFFFFF',
    }).then((canvas) => {
      canvas.style.display = 'none';
      var image = canvas.toDataURL('png');
      var a = document.createElement('a');
      a.setAttribute('download', form.basicFormInfo.generatedId + '.png');
      a.setAttribute('href', image);
      a.click();
    });
  };

  const buttonHandler = () => {
    navigate(redirect || '/homeScreen');
  };

  return loading ? (
    <div className="container small-container text-center">
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>Form Submitted</Helmet>
      <div className="container small-container">
        <h1 className="my-3">You have succesfully submitted the form !!</h1>
        <div id="idcard" style={{ display: 'inline-block' }}>
          {form && <IdCard form={form} id={formId} />}
        </div>
        <Button
          onClick={downloadHandler}
          className="primary m-3"
          size="lg"
          variant="primary"
        >
          Download
        </Button>
        <Button
          onClick={buttonHandler}
          className="primary m-3"
          size="lg"
          variant="primary"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
