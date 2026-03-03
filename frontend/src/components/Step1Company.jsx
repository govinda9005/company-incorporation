import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Step1Company() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    numberOfShareholders: "",
    totalCapital: "",
  });

  const [companyId, setCompanyId] = useState(null);

  // Load draft if exists
  useEffect(() => {
    const savedId = localStorage.getItem("companyId");

    if (savedId) {
      api
        .get(`/companies/${savedId}`)
        .then((res) => {
          setFormData(res.data);
          setCompanyId(savedId);
        })
        .catch(() => {
          localStorage.removeItem("companyId");
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (companyId) {
        // Update draft
        response = await api.put(`/companies/${companyId}`, {
          ...formData,
          numberOfShareholders: Number(formData.numberOfShareholders),
          totalCapital: Number(formData.totalCapital),
        });
      } else {
        // Create new
        response = await api.post("/companies", {
          ...formData,
          numberOfShareholders: Number(formData.numberOfShareholders),
          totalCapital: Number(formData.totalCapital),
        });

        const newId = response.data.id;
        localStorage.setItem("companyId", newId);
        setCompanyId(newId);
      }

      const idToUse = companyId || response.data.id;

      navigate(`/shareholders/${idToUse}`);
    } catch (error) {
      console.error(error);
      alert("Failed to save company");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Company Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="numberOfShareholders"
              placeholder="Number of Shareholders"
              className="input input-bordered w-full"
              value={formData.numberOfShareholders}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="totalCapital"
              placeholder="Total Capital"
              className="input input-bordered w-full"
              value={formData.totalCapital}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Step1Company;
