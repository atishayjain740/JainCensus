import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function FormPhotoScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    form: { photoFormInfo },
  } = state;

  const [src, setSrc] = useState(photoFormInfo || null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 10,
    y: 10,
    width: 100,
    height: 120,
  });
  const [output, setOutput] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/formPhoto');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (output == null) return;
    ctxDispatch({
      type: 'SAVE_FORM_PHOTO',
      payload: output,
    });

    navigate('/formPreview');
  }, [output, navigate, ctxDispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    cropImageNow();
  };

  const handleFileChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    var image = document.getElementById('src-image');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  return (
    <div>
      <Helmet>Upload Photo</Helmet>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Upload Photo</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="photo">
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          {src && (
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={5 / 6}>
              <img
                id="src-image"
                src={src}
                alt="image"
                onLoad={() => setImage(src.image)}
              />
            </ReactCrop>
          )}
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
