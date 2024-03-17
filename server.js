const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// POST endpoint for /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    // Validate input
    if (!Array.isArray(data)) {
      throw new Error("Input must be an array");
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];

    // Process array elements
    for (const element of data) {
      if (element >= "0" && element <= "9") {
        let c = parseInt(element);
        if (c % 2 == 0) {
          even_numbers.push(element);
        }
        else {
          odd_numbers.push(element);
        }
      }
       else if (typeof element === "string") {
        const uppercase = element.toUpperCase();
        alphabets.push(uppercase);
      }
    }

    // Prepare response
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      even_numbers: even_numbers,
      odd_numbers: odd_numbers,
      alphabets: alphabets,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running");
});
