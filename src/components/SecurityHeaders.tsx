import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SecurityHeaders = () => {
  return (
    <Helmet>
      {/* SSL / HSTS Enforcement */}
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      
      {/* Anti-Clickjacking */}
      <meta http-equiv="X-Frame-Options" content="DENY" />
      
      {/* XSS Protection */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </Helmet>
  );
};
