const { useState, useEffect } = require("react");
import axios from "axios";
function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    //fetch blog data only if category exists
    if (apiEndpoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndpoint]);
  return { alldata, loading };
}
export default useFetchData;
