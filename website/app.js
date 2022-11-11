/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=9bf420b7b184c4340867f23acf983c99&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", whenClick);
async function whenClick(e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  const data = await fetch(baseUrl + zip + apiKey);
  const parsdata = await data.json();

  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };
  postData("/add", { temp: parsdata.main.temp, date: newDate, feel: feel });

  retrieveData();
}

const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();

    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
