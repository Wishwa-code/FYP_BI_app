import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RocketOutlined, MenuOutlined, AreaChartOutlined, GlobalOutlined, DollarCircleOutlined, UserOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Example video data
const videoData = [
    { 
        id: 1, 
        url: "https://youtu.be/OL3U9Jzo5ao", 
        thumbnail: "https://img.youtube.com/vi/OL3U9Jzo5ao/maxresdefault.jpg", 
        title: "Export Business Ideas Sinhala| Ranjan Hanchapola |Simplebooks", 
        description: "You’ve decided to start an export business in Sri Lanka? Not sure of what good or service to go ahead with? We can help you build an export plan! Meet Ranjan Hanchapola, CEO and Founder of Cap Ceylon PVT LTD. He’ll give you advice on potential goods and services that have international demand and help you build a plan." 
    },
    { 
        id: 2, 
        url: "https://youtu.be/pJhhLiPIUAg", 
        thumbnail: "https://img.youtube.com/vi/pJhhLiPIUAg/maxresdefault.jpg", 
        title: "Start Your Export Business In Sri Lanka With These Documents And Registrations", 
        description: "Discover the key documents and registrations needed to establish your export business in Sri Lanka. This informative video will provide you with valuable insights and tips to ensure a successful start to your entrepreneurial journey." 
    },
    { 
        id: 3, 
        url: "https://youtu.be/cQLiEaMLW3U", 
        thumbnail: "https://i3.ytimg.com/vi/cQLiEaMLW3U/maxresdefault.jpg", 
        title: "Make Doller millions by exporting to Japan and learn about the SSW programme", 
        description: "Uncover the secrets to earning millions through exporting to Japan in this eye-opening YouTube video. Gain valuable insights into the SSW programme and how it can boost your business's profitability." 
    },
    { 
        id: 4, 
        url: "https://youtu.be/c2KKGlTRkeU", 
        thumbnail: "https://i3.ytimg.com/vi/c2KKGlTRkeU/maxresdefault.jpg", 
        title: "Sri Lankan Export Process Step By Step | Export Procedure For Small Business Entrepreneur's", 
        description: "In this informative YouTube video, we delve into the step-by-step process of exporting goods from Sri Lanka. Specifically designed for small business entrepreneurs, this video provides a comprehensive guide to the export procedure." 
    },
    { 
        id: 5, 
        url: "https://youtu.be/xrfUprQIIgM", 
        thumbnail: "https://i3.ytimg.com/vi/xrfUprQIIgM/maxresdefault.jpg", 
        title: "ලොකයේ හොඳම ඉල්ලුම් තියෙන දේවල් 10 | The best 10 export products from Sri Lanka", 
        description: "In this YouTube video, we explore the top 10 export products from Sri Lanka, showcasing the country's finest offerings. From the lush landscapes of Sri Lanka, these products have gained international recognition for their exceptional quality and craftsmanship. Join us as we delve into the diverse range of goods, including tea, garments, spices, and more, that have put Sri Lanka on the global export map." 
    },
    { 
        id: 6, 
        url: "https://youtu.be/kRe_6ZAfrj4", 
        thumbnail: "https://i3.ytimg.com/vi/kRe_6ZAfrj4/maxresdefault.jpg", 
        title: "Advice For Export Businesses From The Biggest Exporter In Sri Lanka | Simplebooks | Hayleys", 
        description: "Discover exclusive advice for export businesses from Hayleys, the largest exporter in Sri Lanka, in this informative video by Simplebooks. Learn from the best to enhance your export strategies and operations." 
    },
    { 
        id: 7, 
        url: "https://youtu.be/AhzUMCp5BdA", 
        thumbnail: "https://i3.ytimg.com/vi/AhzUMCp5BdA/hqdefault.jpg", 
        title: "ඩොලර් උනන සුහුරු කුලුබඩු නමැවුම්", 
        description: "Explore the lucrative world of spice production in Sri Lanka and discover the spices that are driving the country's economy. Learn about the top spices that are in high demand globally and how they are cultivated and processed in Sri Lanka." 
    },
    { 
        id: 8, 
        url: "https://youtu.be/DwpfwgDhDbQ", 
        thumbnail: "https://i3.ytimg.com/vi/DwpfwgDhDbQ/maxresdefault.jpg", 
        title: "EBAY DIRECT SHIPPING I ලංකාවේ භාන්ඩ පිටරට යවමු I EBAY DROP SHIPPING I BUSINESS IDEAS I EBAY SELLING", 
        description: "In this YouTube video, we explore the concept of eBay drop shipping from Sri Lanka, focusing on the direct shipping method. Discover business ideas and strategies for successful eBay selling in the Sri Lankan market." 
    },
    { 
        id: 9, 
        url: "https://youtu.be/auGG32NLY0Q", 
        thumbnail: "https://i3.ytimg.com/vi/auGG32NLY0Q/hqdefault.jpg", 
        title: "How to EARN DOLLARS by EXPORT Business | Food Dehydration in Sri Lanka | Grow a Life", 
        description: "This Sri Lankan YouTube video shows how to earn dollars by dehydrating food for export. Learn the secrets to this profitable business, including the dehydration process, benefits, and potential markets. Gain valuable knowledge to launch your own successful export venture and achieve financial stability." 
    },
    { 
        id: 10, 
        url: "https://youtu.be/r40mMw2zfLA", 
        thumbnail: "https://i3.ytimg.com/vi/r40mMw2zfLA/maxresdefault.jpg", 
        title: "Make Dollars Easily | Start your Export Business", 
        description: "This video dives into the world of export businesses, showing you how to take your product global and potentially make big profits. It explains the benefits of exporting, what value-added services are, and introduces key organizations like the EDB. You'll also learn about registering your business and essential tax considerations for exporters." 
    },
    { 
        id: 11, 
        url: "https://youtu.be/aFmclnKkEZA", 
        thumbnail: "https://i3.ytimg.com/vi/aFmclnKkEZA/maxresdefault.jpg", 
        title: "Make Dollars Easily (How to find overseas buyers) - Episode 02", 
        description: "Episode 02 of 'Make Dollars Easily' dives into finding overseas buyers for your export business. This video offers strategies to connect with international customers, potentially boosting your profits. Learn valuable tactics to expand your reach and take your business global." 
    },
    { 
        id: 12, 
        url: "https://youtu.be/8RZeJUV0g94", 
        thumbnail: "https://i3.ytimg.com/vi/8RZeJUV0g94/maxresdefault.jpg", 
        title: "ලෂ්මිත්‍ර එන්ජෝයර් එකක් විසින් ව්‍යවස්ථා කරමු", 
        description: "Episode 02 of 'Make Dollars Easily' dives into finding overseas buyers for your export business. This video offers strategies to connect with international customers, potentially boosting your profits. Learn valuable tactics to expand your reach and take your business global." 
    },
    { 
        id: 13, 
        url: "https://youtu.be/DoiawwF654M", 
        thumbnail: "https://i3.ytimg.com/vi/DoiawwF654M/maxresdefault.jpg", 
        title: "The story of a 23-year-old who became a millionaire at a young age | How to process the export?", 
        description: "In this captivating YouTube video, we delve into the inspiring story of a remarkable 23-year-old individual who achieved the incredible feat of becoming a millionaire at a young age. Through a compelling narrative, we explore the journey, challenges, and strategies employed by this young entrepreneur to attain such remarkable success. This video serves as a source of motivation and inspiration for aspiring individuals seeking to achieve financial independence and prosperity at a young age. Additionally, the video also provides valuable insights and practical tips on how to navigate the process of exporting goods, making it a valuable resource for those interested in international trade." 
    },
    { 
        id: 14, 
        url: "https://youtu.be/qt3UDHReOIc", 
        thumbnail: "https://i3.ytimg.com/vi/qt3UDHReOIc/maxresdefault.jpg", 
        title: "ඩොලර් උනන තැඹිලි වතුර - Coconut Water | Rupavahini News", 
        description: "Uncover the secrets to earning a profit through exporting the lesser-known Sri Lankan beverage, coconut, from its tropical origins. Join us as we delve into the world of international trade and show you how to capitalize on this valuable commodity." 
    },
    { 
        id: 15, 
        url: "https://youtu.be/4KHzGRH_KqQ", 
        thumbnail: "https://i3.ytimg.com/vi/4KHzGRH_KqQ/maxresdefault.jpg", 
        title: "වේලපු දාස් මල් කිලොවක් රුපියල් ලක්ශයක් sL worldagri youtube channel facebook page", 
        description: "This video explores Sri Lanka's surprising dried Marigold flower export industry. Learn why a kilo can fetch a staggering one lakh rupees and discover the secrets behind cultivating and exporting these valuable flowers." 
    },
    { 
        id: 16, 
        url: "https://youtu.be/y3w-MPeEZh0", 
        thumbnail: "https://i3.ytimg.com/vi/y3w-MPeEZh0/maxresdefault.jpg", 
        title: "Nill katarolu mal Bissnus ekak patan gamu 02 | Nill katarolu mal export karamu | Buttrfly Pea flower", 
        description: "Increasing demand for healthy alternative tea-based products over the global market is expected to drive the growth of the overall essential tea market which is expected to fuel demand for the butterfly pea flower tea over the forecast period. Butterfly pea flower also is known as Clitoria Ternatea, carries a huge amount of anti-oxidants and flavonoids and no caffeine whose benefits have a positive impact on human metabolism. This is attributed to fuel demand for the butterfly pea flower tea over the forecast period. Increasing know-how about traditional based food through various internet platforms have driven consumers in developed regions to opt for non-traditional food and beverages which is expected to boost demand for butterfly pea flower tea in North America and Europe region. Owing to greater nutritional value, the butterfly pea flower tea is expected to form strong consumer base in the herbal tea market. Increasing per capita food spending and expanding retail sector is expected to help butterfly pea flower tea market to gain traction quickly in developing regions of the Asia Pacific and Latin America as a premium offering. Organic butterfly pea flower tea segment is expected to experience faster growth rates in the global butterfly pea flower tea market. Herbal tea market over the last decade has experienced an overwhelming growth dynamics with its major offerings. Butterfly pea flower tea was identified to be one of the key segments under the herbal tea market which has a competitive nutritional profile and a key competitor in the key herbal tea types. Major product launch and pop trend of inclusion of natural products in HoReCa sector have directed butterfly pea flower tea to form a major offering over the forecast period owing to its both benefits and unique aesthetic value. Millennial and baby boomers are identified as the key consumer base for the butterfly pea flower tea market which is expected to be targeted by the key players in the market through various marketing approach. On the basis of source, the global butterfly pea flower tea market has been segmented as -Organic -Conventional On the basis of Form, the global butterfly pea flower tea market has been segmented as -Ready-to-Brew -Sachets/Bags -Ready-to-Drink -Premixes On the basis of the distribution channel, the global butterfly pea flower tea market has been segmented as -Direct -Indirect *Modern Grocery Retailers -Hypermarket/Supermarket -Departmental Stores -Convenience Stores -Others *Traditional Grocery Retailers -Food & Drink Specialty Store -Independent Small Groceries -Others *Online Retail" 
    },
    { 
        id: 17, 
        url: "https://youtu.be/8giuk-bUJ9Y", 
        thumbnail: "https://i3.ytimg.com/vi/8giuk-bUJ9Y/maxresdefault.jpg", 
        title: "නිල් කටරොල් ගෙනෙයි ඩොලර්", 
        description: "In this informative YouTube video, we delve into the lucrative business opportunity of exporting Butterfly Pea from Sri Lanka. Discover the potential to earn money by tapping into the growing demand for this beautiful and versatile flower. Learn about the cultivation process, harvesting techniques, and the various international markets where Butterfly Pea is highly sought after. Join us as we explore the economic benefits and step-by-step guidance on how to start your own profitable Butterfly Pea export business." 
    },
    { 
        id: 18, 
        url: "https://youtu.be/8RZeJUV0g94", 
        thumbnail: "https://i3.ytimg.com/vi/8RZeJUV0g94/maxresdefault.jpg", 
        title: "නිල් කටරොළු මල් වලින් මුදල් උපයන්නේ මෙහෙමයි | Butterfly Pea Tea | Blooming Blue Lanka Success Story", 
        description: "In this captivating YouTube video, we delve into the inspiring success story of Blooming Blue Lanka, a Sri Lankan company specializing in Butterfly Pea Tea. From humble beginnings to international acclaim, this video chronicles the journey of Blooming Blue Lanka and its innovative approach to entrepreneurship. Join us as we explore the economic potential of Butterfly Pea Tea and the impact of this unique beverage on global markets. Gain valuable insights into the challenges and triumphs of building a successful export business in Sri Lanka, and be inspired to pursue your own entrepreneurial dreams." 
    },
    { 
        id: 19, 
        url: "https://youtu.be/sGmdysIlj5U", 
        thumbnail: "https://i3.ytimg.com/vi/sGmdysIlj5U/maxresdefault.jpg", 
        title: "How to Sell Online - eCommerce Tips - EXPORT TRAINING WEBINAR", 
        description: "Sarvodaya Fusion Nishshanka De Silve to explore the ways local businesses can achieve eCommerce success. In this webinar we will explore; • How to earn Online • Shopify, WordPress and other Websites platforms • Spam and Phishing and Internet Safety • Payment Gateways, PayPal related issues • Ecommerce Tips and Tricks." 
    },
    { 
        id: 20, 
        url: "https://youtu.be/yj-_jk7bGl8", 
        thumbnail: "https://i3.ytimg.com/vi/yj-_jk7bGl8/maxresdefault.jpg", 
        title: "Improve Your Exports Business - Capitalizing Banking Services - EXPORT TRAINING WEBINAR", 
        description: "EDB Sri Lanka is here with Mr. K.K Susantha of the Trade Finance Software Solution Implementation Project at the Bank of Ceylon to talk about utilizing financial facilities much effectively to enhance the performance of an exports business. In this webinar we explore about; Financial facilities available for exporters to manage their pre-shipment and post-shipment export financing requirements. Barriers in international trade and how to utilize Non-financial banking survives for secure export business Risk Management in export business - how to manage your exchange risk, buyer risk, country/political risk. How to improve your revenue margins by properly managing your export financial cost. Secure export business avenues for intermediary exporters and their indirect exporters." 
    },
    { 
        id: 21, 
        url: "https://youtu.be/_Wed7MDnIaw", 
        thumbnail: "https://i3.ytimg.com/vi/_Wed7MDnIaw/maxresdefault.jpg", 
        title: "EDB Sri Lanka is here with Dr. Shyaman Udayanga of the Faculty of Management Studies and Commerce at the University of Sri Jayewardenepura to discuss the importance of value addition in business. In this webinar we explore; What is Value addition? Why Value addition? How to add value? What is “Thinking Out of the Box”? How to add value through “Thinking Out of the Box” methods" 
    },
    
];
const Lessons = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const filteredVideos = videoData.filter(video =>
        video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleSearch = e => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset pagination to first page when searching
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
        <>
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
            <li><Link to="/find-buyers" className="text-neutral-800 flex items-center indent-4 px-3 p3-2 hover:font-medium" ><UserOutlined /> Find Buyers</Link></li>
            <li><Link to="/lessions" className=" text-white bg-teal-950 px-6 py-2 flex items-center indent-4 hover:font-medium px-3 py-2 font-medium"><BookOutlined /> Find Lessons</Link></li>
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
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <h1 className="text-2xl font-bold my-4"></h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by description..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 focus:border-blue-500 rounded-md py-2 px-4 w-full transition duration-300"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentVideos.map(video => (
                        <div key={video.id} className="bg-white  shadow-md rounded-lg transition duration-300 hover:shadow-lg">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                                <img src={video.thumbnail} alt="Thumbnail" className="w-full rounded mb-2 h-auto" />
                            </a>
                            <h2 className="text-lg text-left mb-2 pl-6 pr-6">
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-teal-950 font-medium text-lg mb-2 text-left leading-5.5">{video.title}</a>
                            </h2>
                            <p className="text-teal-950 font-light text-base mb-2 text-justify leading-5.5 mb-2 pl-6 pr-6">{video.description}</p>
                            <p className="text-base pb-4 align-baseline">
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-500 hover:text-teal-950">
                                    Start Learning
                            </a>
                </p>
                        </div>
                    ))}
                </div>
                <Pagination videosPerPage={videosPerPage} totalVideos={filteredVideos.length} paginate={paginate} />
            </div>
            <footer class="bg-indigo-50 rounded-lg shadow bg-teal-950 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 rounded-lg bg-teal-950">
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
        </>
    );
};

// Pagination component
const Pagination = ({ videosPerPage, totalVideos, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='flex justify-center space-x-2 mt-8'>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)} className='text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded-lg focus:outline-none transition duration-300'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Lessons;