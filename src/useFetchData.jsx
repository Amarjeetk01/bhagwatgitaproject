
import  { useEffect, useState, useCallback } from "react";


const useFetchData = (chapter,sloka) => {
    const [loading, setLoading] = useState(false);
    const [data,setData]=useState({});

      const fetchData = useCallback(async () => {
        setLoading(true);
        const url = `./Data/sloka/${chapter}/${sloka}`;
        try {
    
          const jsonData = await require(`${url}/index.json`);
          setData(jsonData);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
    
      }, [chapter, sloka]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);    


  return {loading,data}
}

export default useFetchData;
