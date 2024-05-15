import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Sidebar, { SidebarItem } from "../../components/Sidebar"
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { Settings } from "lucide-react";

const CategoryList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [shopping, setShopping] = useState([]);
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [error, setError] = useState(null);
    const [country, setCountry] = useState('');
    const [productID, setProductID] = useState('');

    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleProductChange = (e) => setProductID(e.target.value);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      }


    const fetchData = async () => {
        if (!searchTerm) {
            return; // Return early if there is no search term
        }
        setIsLoading(true);
        setError(null);
        try {
            const options = {
                method: 'POST',
                url: 'https://google.serper.dev/Shopping',
                headers: {
                    'X-API-KEY': '050a7013cd12f35fa3de39c39fe5a44d1a46a63a',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ q: searchTerm })
            };
            const response = await axios.request(options);
            setShopping(response.data.shopping);
            setIsLoading(false);
        } catch (error) {
            setError('Failed to fetch places: ' + error.message);
            setIsLoading(false);
        }
    };

    const fetchDatabis = async () => {
      if (!searchTerm) {
          return; // Return early if there is no search term
      }
      setIsLoading2(true);
      setError(null);
      try {
          const options = {
              method: 'POST',
              url: 'https://google.serper.dev/Places',
              headers: {
                  'X-API-KEY': '050a7013cd12f35fa3de39c39fe5a44d1a46a63a',
                  'Content-Type': 'application/json'
              },
              data: JSON.stringify({ q: searchTerm })
          };
          const response = await axios.request(options);
          setPlaces(response.data.places);
          setIsLoading2(false);
      } catch (error) {
          setError('Failed to fetch places: ' + error.message);
          setIsLoading2(false);
      }
  };

  const handleSearchplaces = () => {
    fetchDatabis();
    setShopping([]);
    
  };

    const handleSearchshop = () => {
        fetchData();
        setPlaces([]);
    };

    useEffect(() => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUserName(userInfo.name || 'Guest');
      }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo'); 
        window.location.href = '/login'; 
    };

    return (
        <div className=" h-screen flex-col">
          <header className="z-10 bg-teal-950 sticky top-0">
            <div className="flex justify-between  px-4 py-2 border-b ">
              <div class="justify-center pt-1">
                <img src="/logo.png" alt="Your Company Logo" className="w-18 h-6  mt-1" />
              </div>
              <div className="flex flex-row justify-center">
                <input
                   type="text"
                   placeholder="Search products..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="search-input py-2 px-2 rounded-lg bg-white text-base border-gray-300 shadow-sm ml-2 mr-2"                     
                />
                <div class="inline-flex rounded-md shadow-sm" role="group">

                    <button type="button" onClick={handleSearchplaces} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        Search Places
                    </button>
                    <button type="button" onClick={handleSearchshop} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        Search sellers
                    </button>                  
                </div>  
              </div>  
              <div className="flex items-center">
                <button className="text-white focus:outline-none rounded-lg p-2 hover:text-amber-500 flex items-center" >
                    <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
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
          <main className="flex-1 h-full">
            <div className="flex flex-col">  
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
                          

                            <div className="container px-4 py-8 bg-indigo-50">
                                    
                                    
                                        <div className="category-list">
                                            {isLoading && <p>Loading...sellers</p>}
                                            {error && <p className="error-message">{error}</p>}
                                            <ul className="category-results mt-4 grid grid-cols-3 gap-4 h-full content-end">
                                                {shopping.map((shop, index) => (
                                                    <div class="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                                                        <a href={shop.imageUrl}>
                                                            <img class="p-4 size-40 rounded-t-lg mx-auto" src={shop.imageUrl} alt="product image" />
                                                        </a>
                                                        <div class="px-5 pb-5">
                                                            <a href="#">
                                                                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{shop.title}</h5>
                                                                <h5 class="text-1xl font-regular tracking-tight text-gray-100 opacity-65 dark:text-white">{shop.delivery}</h5>
                                                            </a>
                                                            <div class="flex items-center mt-2.5 mb-5">
                                                                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                    </svg>
                                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                    </svg>
                                                                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                    </svg>
                                                                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                    </svg>
                                                                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                                    </svg>
                                                                </div>
                                                                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 ml-4 ">{shop.rating}Stars</span>
                                                            </div>
                                                            <div class="flex items-center justify-between">
                                                                <span class="text-3xl font-bold text-gray-900 dark:text-white">{shop.price}</span>
                                                                <a href={shop.link} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Visit Website</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="category-lis w-full">
                                            {isLoading2 && <p>Loading...Business</p>}
                                            {error && <p className="error-message">{error}</p>}
                                            <ul className="grid grid-cols-2 gap-4 h-full mx-auto justify-center">
                                                {places.map((place, index) => (

                                                    
                                                    <div class="w-full p-4 text-center bg-white border rounded-lg shadow sm:p-8 mb-4">
                                                        <h5 class="mb-2 text-3xl font-bold text-slate-400 ">{place.title}</h5>
                                                        <p class="mb-0 text-base text-gray-500 sm:text-lg ">{place.address}</p>
                                                        <p class="mb-0 text-base text-gray-500 sm:text-lg ">{place.category}</p>
                                                        <p class="mb-5 text-base text-gray-500 sm:text-lg  ml-2">Rating :{place.rating} out of {place.ratingCount} reviews</p>
                                                        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                                                            <a href={place.website} class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                <FontAwesomeIcon icon={faGlobe} />
                                                                <div class="text-left rtl:text-right">
                                                                    <div class="mb-1 text-xs pl-3">Click here</div>
                                                                </div>
                                                            </a>
                                                            <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                <FontAwesomeIcon icon={faPhone} />
                                                                <div class="text-left rtl:text-right pl-3">
                                                                    <div class="mb-1 text-xs">No.{place.phoneNumber}</div>

                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>

                                                ))}
                                            </ul>   
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
    );
};

export default CategoryList;
