const images = document.querySelector(".images");
let imgEl;

const wait = (sec) =>
  new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });

function createImage(imagePath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imagePath;

    img.addEventListener("load", () => {
      images.appendChild(img);
      resolve(img);
    });
    img.addEventListener("error", (error) => {
      reject(new Error("Image not found"));
    });
  });
}

const url =
  "https://fastly.picsum.photos/id/729/200/300.jpg?hmac=VbcZBxFYzQK1ro1MTLLmwHNQ0kuIJSagOeue4JMymUY";

// createImage(url)
//   .then((img) => (imgEl = img))
//   .then(() => wait(2))
//   .then(() => {
//     imgEl.style.display = "none";
//   })
//   .then(() => wait(2))
//   .then(() => createImage(url))
//   .then((img) => (imgEl = img))
//   .then(() => wait(2))
//   .then(() => {
//     imgEl.style.display = "none";
//   })
//   .catch((error) => console.error(error));

async function loadNPause() {
  try {
    const img1 = await createImage(url);
    await wait(2);
    img1.style.display = "none";
    await wait(2);
    const img2 = await createImage(url);
    await wait(2);
    img2.style.display = "none";
    await wait(2);
  } catch (error) {
    throw new Error(error);
  }
}

(async function(){
    await loadNPause()
})()

const imageArray = [url,url,url]

async function loadAll (){
    const imagePromises = imageArray.map(url=> createImage(url))
    console.log(imagePromises)
    const [img1El,img2El,img3El] = await Promise.allSettled(imagePromises)
    console.log(img1El,img2El,img3El)
}

(async function(){
    await loadAll()
})()