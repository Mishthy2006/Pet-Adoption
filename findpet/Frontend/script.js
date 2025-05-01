// --- script.js ---
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
  });

  const navDropdown = document.querySelector('nav .dropdown');
  if (navDropdown) {
      const dropdownLink = navDropdown.querySelector('a');
      const dropdownContent = navDropdown.querySelector('.dropdown-content');

      dropdownLink.addEventListener('click', function (e) {
          e.preventDefault();
          dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', function (e) {
          if (!navDropdown.contains(e.target)) {
              dropdownContent.style.display = 'none';
          }
      });
  }

  const filterDropdowns = document.querySelectorAll('.filters .dropdown');

  filterDropdowns.forEach(dropdown => {
      const selectBox = dropdown.querySelector('.select-box');
      const options = dropdown.querySelector('.options');
      const optionItems = dropdown.querySelectorAll('.options li');

      selectBox.addEventListener('click', function (e) {
          e.stopPropagation();
          filterDropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                  otherDropdown.querySelector('.options').style.display = 'none';
              }
          });
          options.style.display = options.style.display === 'block' ? 'none' : 'block';
      });

      optionItems.forEach(item => {
          item.addEventListener('click', function () {
              const span = selectBox.querySelector('span');
              if (span) {
                  span.textContent = this.textContent;
              }
              options.style.display = 'none';
          });
      });
  });

  document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown')) {
          document.querySelectorAll('.options').forEach(options => {
              options.style.display = 'none';
          });
      }
  });

  const applyFilterBtn = document.querySelector('.apply-filter');
  if (applyFilterBtn) {
      applyFilterBtn.addEventListener('click', function () {
          const petType = document.querySelector('.filter-section:nth-child(2) .select-box span').textContent;
          const state = document.querySelector('.filter-section:nth-child(3) .select-box span').textContent;
          const city = document.querySelector('.filter-section:nth-child(4) .select-box span').textContent;

          fetch('http://localhost:3000/filter-pets', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ petType, state, city })
          })
              .then(response => response.json())
              .then(data => {
                  console.log("Filtered results:", data.results);
                  alert(`Found ${data.results.length} pets matching your filters.`);
                  // Optionally display pets dynamically
              })
              .catch(error => {
                  console.error("Error fetching filtered results:", error);
                  alert("Something went wrong while fetching data.");
              });
      });
  }

  const clearFiltersBtn = document.querySelector('.clear-filters');
  if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const petTypeSpan = document.querySelector('.filter-section:nth-child(2) .select-box span');
          const stateSpan = document.querySelector('.filter-section:nth-child(3) .select-box span');
          const citySpan = document.querySelector('.filter-section:nth-child(4) .select-box span');
          if (petTypeSpan) petTypeSpan.textContent = 'Dog';
          if (stateSpan) stateSpan.textContent = 'Select state here...';
          if (citySpan) citySpan.textContent = 'Select city here...';
          alert('All filters have been cleared');
      });
  }

  const contactButtons = document.querySelectorAll('.contact-now');
  contactButtons.forEach(button => {
      button.addEventListener('click', function (e) {
          e.preventDefault();
          const petCard = this.closest('.pet-card');
          const petName = petCard.querySelector('h2').textContent;
          const ownerName = this.closest('.person-details').querySelector('p:first-child').textContent.replace('Name: ', '');
          alert(`Contact ${ownerName} to adopt ${petName}`);
      });
  });

  const socialButtons = document.querySelectorAll('.social-icons a');
  socialButtons.forEach(button => {
      button.addEventListener('click', function (e) {
          e.preventDefault();
          const petCard = this.closest('.pet-card');
          const petName = petCard.querySelector('h2').textContent;
          const platform = this.className;
          alert(`Share ${petName}'s adoption profile on ${platform}`);
      });
  });

  const adoptNowBtn = document.querySelector('.adopt-now-btn');
  if (adoptNowBtn) {
      adoptNowBtn.addEventListener('click', function () {
          alert('Redirecting to adoption application form');
      });
  }
});
