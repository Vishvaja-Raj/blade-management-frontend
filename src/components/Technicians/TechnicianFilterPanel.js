export default function TechnicianFilterPanel({ technicians, selected, onChange }) {
  return (
    <div className="flex justify-center">
      <div className="mb-6 bg-white p-4 rounded-xl shadow-md w-full max-w-sm">
        <label htmlFor="tech-select" className="block text-sm font-semibold text-gray-800 mb-2">
          Technician Filter
        </label>
        <select
          id="tech-select"
          value={selected || ''}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        >
          <option value="">-- All Technicians --</option>
          {technicians.map((tech) => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
