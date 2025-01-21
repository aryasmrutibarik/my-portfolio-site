const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); // Serve static files like your HTML

// Endpoint to handle form submissions
app.post("/submit-contact", (req, res) => {
    const { name, email, message } = req.body;

    // Basic data validation
    if (!name || !email || !message) {
        return res.status(400).send({ error: "All fields are required." });
    }

    // Create a JSON object for the new submission
    const newSubmission = {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
    };

    // File path for storing submissions
    const filePath = "./contacts.json";

    // Initialize submissions array
    let submissions = [];

    // Read and parse existing submissions if the file exists
    if (fs.existsSync(filePath)) {
        try {
            const existingData = fs.readFileSync(filePath, "utf8");

            // Check if the file is empty
            if (existingData.trim()) {
                submissions = JSON.parse(existingData);
            }
        } catch (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).send({ error: "Error reading data file." });
        }
    }

    // Append the new submission to the array
    submissions.push(newSubmission);

    // Write updated data back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    } catch (err) {
        console.error("Error writing JSON file:", err);
        return res.status(500).send({ error: "Error saving your data." });
    }

    // Respond with success message
    res.send({ success: "Your message has been received!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
