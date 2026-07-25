import axios from "axios";
import { API_PATHS, BASE_URL } from "./apiPaths";



const uploadingImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image' , imageFile)
    // console.log(imageFile)
    
    try{
        const res = await axios.post(`${BASE_URL}${API_PATHS.IMAGE.UPLOAD_IMAGE}`, formData, {
            headers : {
                'Content-Type' : "multipart/form-data"
            }},
            {
                withCredentials: true
            }
        )
        return res.data;
        
    } catch (error) {
        console.log("Uploading Image Error", error)
    }
}

export default uploadingImage;