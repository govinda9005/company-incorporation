import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Step2Shareholders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [shareholders, setShareholders] = useState([]);

  useEffect(() => {
    api
      .get(`/companies/${id}`)
      .then((res) => {
        setCompany(res.data);

        const initial = Array.from(
          { length: res.data.numberOfShareholders },
          () => ({
            firstName: "",
            lastName: "",
            nationality: "",
          }),
        );

        setShareholders(initial);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/shareholders", {
        companyId: Number(id),
        shareholders,
      });

      localStorage.removeItem("companyId");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to save shareholders");
    }
  };

  if (!company) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-2xl shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Shareholders</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {shareholders.map((sh, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <h3 className="font-semibold">Shareholder {index + 1}</h3>

                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  value={sh.firstName}
                  onChange={(e) =>
                    handleChange(index, "firstName", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  value={sh.lastName}
                  onChange={(e) =>
                    handleChange(index, "lastName", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Nationality"
                  className="input input-bordered w-full"
                  value={sh.nationality}
                  onChange={(e) =>
                    handleChange(index, "nationality", e.target.value)
                  }
                  required
                />
              </div>
            ))}

            <button type="submit" className="btn btn-primary w-full">
              Submit Shareholders
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Step2Shareholders;
