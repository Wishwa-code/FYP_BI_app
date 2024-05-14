import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SaveOutlined, SaveFilled, MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import axios from 'axios';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar"

const NewsComponent = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [productID, setProductID] = useState('');
  const [IsnewsLoading, setIsnewsLoading] = useState(false);

  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleProductChange = (e) => setProductID(e.target.value);

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleSave = (item) => {
    // Bookmarking logic
    const itemExists = savedArticles.find((saved) => saved.id === item.id);
    if (itemExists) {
      // Remove from saved articles if already saved
      setSavedArticles(savedArticles.filter((saved) => saved.id !== item.id)); 
    } else {
      // Add to saved articles
      const newSavedArticle = {
        ...item, 
        savedBy: userName
      };
      setSavedArticles([...savedArticles, newSavedArticle]);
    }

    // Update bookmarked state in newsItems (for icon change)
    setNewsItems(newsItems.map((newsItem) => {
      // Update ONLY the matching item
      if (newsItem.id === item.id) { 
        return { ...newsItem, bookmarked: !newsItem.bookmarked }; 
      } else {
        return newsItem; // Keep other items unchanged
      }
    }));
  };

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/stories/list',
        params: { template: 'CURRENCY', id: 'usdjpy' },
        headers: {
          'X-RapidAPI-Key': 'bd76d4e673msh4b9484eba9d350ep1d327bjsne55e1cf00ce3',
          'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setNewsItems(response.data.stories);
        setIsnewsLoading(true);
      } catch (err) {
        setError('Failed to fetch news');
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUserName(userInfo.name || 'Guest');
    }
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); 
    window.location.href = '/login'; 
  };

  return (
    <>
    <div className="bg-indigo-50 h-screen flex-col">
          <header className="z-10 bg-teal-950 sticky top-0">
            <div className="flex justify-between  px-4 py-2 border-b ">
              <div class="justify-center pt-1">
                <img src="/logo.png" alt="Your Company Logo" className="w-18 h-6  mt-1" />
              </div>
              <div className="flex flex-row justify-center">
                <div className="py-2 px-2 rounded-lg bg-white text-base border-gray-300 shadow-sm mr-2">
                                  <select id="country" value={country} onChange={handleCountryChange}
                                    className="focus:outline-none">
                                    <option value="">Select Country</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Switzerland">Switzerland</option>
                                    {/* More countries */}
                                  </select>
                </div>
                <div className="py-2 px-2 rounded-lg bg-white text-base border-gray-300 shadow-sm ml-2">
                  <select id="product" value={productID} onChange={handleProductChange}
                                    className="focus:outline-none">
                                    <option value="">Select Product</option>
                                    <option value="08011100">Desiccated coconuts</option>
                                    <option value="080112">Cinamonan</option>
                                    {/* Add other product options here */}
                                  </select>
                                </div>  
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
                          <div className="container mx-auto px-4 py-8 bg-indigo-50">
                          {IsnewsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-16 pr-16 ">
                              {newsItems.map((item, index) => (
                                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white mb-2 ml-2 mr-2 hover:-translate-y--1 hover:scale-105">
                                  
                                  <div className="absolute top-5 right-5 mt-3 mr-3 "> 
                                  <a  target="_blank" rel="noopener noreferrer" className="text-amber-500">
                                  {item.bookmarked ? (
                                    <SaveFilled style={{ fontSize: '28px' }} onClick={() => handleSave(item)} /> 
                                  ) : (
                                    <SaveOutlined style={{ fontSize: '28px' }} onClick={() => handleSave(item)} /> 
                                  )}
                                  </a>
                                  </div>
                                  {item.thumbnailImage && (
                                    <img className="w-full h-48 object-cover" src={item.thumbnailImage} alt="News thumbnail" />
                                    
                                  )}
                                  <a href={item.longURL} target="_blank" rel="noopener noreferrer" className="text-neutral-800">
                                  <div className="px-6 py-4 ">
                                    <div className="text-teal-950 font-light text-lg mb-2 text-left leading-5.5">{item.title}</div>
                                    <p className="text-base">
                                      <a href={item.longURL} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-500 hover:text-teal-950">
                                        Read more
                                      </a>
                                    </p>
                                  </div>
                                  </a>
                                  
                                </div>
                              ))}
                            </div>
                            ):(
                              <div class="justify-center ml-[28rem]">
                                <img src="/loading.gif" alt="Your Company Logo" className="rounded-lg w-[28rem] h-[24rem] " />
                              </div>)}
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

export default NewsComponent;
