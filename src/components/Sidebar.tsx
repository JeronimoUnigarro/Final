import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product{
    category:string;
}
interface FetchResponse{
    products: Product[];
}

const Sidebar = () =>{

    const{      
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword, 
    } = useFilter()

    const[categories , setCategories] = useState<string[]>([]);
    const[keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes",
        "shirt",

    ]);

    useEffect (() =>{
        const fetchCategories = async () => {
            try {
                const response =await fetch('https://dummyjson.com/products')
                const data: FetchResponse = await response.json()
                const  uniqueCategories = Array.from(
                    new Set(data.products.map(product => product.category))
                );
                setCategories(uniqueCategories);
               

            }catch(error){
                console.error('Error fetching products ' , error)

            }
            
        }

        fetchCategories();

    },[])

    const hadleMinPriceChange = (e: React.ChangeEvent <HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined  )
    };
    const handleMaxPriceChange = (e: React.ChangeEvent <HTMLInputElement>) =>{
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined)
    };
    const handleRadioChangueCategories = (category : string) => {
        setSelectedCategory(category)
    };
    const handleKeywordClick = (keyword :string) => {
        setKeyword(keyword);
    };
    const handleResetFilters = ( ) => {
        setSearchQuery('')
        setSelectedCategory('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')
    }

    return (
        <div className="w-64p-5 h-screen">
        <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>


        <section>
            <input 
            type="text" 
            className="border-2 rounded px-2 py-3 w-full sm:mb-0"  
            placeholder="search Product" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            />


         <div 
            className="flex justify-center mt-3 items-center">
            <input 
            type="text" 
            className="border-2 mr-2 px-5 py-3 mb-3 w-full "  
            placeholder="Min" 
            value={minPrice ?? ""}
            onChange={hadleMinPriceChange}
            />
            <input 
            type="text" 
            className="border-2 mr-2 px-5 py-3 mb-3 w-full "  
            placeholder="Max" 
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            />
         </div>
        
        {/* Categories section */}
        <div className="mb 5">
            <h2 className="text-xl font-simbolo mb-3">Categories</h2>
        </div>

<section>



    {categories.map((category, index)=>(
        <label key={index} className="block mb-2">
            <input 
            type="radio"  
            name="category" 
            value={category}  
            onChange={() => handleRadioChangueCategories(category )}
            className="mr-2 w-[16px] h-[16px]"
            checked= {selectedCategory === category}
            />
            {category.toUpperCase()}
        </label>
    ))}


</section>

    {/*keywords Section*/}
    <div className="mb-5 mt-4">
        <h2 className="text-xl font-semibold mb-3">Keywords</h2> 
        <div>
            {keywords.map((keyword, index) => (
                <button 
                key={index} 
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 "
                >
                {keyword.toUpperCase()}
                </button>
            ))}
        </div>
    </div>

    <button onClick={handleResetFilters} className="w-full mb-[4rem] py-2 bg-black text-white rounded my-5 " > 
        Reset Filters

    </button>

        </section>
    </div>
    );
};

export default Sidebar;