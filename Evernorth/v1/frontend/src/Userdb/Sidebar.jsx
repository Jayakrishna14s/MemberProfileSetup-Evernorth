import { UserIcon, CreditCardIcon, HomeIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'userInfo', name: 'User Information', icon: UserIcon },
    { id: 'payment', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'address', name: 'Address', icon: HomeIcon },
    { id: 'health', name: 'Health Conditions', icon: HeartIcon },
    { id: 'dependents', name: 'Dependents', icon: UsersIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <img src="src\components\evernorth-logo.png" alt="Evernorth Logo" className="h-8 mb-8" />
      </div>
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === tab.id
                  ? 'border-r-4'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? 'rgba(62, 255, 192, 0.2)' : undefined,
                color: activeTab === tab.id ? 'rgba(3, 92, 103, 1)' : undefined,
                borderColor: activeTab === tab.id ? 'rgba(3, 92, 103, 1)' : undefined,
              }}
            >
              <Icon className="h-5 w-5 mr-3" />
              {tab.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;