import { executeQuery } from "../../config/db";

export default async function handler(req, res) {
  try {
    // Obtain the id from the request
    const { id } = req.query;

    // Retrieve data from the database based on the id
    const data = await executeQuery("SELECT * FROM kas", []);

    // Return the data as the response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
