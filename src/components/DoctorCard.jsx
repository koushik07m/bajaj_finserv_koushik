import React from "react";

const DoctorCard = ({ doc }) => {
  return (
    <div key={doc.id} data-testid="doctor-card">
      <img src={doc.photo} alt={doc.name} width={100} />
      <h3 data-testid="doctor-name">{doc.name}</h3>
      <p data-testid="doctor-specialty">
        {doc.specialities.map((s) => s.name).join(", ")}
      </p>
      <p data-testid="doctor-experience">{doc.experience}</p>
      <p data-testid="doctor-fee">{doc.fees}</p>
    </div>
  );
};

export default DoctorCard;
