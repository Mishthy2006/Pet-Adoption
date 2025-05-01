document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('themeToggle');
    const form = document.getElementById("adoptionForm");
    const responseMessage = document.getElementById("responseMessage");

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            petType: this.petType.value,
            message: this.message.value,
        };

        try {
            const response = await fetch("http://localhost:3000/adopt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            responseMessage.textContent = result.message;
            this.reset();
        } catch (err) {
            console.error("Error:", err);
            responseMessage.textContent = "Submission failed!";
        }
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
});
