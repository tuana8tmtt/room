import axios from "axios";

export const Money = (currency: number) => currency?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
export const uploadImg = async (fileName: string) => {
    const formData = new FormData();
    formData.append("file", fileName);
    formData.append("upload_preset", "avkrpojy");
    const { data } = await axios.post("https://api.cloudinary.com/v1_1/polyass/image/upload", formData);
    return data.url;
}