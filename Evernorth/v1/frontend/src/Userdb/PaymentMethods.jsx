import { useState } from 'react';

function PaymentMethods() {
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
    },
  ]);

  const handleAddCard = () => {
    // Add logic to handle new card addition
    setPaymentMethods([...paymentMethods]);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Payment Methods</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded hover:bg-blue-50"
        >
          {isEditing ? 'Cancel' : 'Add Payment Method'}
        </button>
      </div>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{method.type}</p>
                <p className="text-sm text-gray-600">
                  **** **** **** {method.last4}
                </p>
                <p className="text-sm text-gray-600">Expires: {method.expiry}</p>
              </div>
              {method.isDefault && (
                <span className="px-2 py-1 text-sm bg-blue-100 text-blue-900 rounded">
                  Default
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="text-lg font-medium mb-4">Add New Payment Method</h3>
          {/* Add payment form fields here */}
          <button
            onClick={handleAddCard}
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Add Card
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;