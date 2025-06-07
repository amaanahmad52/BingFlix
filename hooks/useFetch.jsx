import { useEffect, useState } from "react";
// import { getMovies } from "../backend_services/api";

const useFetch=({fetchingFunction,autoFetch=true})=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData=async()=>{
        try {
            setLoading(true);
            setError(null);
            const result=await fetchingFunction();
            setData(result);
            // console.log(result);
          
        } catch (err) {
            setError(err instanceof Error?err:new Error("Error fetching data"));
        }
        finally{
            setLoading(false);

        }
        
    }

    const reset=()=>{
        setData(null);
        setLoading(true);
        setError(null);
    } 

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    },[])
 
    return { data, loading, error,reset,refetch:fetchData };
}
export default useFetch


