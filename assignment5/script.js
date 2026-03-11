// Step 1: Select HTML elements using their IDs
const button = document.getElementById("get-weather-btn");
const loadingMsg = document.getElementById("loading-msg");
const errorMsg = document.getElementById("error-msg");
const resultsDiv = document.getElementById("weather-results");

// Step 2: What happens when we click the button
button.addEventListener("click", () => {
    
    // Clear old results and show "Loading..."
    resultsDiv.innerHTML = "";
    errorMsg.style.display = "none";
    loadingMsg.style.display = "block";

    // Prepare our 3 API URLs for London, New York and Tokyo
    const urlLondon = "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true";
    const urlNewYork = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true";
    const urlTokyo = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true";

    // Step 3: Start fetching data for all 3 cities at the same time
    const promise1 = fetch(urlLondon).then(response => response.json());
    const promise2 = fetch(urlNewYork).then(response => response.json());
    const promise3 = fetch(urlTokyo).then(response => response.json());

    // Step 4: Wait for ALL 3 promises to finish
    Promise.all([promise1, promise2, promise3])
        .then((dataArray) => {
            // Hide "Loading..."
            loadingMsg.style.display = "none";

            // Get the temperatures from the data returned
            const tempLondon = dataArray[0].current_weather.temperature;
            const tempNewYork = dataArray[1].current_weather.temperature;
            const tempTokyo = dataArray[2].current_weather.temperature;

            // Simply display them as text paragraphs on the screen
            resultsDiv.innerHTML = `
                <p><strong>London:</strong> ${tempLondon}°C ☁️</p>
                <p><strong>New York:</strong> ${tempNewYork}°C 🏙️</p>
                <p><strong>Tokyo:</strong> ${tempTokyo}°C 🗼</p>
            `;
        })
        .catch((error) => {
            // If anything fails, hide loading and show error message
            loadingMsg.style.display = "none";
            errorMsg.style.display = "block";
            console.error(error);
        });
});
