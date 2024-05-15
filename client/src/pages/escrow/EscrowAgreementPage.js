import React, { useState, useEffect } from 'react';
import { RocketOutlined, MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Settings } from "lucide-react";



const EscrowAgreementPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Wishwa', role: 'seller' },
    { id: 2, name: 'Salman', role: 'seller' },
    { id: 3, name: 'Josh', role: 'seller' },
    { id: 3, name: 'Prabahth', role: 'seller' },
    { id: 3, name: 'Kavisha', role: 'seller' },
    { id: 3, name: 'Chamath', role: 'seller' },
    { id: 3, name: 'Chaminda', role: 'seller' },
    { id: 3, name: 'Saman', role: 'seller' },
    { id: 3, name: 'Lakshika', role: 'seller' },
    { id: 3, name: 'Nethmi', role: 'seller' },
    { id: 4, name: 'Charlie', role: 'buyer' },
    { id: 4, name: 'Bob', role: 'buyer' },
    { id: 4, name: 'Alex', role: 'buyer' },
    { id: 4, name: 'Kevin', role: 'buyer' },
    { id: 4, name: 'Tedd', role: 'buyer' },
    { id: 4, name: 'John', role: 'buyer' },
    { id: 4, name: 'Joey', role: 'buyer' },
    { id: 4, name: 'Mathhew', role: 'buyer' },
    { id: 4, name: 'Shenon', role: 'buyer' }
    // ... other dummy users
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [agreements, setAgreements] = useState([
    { id: 1, loggedInUserName: 'Wishwa', role: 'seller', selectedUserName: 'Bob', progress:'50'},
    { id: 2, loggedInUserName: 'Salman', role: 'seller', selectedUserName: 'Bob', progress:'20' },
    { id: 3, loggedInUserName: 'Josh', role: 'seller' , selectedUserName: 'Bob', progress:'70'},
    { id: 3, loggedInUserName: 'Prabahth', role: 'seller', selectedUserName: 'Bob', progress:'10'}
  ]);
  const [hasPaidDeposit, setHasPaidDeposit] = useState(false);
  const [hasReceivedShipment, setHasReceivedShipment] = useState(false);
  const [isPaymentReleased, setIsPaymentReleased] = useState(false);
  const [displayedAgreements, setDisplayedAgreements] = useState([]);
  const [agreements_view, setagreementsView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }


  useEffect(() => {
    // Simulate fetching logged-in user info (replace with actual authentication)
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setLoggedInUser(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleCreateAgreement = () => {
    if (selectedUser) {
      const newAgreement = {
        loggedInUserName: loggedInUser.name,
        selectedUserName: selectedUser.name,
        progress: 0, // Could be expanded to track progress
      };
      setAgreements([...agreements, newAgreement]);
      setSelectedUser(null);
    }
  };

  const handleSendDeposit = () => {
    setHasPaidDeposit(true);
    console.log('50% payment sent to escrow');
  };

  const hasAgreementsWithBuyer = (agreements, selectedUser)  =>{
    if (!selectedUser) return false; // Handle the case where no buyer is selected
  
    return agreements.some((agreement) => agreement.selectedUserName === selectedUser);
  }

  const handleViewAgreements = (selectedUser) => {
    const filteredAgreements = agreements.filter(
      (agreement) => agreement.selectedUserName === selectedUser

    );
    setDisplayedAgreements(filteredAgreements);
    
    // Do something to display the filteredAgreements, e.g., 
    console.log("Agreements:", filteredAgreements);
    
    return filteredAgreements
  };

  const handleShipmentConfirmation = () => {
    setHasReceivedShipment(true);
    console.log('Shipment received confirmation');
  };

  const handleReleasePayment = () => {
    setIsPaymentReleased(true);
    console.log('Remaining payment released to seller');
  };
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  const handleSendShipment = (agreement) => {
    // ... logic to send shipment ...
  };

  const handleCompleteShipment = (agreement) => {
    // ... logic to complete shipment ...
  };

  
  const [formData, setFormData] = useState({
    sellerName: '',
    progress: 0,
  });

  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplayedAgreements([...displayedAgreements, formData]);
    setFormData({ selectedUserName: '', progress: 0 });
  };
  useEffect(() => {
    // Simulate fetching the logged-in user's info from local storage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setLoggedInUser(userInfo);
    }
  }, []);

  
  
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUserName(userInfo.name || 'Guest');
    }
  }, []);

  return (
    <>
    <div className="bg-indigo-50 h-screen flex-col">
          <header className="z-10 bg-teal-950 sticky top-0">
            <div className="flex justify-between  px-4 py-2 border-b ">
              <div class="justify-center pt-1">
                <img src="/logo.png" alt="Your Company Logo" className="w-18 h-6  mt-1" />
              </div>
                


              <div className="flex items-center">
              <button
                
                className="text-white focus:outline-none rounded-lg p-2 hover:text-amber-500 flex items-center" // Tailwind classes
              >
                <QuestionMarkCircleIcon className="h-6 w-6 mr-2" /> {/* Icon (optional) */}
              </button>
                
                <button 
                  id="dropdownInformationButton" 
                  data-dropdown-toggle="dropdownInformation" 
                  class="text-white font-medium text-center inline-flex " 
                  type="button"
                  aria-expanded="false" 
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
              
                  <img src="/userprofile.png" alt="Your Company Logo" className="mt-1 size-8" />
                </button>
                <div id="dropdownInformation" className={`absolute right-0 mt-72 mr-4 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg">
                      <a href="#" class="block px-4 py-2 ">
                        <div>{userName}</div>
                        <div class="font-medium truncate">wishwajayanath@gmail.com</div>
                    </a>
                      
                    </div>
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Recommendations</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Messages</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                      </li>
                    </ul>
                    <div class="py-2">
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-white">
                        <button onClick={handleLogout} className="">
                          <LogoutOutlined className="mr-2" /> Sign out
                        </button>
                      </a>
                    </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 bg-indigo-50 ">
            <div className="flex flex-col h-[calc(100lvh-56px)]">  
                        <div className="flex flex-row ">
                          <div className="top-14 left-0 right-0 text-left indent-2">
                            <Sidebar>
                              <SidebarItem icon={<AreaChartOutlined />} text="Predictions" alert to="/identify"/>
                              <SidebarItem icon={<GlobalOutlined />} text="News"  to="/worldwide-news" />
                              <SidebarItem icon={<UserOutlined />} text="Buyers" alert to="/find-buyers"/>
                              <SidebarItem icon={<BookOutlined />} text="Lessons" to="/lessions"/>
                              <SidebarItem icon={<DollarCircleOutlined />} text="Escrow" to="/escrow"/>
                              <SidebarItem icon={<RocketOutlined />} text="Premium" to="/home"/>
                              <hr className="my-3"/>
                              <SidebarItem icon={<Settings size={20} />} text="Settings"/>
                            </Sidebar>
                          </div>
                          
                          <div className="flex flex-col">
                          <div className="max-w-xl mx-auto p-4">
        
                            {loggedInUser && (
                              <div className="bg-white shadow-md rounded p-6 mb-4">
                                <p className="mb-2">Welcome, {loggedInUser.name}</p>

                                <h2 className="font-bold mb-3">Select Your Agreement Partner</h2>

                                {loggedInUser.role === '' ? (
                                  <div> 
                                    {/* Display sellers */}
                                    {users
                                      .filter((user) => user.role === 'seller')
                                      .map((user) => (
                                        <button
                                          key={user.id}
                                          className={`mr-2 mb-2 py-2 px-4 rounded border `}
                                          onClick={() => handleUserSelection(user)}
                                        >
                                          {user.name}
                                        </button>
                                      ))}
                                  </div>
                                ) : (
                                  <div>
                                    {/* Display buyers */}
                                    {users
                                      .filter((user) => user.role === 'buyer')
                                      .map((user) => (
                                        <button
                                          key={user.id}
                                          className={`mr-2 mb-2 py-2 px-4 rounded border `}
                                          onClick={() => handleUserSelection(user)}
                                        >
                                          {user.name}
                                        </button>
                                      ))}
                                  </div>
                                )}

            {selectedUser && (
              <>
                {selectedUser && hasAgreementsWithBuyer(agreements, selectedUser.name) && (
                        <button className="mr-2 mb-2 py-2 px-4 rounded border bg-yellow-500 hover:bg-yellow-600" onClick={() => handleViewAgreements(selectedUser.name)}>
                          View Agreements
                        </button>
                )}
                      
                {!loggedInUser.role && (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mt-4 mb-4"
                    onClick={handleCreateAgreement}
                  >
                    Create Agreement
                  </button>
                )}
                {displayedAgreements.length > 0 && (
                  <div className="mx-auto mt-4 mb-4">
                    <h2>Agreements with {selectedUser.name}:</h2>
                    <table className="table-auto mx-auto mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Seller</th>
                          <th className="px-4 py-2 text-left">Progress</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedAgreements.map((agreement) => (
                      <tr key={agreement.id}>
                        {/* Table Data (<td>) Cells */}
                        <td className="px-4 py-2 border border-gray-200">{agreement.selectedUserName}</td>
                        <td className="px-4 py-2 border border-gray-200">{agreement.progress}</td>
                        <td className="px-4 py-2 border border-gray-200">
                          {agreement.progress < 50 && (
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleSendDeposit(agreement)}
                            >
                              Send 50% Deposit
                            </button>
                          )}
                          {agreement.progress === 50 && (
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleSendShipment(agreement)}
                            >
                              Send Shipment
                            </button>
                          )}
                          {agreement.progress > 50 && (
                            <button
                              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleCompleteShipment(agreement)}
                            >
                              Complete Shipment
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            )}
              </>
            )}
            <div> 
            <div className="container mx-auto">
              {agreements_view === false && (
                <>
                  <h2>Add Agreement</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="sellerName" className="block text-gray-700 text-sm font-bold mb-2">
                        Seller Name:
                      </label>
                      <input
                        type="text"
                        id="sellerName"
                        name="sellerName"
                        value={formData.selectedUserName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="progress" className="block text-gray-700 text-sm font-bold mb-2">
                        Progress (%):
                      </label>
                      <input
                        type="number"
                        id="progress"
                        name="progress"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add Agreement
                    </button>
                  </form>
                </>
              )}

              {displayedAgreements.length > 0 && (
                <div className="mx-auto mt-4 mb-4">
                  <h2>Agreements</h2>
                  <table className="table-auto mx-auto mt-4">
                    {/* ... rest of your table definition with styling ... */}
                  </table>
                </div>
              )}
            </div>
            
            </div>
            
          </div>
        )}
        
      </div>
                                
                          </div>
                          
                          
                        </div>
                        <footer class="text-sm text-gray-500 bg-indigo-50 pb-2">
                                 © 2024 C2W™
                                 | <a href="/home" class="hover:underline text-amber-500">C2W home</a>
                                 | <a href="/home" class="hover:underline text-amber-500">Terms of Service</a>
                                 | <a href="/home" class="hover:underline text-amber-500">Privacy Policy</a>
                                 | <a href="/home" class="hover:underline">Send feedback</a>
                            </footer>
                      </div>          
                        
          </main>
            
                    

                    
                      
                    
                
                
      </div>
    </>
    
  );
};

export default EscrowAgreementPage;



