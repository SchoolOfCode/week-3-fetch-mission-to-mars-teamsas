// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Fetching info from logs
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);

    /* INFO:
    Person 12 started a Mutiny 
    Person 7 (Kyle) spilt tea on the console
    Person 8 (CHRIS) changed launch codes
    PERSON 12 (AI) changed the launch codes to the ship's dog's name
    PERSONNEL 11 is the dog. His name is Rover. Post this to /api/codes. Gives us a response that has a img property. We rendered this dynamically onto our html*/

    // Fetching info on personnel
    const personnel = await fetch("/api/personnel/11");
    const personnelData = await personnel.json();
    console.log(personnelData);

    const personnelMessage = await fetch("/api/messages?to=8");
    const chrisMessages = await personnelMessage.json();
    console.log(chrisMessages);

    const launchCode = await fetch("/api/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enter: "ROVER" }),
    });

    let launchData = await launchCode.json();

    let imageURL = launchData.img;

    const resultImage = document.getElementById("resultImage");
    resultImage.src = "./" + imageURL;

    console.log(launchData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });
