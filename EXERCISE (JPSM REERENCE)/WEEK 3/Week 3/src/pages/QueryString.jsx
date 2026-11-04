import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useQueryParams() {
  const location = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(location.  search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [location.search]);
};

function QueryString() {
    const queryParams = useQueryParams();
    const id = queryParams.id;
    const category = queryParams.category || "category";
    
    return (
        <>
        ID: {id} Category: {category}
        </>
    );
}

export default QueryString; 