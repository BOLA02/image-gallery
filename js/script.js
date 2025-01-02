"use strict"

//Element
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const toggleTheme = document.getElementById('toggleTheme');
const uploadImage = document.getElementById('uploadImage');
const fileInput = document.getElementById('fileInput');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');


//set current image to 0
let currentImageIndex = 0;
// let images = [...gallery.querySelectorAll('img')];

let images = Array.from(gallery.querySelectorAll('img'));
console.log(images)

// Light/Dark Mode Toggle
toggleTheme.addEventListener('click', () => {
  const isDark = document.body.style.getPropertyValue('--background-color') === '#2b2b2b';

  document.body.style.setProperty('--background-color', isDark ? '#fff' : '#2b2b2b');

  document.body.style.setProperty('--text-color', isDark ? '#000' : '#fff');
  // document.getElementsByClassName('gallery').style.setPropertyValue('--background-color' , isDark ? '#fff': "#2b2b2b ");
  // console.log(bg)
});




searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  images.forEach((img) => {
    const altText = img.alt.toLowerCase();
    img.parentElement.style.display = altText.includes(query) ? '' : 'none';
  });
});


// modal event handlers
gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    currentImageIndex = images.indexOf(e.target);
    modalImage.src = e.target.src;
    modal.style.display = 'flex';
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// previous/next event handlers

prevImage.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentImageIndex].src;
});

nextImage.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  modalImage.src = images[currentImageIndex].src;
});

// upload image
uploadImage.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = `Uploaded Image ${images.length + 1}`;


const container = document.createElement('div');
    container.className = 'image-container';
    container.appendChild(img);
    gallery.appendChild(container);
      images = Array.from(gallery.querySelectorAll('img'));
    };
    reader.readAsDataURL(file);
  }
});
