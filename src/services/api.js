import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ---------------------------------------------
// GET AVAILABLE VOICES
// ---------------------------------------------
export const getVoices = () => {
  return api.get("/api/voices");
};

// ---------------------------------------------
// GENERATE SPEECH
// ---------------------------------------------
export const generateSpeech = (data) => {
  return api.post("/api/tts", data);
};

export default api;