const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", downloadImages);

function downloadImage(link) {
  return new Promise((resolve, reject) => {
    let random = Math.random(); // Generate random number between 0 and 1

    if (random > 0.3 && typeof link === "string" && link.startsWith("https")) {
      setTimeout(() => {
        resolve({
          image: link,
          message: "Image downloaded successfully"
        });
      }, 3000);
    } else {
      setTimeout(() => {
        reject(`❌ Failed to download: ${link}`);
      }, 3000);
    }
  });
}

function downloadImages() {
  output.innerHTML = ""; // Clear previous images
  errorMessage.innerText = ""; // Clear previous error messages
  loading.style.display = "block"; // Show loading spinner

  let downloadPromises = images.map(img => downloadImage(img.url));

  // Use `Promise.allSettled()` instead of `Promise.all()`
  Promise.allSettled(downloadPromises)
    .then(results => {
      let failedDownloads = [];

      results.forEach(result => {
        if (result.status === "fulfilled") {
          let img = document.createElement('img');
          img.src = result.value.image;
          output.append(img);
        } else {
          failedDownloads.push(result.reason);
        }
      });

      // Display errors for all failed images
      if (failedDownloads.length > 0) {
        errorMessage.innerText = failedDownloads.join("\n");
      }
    })
    .finally(() => {
      loading.style.display = "none"; // Hide loading spinner
    });
}
