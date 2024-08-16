require('dotenv').config();
const API_KEY = process.env.HUGGINGFACE_API_KEY;
const axios = require('axios');

const summarizeText = async (text) => {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            {
                inputs: text,
                parameters: { max_length: 100, min_length: 30 },
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        // Extract the summary text
        return response.data[0].summary_text;
    } catch (error) {
        console.error('Error in summarizing text', error);
        throw error;
    }
};

module.exports = summarizeText;
