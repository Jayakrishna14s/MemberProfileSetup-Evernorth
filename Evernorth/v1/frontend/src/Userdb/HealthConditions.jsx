import { useState } from 'react';

function HealthConditions() {
  const [isEditing, setIsEditing] = useState(false);
  const [healthInfo, setHealthInfo] = useState({
    conditions: ['Asthma', 'Hypertension'],
    allergies: ['Penicillin', 'Peanuts'],
    medications: ['Albuterol', 'Lisinopril'],
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save changes
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Health Conditions</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded hover:bg-blue-50"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="space-y-6">
        {Object.entries(healthInfo).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-medium capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index] = e.target.value;
                        setHealthInfo({ ...healthInfo, [category]: newItems });
                      }}
                      className="p-2 border rounded flex-1"
                    />
                    <button
                      onClick={() => {
                        const newItems = items.filter((_, i) => i !== index);
                        setHealthInfo({ ...healthInfo, [category]: newItems });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...items, ''];
                    setHealthInfo({ ...healthInfo, [category]: newItems });
                  }}
                  className="text-blue-900 hover:text-blue-700 text-sm"
                >
                  + Add {category.slice(0, -1)}
                </button>
              </div>
            ) : (
              <ul className="list-disc list-inside">
                {items.map((item, index) => (
                  <li key={index} className="text-gray-800">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

export default HealthConditions;