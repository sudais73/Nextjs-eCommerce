import jwt from "jsonwebtoken";

const getDataFromToken = (request) => {
  try {
    // Get cookie from NextRequest
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    // Verify JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken.id; 
  } catch (error) {
    console.error("JWT Error:", error.message);
    return null;
  }
};

export default getDataFromToken;
