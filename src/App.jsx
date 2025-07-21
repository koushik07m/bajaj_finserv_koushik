import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "./components/DoctorCard";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
import "./styles.css";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [consultMode, setConsultMode] = useState(searchParams.get("mode") || "");
  const [specialties, setSpecialties] = useState(searchParams.getAll("specialty") || []);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setDoctors(res.data);
    });
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [search, consultMode, specialties, sortBy, doctors]);

  const filterDoctors = () => {
    let filtered = [...doctors];

    if (search) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (consultMode === "video") filtered = filtered.filter((d) => d.video_consult);
    if (consultMode === "clinic") filtered = filtered.filter((d) => d.in_clinic);

    if (specialties.length > 0) {
      filtered = filtered.filter((d) =>
        specialties.every((sp) => d.specialities.map((s) => s.name).includes(sp))
      );
    }

    if (sortBy === "fees") {
      filtered.sort((a, b) =>
        parseInt(a.fees.replace("₹", "")) - parseInt(b.fees.replace("₹", ""))
      );
    } else if (sortBy === "experience") {
      filtered.sort((a, b) =>
        parseInt(b.experience) - parseInt(a.experience)
      );
    }

    setFilteredDoctors(filtered);
    updateURLParams();
  };

  const updateURLParams = () => {
    const params = {};
    if (search) params.search = search;
    if (consultMode) params.mode = consultMode;
    if (specialties.length > 0) params.specialty = specialties;
    if (sortBy) params.sort = sortBy;
    setSearchParams(params);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <SearchBar
          search={search}
          setSearch={setSearch}
          doctors={doctors}
          setSuggestions={setSuggestions}
          suggestions={suggestions}
        />
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <FilterPanel
            consultMode={consultMode}
            setConsultMode={setConsultMode}
            specialties={specialties}
            setSpecialties={setSpecialties}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </aside>

        <section className="doctor-feed">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doc={doc} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
