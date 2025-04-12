import axios from "axios";

const API_URL = "http://localhost:8080/api";

const processNumbers = async (numbers) => {
  try {
    const response = await axios.post(`${API_URL}/process-numbers`, numbers);
    return response.data;
  } catch (error) {
    console.error("Error processing numbers:", error);
    throw error;
  }
};

const getPreviousTrees = async () => {
  try {
    const response = await axios.get(`${API_URL}/previous-trees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching previous trees:", error);
    throw error;
  }
};

const bstService = {
  processNumbers,
  getPreviousTrees,
};

export default bstService;
