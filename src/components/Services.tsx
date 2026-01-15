import React from 'react';
import { Helmet } from 'react-helmet-async';

const services = [
  { title: "Individual Support", icon: "🤝" },
  { title: "In-Home Care", icon: "🏠" },
  { title: "Community-Based Activities", icon: "🌳" },
  { title: "Transportation Assistance", icon: "🚗" },
  { title: "Medication Management", icon: "💊" },
];

export const Services = () => {
  return (
    <section id="services" className="services-section">
      <Helmet>
        <title>Services | Do It Right By You</title>
        <meta name="description" content="Our services include individual support, in-home care, community activities, transportation assistance, and medication management." />
      </Helmet>
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
