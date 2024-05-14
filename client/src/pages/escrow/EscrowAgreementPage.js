import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import { RocketOutlined, MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


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
    
    <div className="bg-indigo-50">

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-50 drop-shadow-xl transition duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4">
          <a href="/home">
            <img src="/logo.png" alt="Your Company Logo" className="w-15 h-8 hover:-translate-y--1 hover:scale-110" />
          </a>
           <button className="text-neutral-800 focus:outline-none " onClick={toggleMenu}>
             <MenuOutlined />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li><Link to="/identify" className=" text-neutral-800 flex items-center indent-4 px-3 p3-2 hover:font-medium"><AreaChartOutlined /> Market Predictions</Link></li>
            <li><Link to="/worldwide-news" className=" text-neutral-800 flex items-center indent-4 hover:font-medium px-3 py-2"><GlobalOutlined /> Worldwide News</Link></li>
            
            <li><Link to="/find-buyers" className=" text-neutral-800 flex items-center indent-4 px-3 py-2 hover:font-medium" ><UserOutlined /> Find Buyers</Link></li>
            <li><Link to="/lessions" className=" text-neutral-800 flex items-center indent-4 px-3 p3-2 hover:font-medium"><BookOutlined /> Find Lessons</Link></li>
            <li><Link to="/escrow" className=" text-white bg-rounded-lg bg-teal-950 flex items-center indent-4 px-6 py-2 font-medium font-sans"><DollarCircleOutlined /> Go to Escrow</Link></li>
            <li><Link to="/home" className=" text-amber-500 flex items-center indent-4 px-3 py-2 hover:font-medium" ><RocketOutlined /> C2W Premium</Link></li>
          </ul>
        </nav>
      </div>
      <header className="bg-teal-950 shadow">
        <div class="justify-center pt-1">
            <h2 class="text-amber-500 text-xl font-bold place-self-center mt-2">Escrow Agreements</h2>
        </div>


        <div className="flex justify-between  px-4 py-2 border-b">
          <button className="text-white focus:outline-none pr-2 hover:text-amber-500"  onClick={toggleMenu}>
            <MenuOutlined />
          </button>
          <div className="flex items-center">
            <div className="text-sm font-medium text-white mr-4">Hello! {userName}</div>
            <button onClick={handleLogout} className="flex items-center text-white hover:text-amber-500">
              <LogoutOutlined className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header> 
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
      <div className="bg-indigo-50">
      <footer class="bg-indigo-50 rounded-lg shadow bg-teal-950 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 bg-teal-950 rounded-lg">
          <div class="sm:flex sm:items-center sm:justify-between">
              <a href="/home" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse bg-white ml-5 py-3 px-3 pr-2 rounded-lg bg-opacity-85">
                <img src="/logo.png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a> 
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Predict Markets</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Find Global News</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Find Buyers</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/home" class="hover:underline">C2W™</a>. All Rights Reserved.</span>
        </div>
        </footer>
        </div>
    </div>
    
  );
};

export default EscrowAgreementPage;



