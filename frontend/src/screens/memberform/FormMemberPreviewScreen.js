import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getError } from '../../utils';
import { Store } from '../../Store';
import IdCard from '../../components/IdCard';
import Col from 'react-bootstrap/esm/Col';
import CheckOutStepsMember from '../../components/CheckOutStepsMember';

export default function FormMemberPreviewScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, form } = state;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    var isAdmin = userInfo.isAdmin;
    var formData = form.membersFormInfo[form.membersFormInfo.length - 1];
    var name = formData.basicFormInfo.fullName;
    var phoneNumber = userInfo.phoneNumber;

    // Delete submitted info and then send to server
    delete form.membersFormInfo[form.membersFormInfo.length - 1].submitted;

    try {
      const { data } = await axios.post('/api/users/formSubmitMember', {
        name,
        phoneNumber,
        isAdmin,
        formData,
      });

      // Form not submitted.
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      ctxDispatch({
        type: 'USER_SUBMIT_FORM_MEMBER',
        payload: {
          formSubmitted: data.formSubmitted,
          formId: data.formId,
          generatedId: data.generatedId,
        },
      });

      navigate('/formSubmittedScreen');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const editFormHandler = () => {
    navigate('/formMemberBasicScreen');
  };

  return (
    <div>
      <Helmet>Preview</Helmet>
      <CheckOutStepsMember step1 step2 step3></CheckOutStepsMember>
      <div className="container small-container">
        <h1 className="my-3">Preview</h1>
        <p>Click edit to edit the form</p>
        <p>Click on submit to submit the form and generate QR Code</p>
        <Col>
          <Button
            onClick={editFormHandler}
            className="primary m-3"
            size="lg"
            variant="primary"
          >
            Edit
          </Button>
          <Button
            onClick={submitFormHandler}
            className="primary m-3"
            size="lg"
            variant="primary"
          >
            Submit
          </Button>
        </Col>
        <span id="idcard" style={{ display: 'inline-block' }}>
          <IdCard
            form={form.membersFormInfo[form.membersFormInfo.length - 1]}
          />
        </span>
      </div>
    </div>
  );
}
