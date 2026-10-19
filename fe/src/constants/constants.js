const REACT_APP_HOST = process.env.REACT_APP_HOST;
const REACT_APP_FAST_API_URL = process.env.REACT_APP_FAST_API_URL;

const generateUrl = "/generate";
const verifyUrl = "/verify";

const mainText2 = "A new tool to shorten your URLs.";
const mainText3 = "We provide services like Shortening urls, life-time persistency, free-of-cost, no sign ups!";

const STATUS_CODES = {
    "SUCCESS": 200,
    "CONFLICT": 409,
    "CREATED": 201,
    "ERROR": 500
}

export {
    REACT_APP_HOST,
    REACT_APP_FAST_API_URL,
    generateUrl,
    verifyUrl,
    mainText2,
    mainText3,
    STATUS_CODES
}