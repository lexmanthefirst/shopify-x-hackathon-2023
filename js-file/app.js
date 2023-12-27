'use strict';

// Function to initialize the app
function app() {
  // Selecting DOM elements
  const setupContainer = document.querySelector('.container');
  const toggleArrow = document.querySelector('.arrow-down');
  const guideOptions = document.querySelector('.setup-guide-options');
  const closeModal = document.querySelector('.close-modal');
  const modalWrapper = document.querySelector('.modal-wrapper');
  const notificationBtn = document.querySelector('.notification-bell');
  const profileBtn = document.querySelector('.profile-dropdown');
  const bellDropdown = document.querySelector('.notification-dropdown');
  const profileDropdown = document.querySelector('.my_store_dropdown');

  // Function to toggle the setup container and guide options
  function toggleSetupContainer() {
    setupContainer.classList.toggle('close-container');
    guideOptions.classList.toggle('hidden');
  }

  // Initial setup container toggle
  toggleSetupContainer();

  // Event listener for toggle arrow click
  toggleArrow.addEventListener('click', () => {
    toggleSetupContainer();
    toggleArrow.classList.toggle('rotate-arrow');
    toggleArrow.style.transition = 'all ease-in 0.25s';
  });

  // Event listener for close modal button click
  closeModal.addEventListener('click', () => {
    modalWrapper.style.display = 'none';
  });

  // Function to toggle the bell dropdown
  function toggleBell() {
    bellDropdown.classList.toggle('hidden');
  }

  // Function to toggle the profile dropdown
  function toggleProfile() {
    profileDropdown.classList.toggle('hidden');
  }

  // Event listener for notification bell click
  notificationBtn.addEventListener('click', toggleBell);

  // Event listener for profile dropdown click
  profileBtn.addEventListener('click', toggleProfile);

  // Event listener for Escape key press to close bell dropdown
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !bellDropdown.classList.contains('hidden')) {
      toggleBell();
    }
  });

  // Event listener for Escape key press to close profile dropdown
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !profileDropdown.classList.contains('hidden')) {
      toggleProfile();
    }
  });
}

// Initialize the app
app();

// Selecting DOM elements
const guideTexts = document.querySelectorAll('.setup-guide-texts');
const toggleTexts = document.querySelectorAll('.toggle-text');
const guideCards = document.querySelectorAll('.guide-card');
const guideImages = document.querySelectorAll('.guide-image');

// Creating an array of elements
const elements = Array.from(guideTexts).map((guideText, index) => ({
  toggleText: toggleTexts[index],
  guideCard: guideCards[index],
  guideImage: guideImages[index],
}));

// Function to iterate over elements and hide/show corresponding elements
const iterateEl = () => {
  elements.forEach(el => {
    el.toggleText.classList.add('hidden');
    el.guideCard.classList.remove('background-color');
    el.guideImage.classList.add('hidden');
  });
};

// Function to open a guide based on index
const openGuide = index => {
  iterateEl();
  elements[index].toggleText.classList.remove('hidden');
  elements[index].guideCard.classList.add('background-color');
  elements[index].guideImage.classList.remove('hidden');
};

// Event listener for guide text click
guideTexts.forEach((guideText, index) => {
  guideText.addEventListener('click', () => openGuide(index));
});

// Constants for class names
const HIDDEN_CLASS = 'hidden';
const MARK_AS_DONE_CLASS = 'checkbox-done';

// Selecting DOM elements
const checkboxBtn = document.querySelectorAll('.shopping-item-checkbox');
const notCompletedIcon = document.querySelectorAll('.not-completed-icon');
const completedIcon = document.querySelectorAll('.completed-icon');
const loadingSpinner = document.querySelectorAll('.loading-spinner-icon');

const progressBar = document.querySelector('#progressBar');
const progressNumber = document.querySelector('.progress-number');
let progressBarValue = 0;

// Function to handle marking an item as done
const handleMarkAsDone = (notCompleted, spinner, completed, checkBtn) => {
  notCompleted.classList.add(HIDDEN_CLASS);
  spinner.classList.remove(HIDDEN_CLASS);

  setTimeout(() => {
    spinner.classList.add(HIDDEN_CLASS);
    completed.classList.remove(HIDDEN_CLASS);
    checkBtn.classList.add(MARK_AS_DONE_CLASS);
    progressBarValue += 1; // Increment progress bar value
    updateProgressBar();
  }, 1000);
};

// Function to handle marking an item as not done
const handleMarkAsNotDone = (completed, spinner, notCompleted) => {
  completed.classList.add(HIDDEN_CLASS);
  spinner.classList.remove(HIDDEN_CLASS);
  setTimeout(() => {
    spinner.classList.add(HIDDEN_CLASS);
    notCompleted.classList.remove(HIDDEN_CLASS);
    progressBarValue -= 1; // Decrement progress bar value
    updateProgressBar();
  }, 1000);
};

// Function to handle marking an item as done or not done
const handleMarkDoneOrNotDone = (
  checkBtn,
  completed,
  notCompleted,
  spinner
) => {
  const markedAsDone = checkBtn.classList.contains(MARK_AS_DONE_CLASS);
  if (markedAsDone) {
    handleMarkAsNotDone(completed, spinner, notCompleted);
  } else {
    handleMarkAsDone(notCompleted, spinner, completed, checkBtn);
  }
};

// Event listener for checkbox button click
checkboxBtn.forEach((btn, index) => {
  const checkBtn = btn;
  const notCompleted = notCompletedIcon[index];
  const completed = completedIcon[index];
  const spinner = loadingSpinner[index];

  checkBtn.addEventListener('click', function () {
    handleMarkDoneOrNotDone(checkBtn, completed, notCompleted, spinner);
  });
});

// Function to update the progress bar
const updateProgressBar = () => {
  progressBar.value = `${progressBarValue}`;
  progressNumber.textContent = `${progressBarValue}`;
};
