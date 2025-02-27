const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

let errorMessage = document.getElementById('error');

btn.addEventListener("click", () => {
  let arr = [];
  for (let img of images) {
    arr.push(downloadImage(img.url));
  }

  Promise.all(arr)
    .then(res => {
      console.log(res);
      for (let t of res) {
        let img = document.createElement('img');
        img.src = t.image;
        output.append(img);
      }
    })
    .catch(error => {
      console.log("Error :- ", error);
      errorMessage.innerText = error;
    });
});

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
