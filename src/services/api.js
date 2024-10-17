import axios from "axios";

export const fetchImagesQuery = async query => {
      const response = await axios.get(`https://api.unsplash.com/photos/?client_id=UKG2a0MkWM030phAM-Wt9EshPYfIwIc-qbYY-aW2UXs?query=${query}`)
            // console.log('data: ', data);
    console.log('response: ', response);
    return response.data;
}
 
