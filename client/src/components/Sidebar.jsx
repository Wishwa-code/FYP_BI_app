import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react"
import { createContext, useContext, useState } from "react"
import { Link } from 'react-router-dom';


const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside 
                className="transition-all duration-300 ease-in-out transition-all duration-300 ease-in-out sticky top-14 "
                onMouseEnter={() => setExpanded(true)} 
                onMouseLeave={() => setExpanded(false)}
            >
                <nav className={` h-[calc(100lvh-56px)] flex flex-col bg-white shadow-sm ${expanded ? "w-64" : "w-12"}`}> {/* Conditional width */}

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1  ">{children}</ul>
                    </SidebarContext.Provider>

                    
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <Link to={to}>
        <li 
            className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group pl-4 ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 hover:rounded-tr-full hover:rounded-br-full" : "hover:bg-indigo-50  hover:rounded-tr-full hover:rounded-br-full text-gray-600"}`}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-3 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}
            
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
        </Link>
    )
}