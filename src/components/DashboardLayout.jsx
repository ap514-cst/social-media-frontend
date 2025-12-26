import { CgProfile } from "react-icons/cg"
import { HiOutlineUpload } from "react-icons/hi";
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  UserGroupIcon,
  PlayCircleIcon,
  ShoppingBagIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  TableCellsIcon,
  PlusIcon,
  VideoCameraIcon,
  PhotoIcon,
  FaceSmileIcon,

} from '@heroicons/react/24/outline';

const DashboardLayout = ({ setIsAuthenticated }) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const leftMenuItems = [
    { path: '/', name: 'Home', icon: <HomeIcon className="w-6 h-6 md:w-7 md:h-7" /> },
    { path: '/profile', name: 'Profile', icon: <CgProfile className="w-5 h-5" /> },
    { path: '/upload', name: 'Upload', icon: <HiOutlineUpload className="w-5 h-5" /> },
    { path: '/ftable', name: 'FTable', icon: <TableCellsIcon className="w-6 h-6 md:w-7 md:h-7" /> },
    { path: '/sui', name: 'SUI', icon: <UserGroupIcon className="w-6 h-6 md:w-7 md:h-7" /> },
    { path: '/watch', name: 'Watch', icon: <PlayCircleIcon className="w-6 h-6 md:w-7 md:h-7" /> },
    { path: '/marketplace', name: 'Marketplace', icon: <ShoppingBagIcon className="w-6 h-6 md:w-7 md:h-7" /> },
    { path: '/settings', name: 'Settings', icon: <Cog6ToothIcon className="w-6 h-6 md:w-7 md:h-7" /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  
  };
  const hanlderSearch=async(e)=>{
    let key =e.target.value;
    let result=await fetch(`http://localhost:2002/api/products/search/${key}`)
    result=await result.json();
    if(result){
      
    }
  }


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Facebook-style Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo & Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
              
              {/* Logo */}
              <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                <span >GMGTNF</span>
              </Link>
              
              {/* Desktop Search */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  onChange={(e)=>{hanlderSearch}}
                  placeholder="Search GMGTNF"
                  className="w-56 lg:w-64 xl:w-80 pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
            </button>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
              <div className="fixed inset-0 bg-white z-50 lg:hidden">
                <div className="flex items-center p-4 border-b">
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="mr-4"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search hønhend"
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Center: Main Navigation Icons - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-1">
              {leftMenuItems.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-center w-16 xl:w-20 h-14 ${
                    location.pathname === item.path
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Create Button - Desktop Only */}
              <button className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                <PlusIcon className="w-5 h-5" />
                <span className="hidden xl:inline">Create</span>
              </button>

              {/* Messenger */}
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full relative">
                <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications */}
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full relative">
                <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  5
                </span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium"></span>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-lg border py-2 z-40">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">See your profile</p>
                      </div>
                    </Link>
                    <div className="border-t my-2"></div>
                    {leftMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-5 h-5">{item.icon}</div>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <div className="border-t my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <Link to="/profile" className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-lg shadow sticky top-40">
              {leftMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className={`p-1 rounded-md ${
                    location.pathname === item.path ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                  </div>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Sidebar Menu */}
          <div className={`
            fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <Link 
                    to="/" 
                    className="text-xl font-bold text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
    
                  </Link>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </Link>
              </div>

              <nav className="p-2">
                {leftMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg my-1 ${
                      location.pathname === item.path 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t mt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            <Outlet />
          </div>

          {/* Right Sidebar - Hidden on Mobile, Show on Large Screens */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            {/* Birthday */}
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Birthdays</h3>
                <span className="text-blue-600 text-sm">See all</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaceSmileIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">John's birthday is today</p>
                  <p className="text-sm text-gray-500">Wish him a happy birthday!</p>
                </div>
              </div>
            </div>

            {/* Sponsored */}
            <div className="bg-white rounded-lg shadow p-4 sticky top-52">
              <h3 className="font-semibold mb-3">Sponsored</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="w-full h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
                  <p className="font-medium">Learn React in 30 Days</p>
                  <p className="text-sm text-gray-500">reactcourse.com</p>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="bg-white rounded-lg shadow p-4 sticky top-80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Contacts</h3>
                <div className="flex space-x-2">
                  <VideoCameraIcon className="w-5 h-5 text-gray-500" />
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                {['Alex Johnson', 'Sarah Miller', 'Mike Davis', 'Emma Wilson'].map((contact) => (
                  <div key={contact} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                          alt={contact}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <span className="font-medium text-sm">{contact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-20">
        <div className="flex justify-around items-center h-16">
          {leftMenuItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <div className="w-6 h-6">
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add padding for bottom navigation */}
      <div className="pb-16 lg:pb-0"></div>
    </div>
  );
};

export default DashboardLayout;