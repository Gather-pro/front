import axios from "axios";
import { getAuth } from "firebase/auth";
import CryptoJS from "crypto-js"; // ✅ Use crypto-js for hashing in frontend

// ✅ Read environment variables correctly using Vite
const baseUrl = import.meta.env.VITE_APP_API_URL;
const API_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const API_CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;
const FRONTEND_DEV_MODE = import.meta.env.VITE_APP_DEV_MODE || ""; // ✅ Ensure it always has a value

// ✅ Function to hash data (URL, Payload, Response)
const hashData = (data) => {
    return CryptoJS.SHA256(JSON.stringify(data, Object.keys(data).sort())).toString(CryptoJS.enc.Hex);
};

// ✅ Create Axios instance with default headers
const Axios = axios.create({
    baseURL: baseUrl,
    headers: {
        "x-client-id": API_CLIENT_ID, // ✅ Always send client ID
        "x-client-secret": API_CLIENT_SECRET, // ✅ Always send client secret
        "x-dev-mode": FRONTEND_DEV_MODE, // ✅ Always send the frontend secret
        "Content-Type": "application/json"
    }
});

// ✅ Attach Firebase Token & Hash Request URL + Payload
Axios.interceptors.request.use(async (request) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();
        request.headers["Authorization"] = `Bearer ${token}`;
    }

    // ✅ Ensure headers are correctly set in every request
    request.headers["x-client-id"] = API_CLIENT_ID;
    request.headers["x-client-secret"] = API_CLIENT_SECRET;
    request.headers["x-dev-mode"] = FRONTEND_DEV_MODE; // ✅ Always pass the frontend dev mode
    request.headers["x-env-mode"] = import.meta.env.VITE_APP_ENV || ""; // ✅ Send frontend environment mode

    if (!FRONTEND_DEV_MODE) {
        console.warn("🚨 Warning: `VITE_APP_DEV_MODE` is missing in frontend! Running in hashed mode.");
    }

    if (
        import.meta.env.VITE_APP_ENV !== "dev" &&
        !request.url.includes("auth") &&
        !request.url.includes("recaptcha") &&
        !request.url.includes("isPhoneNumberExists") // ✅ Prevent modifying authentication request
    ) {
        console.warn("🚨 Running in Production Mode: Keeping original request URL");

        // ❌ Comment out or remove this line to **keep the original request URL**
        // request.url = "/hashed";

        // ✅ Still log hashed URL (only for debugging, does not affect request)
        request.headers["X-Hashed-URL"] = hashData(request.url);
    } else {
        if (request.data) console.log("📌 Request Payload:", request.data);
    }

    return request;
}, (error) => {
    return Promise.reject(error);
});

// ✅ Verify Response Hash in Frontend
Axios.interceptors.response.use((response) => {
    // const receivedHash = response.headers["x-hashed-response"];

    // if (!FRONTEND_DEV_MODE) {
    //     console.log("🔒 Hashed Response Displayed in Network Tab");
    //     response.data = { hashed: receivedHash }; // ✅ Show hashed response in Network Tab
    // } else {
    //     console.log("📌 Real Response Data:", response.data); // ✅ Show real response in DevTools
    // }

    return response;
}, (error) => {
    console.error("❌ Response Error:", error);
    return Promise.reject(error);
});

export default Axios;
