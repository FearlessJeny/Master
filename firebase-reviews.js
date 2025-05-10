import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDekKj4gyCG6-d3slECnuNFkLWr9uWiOLM",
  authDomain: "masterreviews-d377a.firebaseapp.com",
  databaseURL: "https://masterreviews-d377a-default-rtdb.firebaseio.com",
  projectId: "masterreviews-d377a",
  storageBucket: "masterreviews-d377a.appspot.com",
  messagingSenderId: "955941878615",
  appId: "1:955941878615:web:5fe67c3bfbccbcf86b1c12"
};

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById("retroReviewForm");
const display = document.getElementById("retroReviews");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const review = form.review.value.trim();
  const rating = form.rating.value;

  if (!name || !review || !rating) return;

  const newReview = {
    name,
    review,
    rating,
    timestamp: Date.now()
  };

  const reviewRef = ref(db, 'reviews');
  await push(reviewRef, newReview);

  form.reset();
});

const reviewRef = ref(db, 'reviews');
onValue(reviewRef, (snapshot) => {
  const data = snapshot.val();
  display.innerHTML = '';

  if (data) {
    const sortedKeys = Object.keys(data).sort((a, b) => data[b].timestamp - data[a].timestamp);
    sortedKeys.forEach((key) => {
      const { name, review, rating } = data[key];
      const entry = document.createElement("div");
      entry.innerHTML = `
        <span class="review-name">${name}:</span>
        <span class="review-text">${review}</span>
        <div class="review-stars">${"★".repeat(rating)}</div>
      `;
      display.appendChild(entry);
    });
  }
});
