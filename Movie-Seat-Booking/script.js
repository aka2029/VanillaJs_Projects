const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value; // + is added just to make it a number otherwise it was a string. Check console.log(typeOf ticketPrice)

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex); //here stringify isn't req cause it's not an array or anything
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // For, localStorage... Copy selected seats into arr
  // Map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //map is similar to forEach it's just that it return an array

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //since seatsIndex is an array hence we converted it into JSON.stringify

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected"); //toggle allows us to do what we want bec .add could only add and not remove

    updateSelectedCount();
  }
});
