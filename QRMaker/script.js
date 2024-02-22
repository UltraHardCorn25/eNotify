const qr = require("qr-image");
const fs = require("fs");

const { createClient } = require("@supabase/supabase-js");
// Initialize Supabase client
const supabaseUrl = "https://moodzcmszmbatuipfuwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2R6Y21zem1iYXR1aXBmdXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MzQ4OTYsImV4cCI6MjAyMjIxMDg5Nn0.BmedB6K_px4a4kqAASieMvTxqHU1fwijZ22HT_KUHdQ";
const supabase = createClient(supabaseUrl, supabaseKey);
async function getData() {
  try {
    const { data, error } = await supabase.from("Razredi").select("razred");
    if (error) {
      throw error;
    }

    const options = data.map((item) => item.razred);

    const baseURL = "myapp://setAsyncStorage?";
    const key = "razred";
    let qrData;

    options.forEach((option) => {
      qrData = `${baseURL}key=${encodeURIComponent(
        key
      )}&value=${encodeURIComponent(option)}`;
      qrDataAdmin = `${baseURL}key=${encodeURIComponent(
        key
      )}&value=${encodeURIComponent(option)} - Admin`;
      // Generate the QR code
      const qrImage = qr.imageSync(qrData, { type: "png" });
      const qrImage2 = qr.imageSync(qrDataAdmin, { type: "png" });
      // Save the QR code as an image file
      fs.writeFileSync(`qrcode${option}.png`, qrImage);
      fs.writeFileSync(`qrcode${option}Admin.png`, qrImage2);
    });

    console.log("QR code saved as qrcode.png");
  } catch (error) {
    console.log(error);
  }
}
getData();
