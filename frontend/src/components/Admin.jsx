import React, { useEffect, useState } from "react";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyle = (status) => ({
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    backgroundColor: status === "COMPLETED" ? "#16a34a" : "#f59e0b",
  });

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>Admin Dashboard</h2>
      <p style={subtitleStyle}>Manage Registered Companies</p>

      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th style={thStyle}>Company Name</th>
              <th style={thStyle}>Capital</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Shareholders</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <React.Fragment key={company.id}>
                <tr style={rowStyle}>
                  <td style={tdStyle}>{company.name}</td>
                  <td style={tdStyle}>₹ {company.totalCapital}</td>
                  <td style={tdStyle}>
                    <span style={getStatusStyle(company.status)}>
                      {company.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{company.shareholders?.length || 0}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => toggleExpand(company.id)}
                      style={buttonStyle}
                    >
                      {expandedId === company.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expandedId === company.id && (
                  <tr>
                    <td colSpan="5" style={expandedSectionStyle}>
                      {company.shareholders &&
                      company.shareholders.length > 0 ? (
                        company.shareholders.map((sh) => (
                          <div key={sh.id} style={shareholderCard}>
                            <div>
                              <strong>
                                {sh.firstName} {sh.lastName}
                              </strong>
                            </div>
                            <div style={{ opacity: 0.7 }}>{sh.nationality}</div>
                          </div>
                        ))
                      ) : (
                        <p style={{ opacity: 0.6 }}>No shareholders found</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ===== STYLES ===== */

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  padding: "40px",
  fontFamily: "Arial, sans-serif",
  color: "#e5e7eb",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "5px",
};

const subtitleStyle = {
  marginBottom: "30px",
  opacity: 0.7,
};

const cardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const headerRowStyle = {
  backgroundColor: "#111827",
  textAlign: "left",
};

const thStyle = {
  padding: "14px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#9ca3af",
  borderBottom: "1px solid #374151",
};

const tdStyle = {
  padding: "16px 14px",
};

const rowStyle = {
  borderBottom: "1px solid #374151",
  transition: "background 0.2s ease",
};

const buttonStyle = {
  padding: "6px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: "500",
};

const expandedSectionStyle = {
  backgroundColor: "#111827",
  padding: "20px",
};

const shareholderCard = {
  backgroundColor: "#1f2937",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "10px",
};

export default Admin;
