
import  { useEffect, useState, useCallback } from "react";


const useFetchSlok = (chapter,sloka) => {
    const [loading, setLoading] = useState(false);
    const [data,setData]=useState(null);
    
      const fetchData = useCallback(async () => {
        
        try {
          const url= `https://vedicscriptures.github.io/slok/${chapter}/${sloka}/`;
          const res = await fetch(url);
          const fetchedData= await res.json();
          setData(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
    
      }, [chapter,sloka]);
    
useEffect(() => {
  fetchData();
}, [fetchData]);

console.log(data);
// console.log(data.slok);


return { loading, data, setLoading };
};

export default useFetchSlok;
    
    
    
    
    
    
