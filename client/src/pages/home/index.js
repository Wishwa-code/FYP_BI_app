import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RocketOutlined, MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar"
import '../../styles.css';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [hovered5, setHovered5] = useState(false);

  const defaultSrc1 = "/predict2.png"; 
  const hoverSrc1 = "/predict1.gif";

  const defaultSrc2 = "/news2.png"; 
  const hoverSrc2 = "/news1.gif";

  const defaultSrc3 = "/escrow2.png"; 
  const hoverSrc3 = "/escrow1.gif";

  const defaultSrc4 = "/buyers2.png"; 
  const hoverSrc4 = "/buyers1.gif";

  const defaultSrc5 = "/lessons2.png"; 
  const hoverSrc5 = "/lessons1.gif";

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      {/*const response = await fetch(`/api/users?location=USA&timeframe=lastWeek&query=${searchTerm}`); 
      const data = await response.json();
    setSearchResults(data);*/}
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error (e.g., display an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };




  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUserName(userInfo.name || 'Guest');
    }
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ... your other state variables and functions ...

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); 
    window.location.href = '/login'; 
  };

  return (
        <div className="bg-indigo-50 h-screen flex-col">
          <header className="z-10 bg-teal-950 sticky top-0">
            <div className="flex justify-between  px-4 py-2 border-b ">
              <div class="justify-center pt-1">
                <img src="/logo.png" alt="Your Company Logo" className="w-18 h-6  mt-1" />
              </div>

              <div className="bg-white rounded-lg flex items-center  w-2/5 "> {/* Container styling */}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Try searching 'Best Coconut markets'"
                    className="w-full py-2 pl-4  rounded-lg" 
                  />
                  {isLoading && (
                    <p className="mt-2 text-gray-500">Loading...</p> 
                  )}

                  <ul className="mt-4">
                    {searchResults.map(user => (
                      <li 
                        key={user.id}
                        className="px-4 py-2 border-b border-gray-200 last:border-none" 
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-300 rounded-full mr-2"></div> {/* Placeholder for user avatar */}
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
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
                          <div className="flex  top-14 left-0 right-0 text-left indent-2">
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
                            <div className="flex flex-row py-8 ">
                              <div className=" flex flex-col-reverse bg-gray-200 hover:bg-white font-medium  text-teal-950  p-4  rounded-3xl mx-4 my-auto py-auto ">
                                <Link to="/identify" className="  ">
                                  <AreaChartOutlined style={{ fontSize: '26px' }}/>
                                  <img 
                                    src={hovered1 ? hoverSrc1 : defaultSrc1}
                                    alt="My Image"
                                    onMouseEnter={() => setHovered1(true)}
                                    onMouseLeave={() => setHovered1(false)}
                                    className="w-96 h-56 my-4"
                                  /> 
                                  <div className="border-solid border-2 border-amber-500 pl-2 pr-2 pt-2 pb-2 mb-4 rounded-lg hover:bg-teal-950 hover:text-amber-500 hover:border-0">Predict Sales </div>  
                                </Link>
                              </div>
                              <div className=" flex flex-col-reverse bg-gray-200 hover:bg-white font-medium  text-teal-950  p-4  rounded-3xl mx-4 my-auto">
                                <Link to="/worldwide-news" className=""> 
                                <GlobalOutlined style={{ fontSize: '26px' }}/>
                                  <img 
                                    src={hovered2 ? hoverSrc2 : defaultSrc2}
                                    alt="My Image"
                                    onMouseEnter={() => setHovered2(true)}
                                    onMouseLeave={() => setHovered2(false)}
                                    className="w-96 h-56 my-4"
                                  /> 
                                  
                                  <div className="border-solid border-2 border-amber-500 pl-2 pr-2 pt-2 pb-2 mb-4 rounded-lg hover:bg-teal-950 hover:text-amber-500 hover:border-0">Agri News</div>
                                </Link>
                              </div>
                              <div className="flex flex-col-reverse bg-gray-200 hover:bg-white font-medium  text-teal-950  p-4  rounded-3xl mx-4 my-auto">
                                <Link to="/escrow" className=""> 
                                <DollarCircleOutlined style={{ fontSize: '26px' }}/>
                                  <img 
                                    src={hovered3 ? hoverSrc3 : defaultSrc3}
                                    alt="My Image"
                                    onMouseEnter={() => setHovered3(true)}
                                    onMouseLeave={() => setHovered3(false)}
                                    className="w-96 h-56 my-4"
                                  />
                                  
                                  <div className="border-solid border-2 border-amber-500 pl-2 pr-2 pt-2 pb-2 mb-4 rounded-lg hover:bg-teal-950 hover:text-amber-500 hover:border-0">Go to Escrow</div>
                                </Link>
                              </div>
                              <div className="flex flex-col-reverse bg-gray-200 hover:bg-white font-medium  text-teal-950  p-4  rounded-3xl mx-4 my-auto">
                                <Link to="/find-buyers" className=""> 
                                  <UserOutlined style={{ fontSize: '26px' }}/> 
                                  <img 
                                    src={hovered4 ? hoverSrc4 : defaultSrc4}
                                    alt="My Image"
                                    onMouseEnter={() => setHovered4(true)}
                                    onMouseLeave={() => setHovered4(false)}
                                    className="w-96 h-56 my-4"
                                  />
                                  <div className="border-solid border-2 border-amber-500 pl-2 pr-2 pt-2 pb-2 mb-4 rounded-lg hover:bg-teal-950 hover:text-amber-500 hover:border-0">Find Buyers</div>
                                </Link>
                                
                              </div>
                              <div className="flex flex-col-reverse bg-gray-200 hover:bg-white font-medium text-teal-950  p-4  rounded-3xl mx-4 my-auto">
                                <Link to="/lessions" className="">
                                  <BookOutlined style={{ fontSize: '26px' }}/> 
                                  <img 
                                    src={hovered5 ? hoverSrc5 : defaultSrc5}
                                    alt="My Image"
                                    onMouseEnter={() => setHovered5(true)}
                                    onMouseLeave={() => setHovered5(false)}
                                    className="w-96 h-44 my-10"
                                  />
                                  <div className="border-solid border-2 border-amber-500 pl-2 pr-2 pt-2 pb-2 mb-4 rounded-lg hover:bg-teal-950 hover:text-amber-500 hover:border-0">Find Lessons</div>
                                </Link>
                                
                              </div>
                            </div>
                            <footer class="text-sm text-gray-500 bg-indigo-50 -mb-12">
                                 © 2024 C2W™
                                 | <a href="/home" class="hover:underline text-amber-500">C2W home</a>
                                 | <a href="/home" class="hover:underline text-amber-500">Terms of Service</a>
                                 | <a href="/home" class="hover:underline text-amber-500">Privacy Policy</a>
                                 | <a href="/home" class="hover:underline">Send feedback</a>
                            </footer>
                          </div>
                          
                        </div>
                      </div>          
                        
          </main>
            
                    

                    
                      
                    
                
                
      </div>


  );
};

export default Dashboard;
