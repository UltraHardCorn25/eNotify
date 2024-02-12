const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { createClient } = require("@supabase/supabase-js");
// Initialize Supabase client
const supabaseUrl = "https://moodzcmszmbatuipfuwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2R6Y21zem1iYXR1aXBmdXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzQ4OTYsImV4cCI6MjAyMjIxMDg5Nn0.BmedB6K_px4a4kqAASieMvTxqHU1fwijZ22HT_KUHdQ";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/getOptions", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Razredi").select("razred");
    if (error) {
      throw error;
    }

    const options = data.map((item) => item.razred);
    res.json(options);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch options from Supabase" });
  }
});

app.post("/submit", (req, res) => {
  const title = req.body.inputField1;
  const body = req.body.inputField2;
  const razred = req.body.selectOption;
  Send(title, body, razred);
  const targetUrl = "http://localhost:3000";

  // Perform the redirection by sending a 302 (Found) status code
  //res.redirect(302, targetUrl);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Call the function to insert data

function Send(title, body, razred) {
  console.log(razred);

  // Example data to insert
  const dataToInsert = {
    naslov: title,
    tekst: body,
    razred: razred,
    datum: new Date(),
  };

  // Insert data into the 'your_table' table
  async function insertData() {
    try {
      const { data, error } = await supabase
        .from("Obavestenja") // Replace 'your_table' with the actual name of your table
        .insert([dataToInsert]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }
  insertData();
}
