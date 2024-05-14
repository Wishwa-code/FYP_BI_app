import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';

const CategoryList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [shopping, setShopping] = useState([]);
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
        <div className="bg-indigo-50">
            <div class="justify-center pt-1 bg-teal-950">
              <h2 class="text-amber-500 text-xl font-bold place-self-center mt-2">Find Buyers</h2>
            </div>
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-50 transition duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4">
          <a href="/home">
            <img src="/logo.png" alt="Your Company Logo" className="w-15 h-8 hover:-translate-y--1 hover:scale-110" />
          </a>
            <button className=" text-neutral-800 focus:outline-none" onClick={toggleMenu}>
              <MenuOutlined />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
            <li><Link to="/identify" className=" text-neutral-800 bg-rounded-lg px-3 py-2 flex indent-4 hover:font-medium items-center   font-sans"><AreaChartOutlined /> Market Predictions</Link></li>
            <li><Link to="/worldwide-news" className="text-neutral-800 flex items-center indent-4 px-3 p3-2 hover:font-medium"><GlobalOutlined /> Worldwide News</Link></li>
            
            <li><Link to="/find-buyers" className=" text-white bg-teal-950 px-6 py-2 flex items-center indent-4 hover:font-medium px-3 py-2 font-medium" ><UserOutlined /> Find Buyers</Link></li>
            <li><Link to="/lessions" className=" text-neutral-800 flex items-center indent-4 px-3 p3-2 hover:font-medium"><BookOutlined /> Find Lessons</Link></li>
            <li><Link to="/escrow" className=" text-neutral-800 flex items-center indent-4 px-3 py-2 hover:font-medium"><DollarCircleOutlined /> Go to Escrow</Link></li>
            <li><Link to="/home" className="border-opacity-30 animate-pulse border-amber-500 rounded-lg border-2 border-dashed text-amber-500 flex items-center indent-4 px-3 py-2 hover:font-medium " ><RocketOutlined /> C2W Premium</Link></li>
            </ul>
          </nav>
        </div>

        
          <header className="bg-teal-950 shadow">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <button className="text-white focus:outline-none hover:text-amber-500" onClick={toggleMenu}>
                <MenuOutlined />
              </button>
              <div className="flex items-center">
                <div className="text-sm font-medium text-white mr-4">{userName}</div>
                <button onClick={handleLogout} className="flex items-center text-white hover:text-amber-500">
                  <LogoutOutlined className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </header>
            <div className="container mx-auto px-4 py-8">
                    <input
                        type="text"
                        placeholder="Search places..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
                    />
                    <button onClick={handleSearchplaces} className="search-button bg-teal-950 hover:bg-emerald-500 hover:text-black text-white font-semibold px-4 py-2 rounded-lg focus:outline-none mr-4">
                        Search Places
                    </button>
                    <button onClick={handleSearchshop} className="search-button bg-teal-950 hover:bg-emerald-500 hover:text-black text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">
                        Search sellers
                    </button>
                <div className="category-list">
                    {isLoading && <p>Loading...sellers</p>}
                    {error && <p className="error-message">{error}</p>}
                    <ul className="category-results mt-4 grid grid-cols-4 gap-4 h-full">
                        {shopping.map((shop, index) => (
                          <div className="">
                            <div class="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                                <a href={shop.imageUrl}>
                                    <img class="p-8 rounded-t-lg mx-auto" src={shop.imageUrl} alt="product image" />
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

                          </div>
                        ))}
                    </ul>
                </div>
                <div className="category-list">
                    {isLoading2 && <p>Loading...Business</p>}
                    {error && <p className="error-message">{error}</p>}
                    <ul className="category-results mt-4 flex flex-col">
                        {places.map((place, index) => (
                          <div className="">
                            
                            <div class="w-full p-4 text-center bg-white border rounded-lg shadow sm:p-8 mb-12">
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
                          </div>
                        ))}
                    </ul>
                          
                    
                </div>
            </div>
            
            <div className="bg-indigo-50 pt-5 pb-5">
      <footer class="bg-teal-950 rounded-lg shadow dark:bg-gray-900 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 bg-teal-950 rounded-lg">
          <div class="sm:flex sm:items-center sm:justify-between ">
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

export default CategoryList;
