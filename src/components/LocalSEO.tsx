import React from 'react';
import { Helmet } from 'react-helmet-async';

export const LocalSEO = () => {
  // Replace these with the actual business details
  const businessDetails = {
    name: "Healthcare Demo Template",
    description: "Premium Home Health Care & Companion Services",
    url: "https://www.healthcare-demo-template.com",
    logo: "https://www.healthcare-demo-template.com/logo.png",
    telephone: "+1-555-123-4567",
    address: {
      streetAddress: "123 Healthcare Way", // Update with actual address
      addressLocality: "Cityville", // Inferred from area code 609
      addressRegion: "NJ",
      postalCode: "00000",
      addressCountry: "US"
    },
    geo: {
      latitude: "40.2206",
      longitude: "-74.7597"
    },
    openingHours: "Mo-Su 00:00-24:00", // 24/7 Service
    priceRange: "$$"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness", // Or MedicalBusiness
    "additionalType": "http://www.productontology.org/id/Home_care",
    "name": businessDetails.name,
    "image": businessDetails.logo,
    "@id": businessDetails.url,
    "url": businessDetails.url,
    "telephone": businessDetails.telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessDetails.address.streetAddress,
      "addressLocality": businessDetails.address.addressLocality,
      "addressRegion": businessDetails.address.addressRegion,
      "postalCode": businessDetails.address.postalCode,
      "addressCountry": businessDetails.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessDetails.geo.latitude,
      "longitude": businessDetails.geo.longitude
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": businessDetails.priceRange,
    "sameAs": [
      "https://www.facebook.com/healthcaredemo",
      "https://www.instagram.com/healthcaredemo",
      "https://twitter.com/healthcaredemo"
    ]
  };

  return (
    <Helmet>
      {/* Meta Tags for Local SEO */}
      <meta name="geo.region" content={`${businessDetails.address.addressCountry}-${businessDetails.address.addressRegion}`} />
      <meta name="geo.placename" content={businessDetails.address.addressLocality} />
      <meta name="geo.position" content={`${businessDetails.geo.latitude};${businessDetails.geo.longitude}`} />
      <meta name="ICBM" content={`${businessDetails.geo.latitude}, ${businessDetails.geo.longitude}`} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
