import { 
  UserCircleIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const FTable = () => {
  const users = [
    {
      id: 1,
      name: 'Sam Mojumder',
      avatar: 'https://scontent.fdac190-1.fna.fbcdn.net/v/t39.30808-6/470819550_1344243930076497_8248540709248753744_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFpR0J1vYqeYjCif6bXPn2KRo0CmfR_2iFGjQKZ9H_aIe6d8wX27lCh1v1M9ObLP0zz_U-w_tKzCjNP6Fd91WPL&_nc_ohc=QygCZMgV49sQ7kNvwH2Vg1J&_nc_oc=AdmP4_RTM2RiXUu6rcjP7HUzHeieNClwcbx5hv0UsfYCTXC-DyqTv3lo-U4v9dAGGZ8&_nc_zt=23&_nc_ht=scontent.fdac190-1.fna&_nc_gid=PJ-rKbLUBDgWaLcqJyKvXw&oh=00_AflEAnaiIu63NN4d8KRpW9RMd0RLYW8vsxHS-Yu98PTgTQ&oe=694ED3E6',
      title: 'Software developer',
      email: 'apomojumder688@gmail.com',
      phone: '+8801630795443',
      location: 'Dhaka,Bangladesh',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=32',
      title: 'Product Designer',
      email: 'alex@example.com',
      phone: '+1 234 567 8901',
      location: 'San Francisco, USA',
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Sarah Miller',
      avatar: 'https://i.pravatar.cc/150?img=5',
      title: 'Frontend Developer',
      email: 'sarah@example.com',
      phone: '+1 234 567 8902',
      location: 'London, UK',
      joinDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Mike Davis',
      avatar: 'https://i.pravatar.cc/150?img=8',
      title: 'Backend Engineer',
      email: 'mike@example.com',
      phone: '+1 234 567 8903',
      location: 'Toronto, Canada',
      joinDate: '2023-04-05'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">FTable - Team Members</h1>
            <p className="text-gray-600 mt-1">Manage and view all team members</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Add Member
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCircleIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                        {user.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.joinDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Now</p>
              <p className="text-2xl font-bold mt-1">18</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <PlusIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Experience</p>
              <p className="text-2xl font-bold mt-1">2.5 yrs</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing PlusIcon component
const PlusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default FTable;