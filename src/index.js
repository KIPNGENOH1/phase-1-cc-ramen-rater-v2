const baseURL = "http://localhost:3000";  // Base URL for the API

// Function to display all ramens
const displayRamens = async () => {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';  // Clear current ramen list

  try {
    const response = await fetch(`${baseURL}/ramens`);
    const ramens = await response.json();

    ramens.forEach(ramen => {
      const ramenImage = document.createElement('img');
      ramenImage.src = ramen.image;
      ramenImage.alt = ramen.name;
      ramenImage.dataset.id = ramen.id; // Set unique id for each image
      ramenImage.addEventListener('click', () => handleClick(ramen.id));

      ramenMenu.appendChild(ramenImage);  // Add image to menu
    });
  } catch (error) {
    console.error("Error fetching ramen data:", error);
  }
};

// Function to handle the click on ramen images and display ramen details
const handleClick = async (id) => {
  try {
    const response = await fetch(`${baseURL}/ramens/${id}`);
    const ramen = await response.json();

    const ramenDetail = document.getElementById('ramen-detail');
    const ramenImage = document.querySelector('.detail-image');
    const ramenName = document.querySelector('.name');
    const ramenRestaurant = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');

    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  } catch (error) {
    console.error("Error fetching ramen details:", error);
  }
};

// Function to handle the form submission for new ramen
const addSubmitListener = () => {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById('new-name').value.trim();
    const restaurant = document.getElementById('new-restaurant').value.trim();
    const image = document.getElementById('new-image').value.trim();
    const rating = parseInt(document.getElementById('new-rating').value.trim());
    const comment = document.getElementById('new-comment').value.trim();

    // Validate form fields
    if (!name || !restaurant || !image || !rating || !comment) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment
    };

    // Add the new ramen to the #ramen-menu div
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenImage = document.createElement('img');
    ramenImage.src = newRamen.image;
    ramenImage.alt = newRamen.name;
    ramenImage.dataset.id = Date.now();  // Use timestamp as a unique ID for new ramen
    ramenImage.addEventListener('click', () => handleClick(ramenImage.dataset.id));

    ramenMenu.appendChild(ramenImage);  // Add new ramen image to menu
  });
};

// Main function that runs when the DOM is fully loaded
const main = () => {
  displayRamens();  // Fetch and display ramen list
  addSubmitListener();  // Attach event listener to the form
};

document.addEventListener('DOMContentLoaded', main);  // Ensure main is called once DOM is ready

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main
};
