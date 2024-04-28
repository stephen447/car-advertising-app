import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompleteAdvert from "../../components/completeAdvert/completeAdvert";
import "./advertPage.css";

function AdvertPage() {
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState(null);

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + `adverts/advert/${id}`
        );
        console.log(response.data);
        setAdvertisement(response.data);
      } catch (error) {
        console.error("Error fetching advertisement:", error);
      }
    };

    fetchAdvertisement();
  }, [id]);

  if (!advertisement) {
    return <div>Loading...</div>;
  }

  return <CompleteAdvert advertisement={advertisement} />;
}

export default AdvertPage;
