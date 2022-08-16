import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IdCard from '../components/IdCard';
import { Helmet } from 'react-helmet-async';
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

export default function ViewIdCard() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  const [{ loading, error, form }, dispatch] = useReducer(reducer, {
    form: null,
    loading: true,
    error: '',
  });

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/users/form/id/${id}`);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data['form'] });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [id, navigate]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>Id Card</Helmet>
      <div className="container small-container">
        <div id="idcard" style={{ display: 'inline-block' }}>
          {form && <IdCard form={form} id={id} />}
        </div>
      </div>
    </div>
  );
}
