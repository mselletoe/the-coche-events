// src/components/FloatingParticles.jsx
import React from "react";
import "./floating-particles.scss";

const FloatingParticles = () => {
  const count = 80;
  const particles = Array.from({ length: count }, (_, i) => (
    <div key={i} className="particle" />
  ));

  return <div className="floating-particles">{particles}</div>;
};

export default FloatingParticles;
