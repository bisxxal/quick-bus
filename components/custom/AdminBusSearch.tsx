'use client'
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import getBusSuggetion from "@/actions/admin.action";
import { SearchBusId } from "@/actions/admin.action";
import { redirect } from "next/navigation";
import { FiLoader } from "react-icons/fi";
interface BusSuggestion {
    busName: string;
    busNumber: string;
    id:number;
}
const AdminBusSearch = ({ handelSearchSumbit }: any) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BusSuggestion[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        setIsLoading(true);
        const data = await getBusSuggetion(query);
        setSuggestions(data); 
        setIsLoading(false);
      } else {
        setSuggestions([]); 
      }
    };
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); 
    return () => clearTimeout(timeoutId);
  }, [query]); 
   const handelsSearchSumbit = async(id:number) => { 
        const res = await SearchBusId(id ) 
       redirect('/admin/search/'+res.bus)
    }
  
  return (
    <div className=" w-1/2  max-md:w-5/6 mx-auto">
      <form action={handelSearchSumbit} className="border-2 border-[#2F4BB9] mt-3 rounded-full p-2 flex justify-between">
        <input
          required
          type="text"
          className="outline-none bg-transparent w-5/6 px-2"
          placeholder="Enter bus number or name"
          name="bus"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
        />
        <button type="submit">
          <CiSearch className="text-3xl text-[#2F4BB9]" />
        </button>
      </form>
 
      {query && (
        <ul className="mt-2 border-2 border-[#ffffff70] py-3 rounded-2xl  overflow-y-auto">
          {isLoading ? (
          <FiLoader className=" text-2xl text-center mx-auto animate-spin" /> 
          ) : (
            suggestions.map((suggestion, index) => (
              <li key={index} onClick={()=>handelsSearchSumbit(suggestion.id)} className="p-2 cursor-pointer flex px-4 justify-between hover:bg-[#ffffff2d]">
                {suggestion.busName}  <span>{suggestion.busNumber}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminBusSearch;
