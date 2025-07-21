import React from "react";

const allSpecialties = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist", "Physiotherapist",
  "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist",
  "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist",
  "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist",
  "Ayurveda", "Homeopath"
];

const FilterPanel = ({ consultMode, setConsultMode, specialties, setSpecialties, sortBy, setSortBy }) => {
  return (
    <>
      <div>
        <h4 data-testid="filter-header-moc">Consultation Mode</h4>
        <label>
          <input
            type="radio"
            name="mode"
            value="video"
            checked={consultMode === "video"}
            onChange={() => setConsultMode("video")}
            data-testid="filter-video-consult"
          />
          Video Consult
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="clinic"
            checked={consultMode === "clinic"}
            onChange={() => setConsultMode("clinic")}
            data-testid="filter-in-clinic"
          />
          In Clinic
        </label>
      </div>

      <div>
        <h4 data-testid="filter-header-speciality">Speciality</h4>
        {allSpecialties.map((sp) => (
          <label key={sp}>
            <input
              type="checkbox"
              checked={specialties.includes(sp)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSpecialties([...specialties, sp]);
                } else {
                  setSpecialties(specialties.filter((s) => s !== sp));
                }
              }}
              data-testid={`filter-specialty-${sp.replaceAll("/", "-").replaceAll(" ", "-")}`}
            />
            {sp}
          </label>
        ))}
      </div>

      <div>
        <h4 data-testid="filter-header-sort">Sort</h4>
        <label>
          <input
            type="radio"
            name="sort"
            value="fees"
            checked={sortBy === "fees"}
            onChange={() => setSortBy("fees")}
            data-testid="sort-fees"
          />
          Fees (Low to High)
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="experience"
            checked={sortBy === "experience"}
            onChange={() => setSortBy("experience")}
            data-testid="sort-experience"
          />
          Experience (High to Low)
        </label>
      </div>
    </>
  );
};

export default FilterPanel;
