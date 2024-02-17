import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Select } from "./components/Select.tsx";
import { supabase } from "./lib/supabase.js";

function App() {
  const [razredi, setRazredi] = useState([]);
  const [options, setOptions] = useState([]);
  const tittleRef = useRef();
  const textRef = useRef();

  async function sendNotification() {
    let razred = [];
    options.map((o) => {
      razred.push(o.razred);
    });
    const dataToInsert = {
      naslov: tittleRef.current.value,
      tekst: textRef.current.value,
      razred: razred,
      datum: new Date(),
    };
    const { data, error } = await supabase
      .from("Obavestenja") // Replace 'your_table' with the actual name of your table
      .insert([dataToInsert]);
    console.log(razred);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace 'table_name' with your actual table name
        const { data, error } = await supabase.from("Razredi").select("razred");

        if (error) {
          console.error(error);
          return error;
        }

        console.log("Data:", data);
        setRazredi(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="forma">
      <label for="inputField">Naslov obavestenja</label>
      <input ref={tittleRef} type="text" />

      <label for="inputField">Tekst obavestenja</label>
      <textarea ref={textRef} cols="30" rows="10"></textarea>

      <label>Razredi:</label>
      {razredi.length > 0 && (
        <Select
          multiple={true}
          options={razredi}
          value={options}
          onChange={(o) => setOptions(o)}
        />
      )}

      <button
        type="submit"
        className="submit-btn"
        onClick={() => sendNotification()}
      >
        Posalji
      </button>
    </div>
  );
}

export default App;
