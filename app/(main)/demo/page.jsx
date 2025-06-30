import React from 'react';
import QRCode from 'react-qr-code';

const userData = {
  nid: '1234567890123',
  name: 'Md. Rahim',
  allocatedPoints: 500000,
};

export default function Page() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Smart Health Card QR Code</h2>
      <QRCode value={JSON.stringify(userData)} />
      <p>NID: {userData.nid}</p>
      <p>Name: {userData.name}</p>
      <p>Points: {userData.allocatedPoints}</p>
    </div>
  );
}
