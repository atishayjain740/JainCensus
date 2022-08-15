import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IdCard from '../components/IdCard';
import { Helmet } from 'react-helmet-async';

export default function ViewIdCard() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  const [form, setForm] = useState('');

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/form/id/${id}`);

        setForm(result.data['form']);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
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
