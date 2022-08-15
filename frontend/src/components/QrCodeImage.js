import React from 'react';
import { useEffect, useState } from 'react';
import QrCode from 'qrcode';

export default function QrCodeImage({ address }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QrCode.toDataURL(address).then((data) => {
      setSrc(data);
    });
  }, []);

  return (
    <div>
      <img alt="" src={src} />
    </div>
  );
}
