"use client"
import axios from 'axios';
import React, { useState } from 'react'

function Page() {

    const [destination, setDestination] = useState('') 

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSearch = async () => {
        if (!query) return;
    
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.get(`/api/listings?destination=${query}`);
        //   const response = await fetch(`/api/listings?query=${query}`);
          
        console.log('Response--->',response)
        if (!response) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.data.data;
          setResults(data);

          console.log("Data--->", data)
        } catch (error) {
          //setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>page

<h1>Search Blog Posts</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts"
      />
      <button onClick={handleSearch}>Search</button>
        {results && 
        <div>  
            {JSON.stringify(results)}
            </div>}
    </div>
  )
}

export default Page