const NSFW_API_URL = "https://api-inference.huggingface.co/models/Falconsai/nsfw_image_detection";
const NSFW_API_TOKEN = process.env.HUGGING_FACE_TOKEN;

async function checkNSFWImage(imageBuffer) {
    const response = await fetch(NSFW_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${NSFW_API_TOKEN}`,
            "Content-Type": "application/octet-stream",
        },
        body: imageBuffer
    });
    const result = await response.json();
    return result
}


export default checkNSFWImage