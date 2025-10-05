import React from 'react';

const campOrgs = [
  { name: "GSoC", value: "gsoc" },
  { name: "LFX", value: "lfx" },
  { name: "Outreachy", value: "outreachy" }
];

interface CampOrgFilterProps {
  selectedCamp: string;
  onCampChange: (camp: string) => void;
}

const CampOrgFilter: React.FC<CampOrgFilterProps> = ({ selectedCamp, onCampChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="camp-org" className="block text-sm font-medium text-gray-700">
        Filter by Camp Organization
      </label>
      <select
        id="camp-org"
        value={selectedCamp}
        onChange={(e) => onCampChange(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      >
        <option value="">All</option>
        {campOrgs.map((org) => (
          <option key={org.value} value={org.value}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CampOrgFilter;