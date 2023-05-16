import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '33764571-052a5d299511b3ce4e119ed29';
const OTHER_PARAMS = '&image_type=photo&orientation=horizontal&per_page=12'

export async function fetchResponce(searchName, page) {
    try {
       
        const URL = `${BASE_URL}?q=${searchName}&page=${page}&key=${API_KEY}${OTHER_PARAMS}`;
        const response = await axios.get(URL);
        return response.data;              
        
    } catch (error) {
        console.log(error);
    }
}

export const api = { fetchResponce };