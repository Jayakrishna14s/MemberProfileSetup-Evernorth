import { useState } from 'react';

function Address() {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    country: 'USA',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save changes
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Address</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded hover:bg-blue-50"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="space-y-4">
        {Object.entries(address).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={value}
                onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                className="mt-1 p-2 border rounded"
              />
            ) : (
              <p className="mt-1 text-gray-800">{value}</p>
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

export default Address;