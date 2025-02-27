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
    let random = parseInt(Math.random() * 10000);

    if (random % 2 === 0 && typeof link === "string" && link.startsWith("https")) {
      setTimeout(() => {
        resolve({
          image: link,
          message: "Image download successfully"
        });
      }, 3000);
    } else {
      setTimeout(() => {
        reject(`Image download failed: ${link}`);
      }, 3000);
    }
  });
}

function downloadImages() {
  output.innerHTML = ""; // Clear previous images
  errorMessage.innerText = ""; // Clear previous error messages
  loading.style.display = "block"; // Show loading spinner

  let downloadPromises = images.map(img => downloadImage(img.url));

  Promise.all(downloadPromises)
    .then(res => {
      res.forEach(t => {
        let img = document.createElement('img');
        img.src = t.image;
        output.append(img);
      });
    })
    .catch(error => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      loading.style.display = "none"; // Hide loading spinner
    });
}
