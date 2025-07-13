
import  { useEffect, useState, useCallback } from "react";


const useFetchData = (chapter) => {
    const [loading, setLoading] = useState(false);
    const [data,setData]=useState(null);
    
      const fetchData = useCallback(async () => {
        
        try {
          const url= `https://vedicscriptures.github.io/chapter/${chapter}/`;

          const res = await fetch(url);
          const fetchedData= await res.json();
          setData(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
    
      }, [chapter]);
    
useEffect(() => {
  fetchData();
}, [fetchData]);

// console.log(data);
// console.log(data?.chapter_number);

return { loading, data, setLoading };
};

export default useFetchData;
    
    
    
    
    
    
