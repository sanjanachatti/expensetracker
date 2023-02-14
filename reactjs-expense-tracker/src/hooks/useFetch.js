// cutsom hook for fetching apis
import { useState, useEffect } from "react";

/**
 * A custom hook for fetch apis to get data based on dependencies
 * @param {() => Promise<any>} fetcher
 * @param {any} deps
 * @returns {{loading: booelean; data: any; error: Error}}
 */
export const useFetch = (fetcher, deps) => { 
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetcher()
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
    return () => {
      //   cleanup
    };
  }, deps);

  return { loading, data, error };
};
