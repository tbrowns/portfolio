const menu = document.getElementById("links_container"); // Get the menu container element
const open = document.getElementById("menu-btn"); // Get the menu open button element
const close = document.getElementById("close"); // Get the menu close button element

const nava = document.getElementById("header"); // Get the header element

const links = document.querySelectorAll("#link"); // Get all elements with the ID 'link'

const tab_links = document.querySelectorAll(".tab-links"); // Get all elements with the class 'tab-links'
const tab_contents = document.querySelectorAll(".tab-content"); // Get all elements with the class 'tab-content'

// Add click event listener to each link to close the menu
links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.style.left = "100%"; // Move menu out of view
  });
});

// Function to open the menu
function openmenu() {
  menu.style.left = "30%"; // Move menu into view
  open.style.display = "none"; // Hide the open button
  close.style.display = "block"; // Show the close button
}

// Function to close the menu
function closemenu() {
  menu.style.left = "100%"; // Move menu out of view
  open.style.display = "block"; // Show the open button
  close.style.display = "none"; // Hide the close button
}

// Change header style on scroll
window.onscroll = function () {
  if (window.scrollY >= 100) { // If scrolled more than 100px
    nava.style.background = "rgba(30,33,37,0.8)"; // Set background color
    nava.style.zIndex = "999999"; // Set z-index
    nava.style.boxShadow = "0px 0px 10px black"; // Add shadow
  } else {
    nava.style.background = "none"; // Remove background color
    nava.style.zIndex = "999999"; // Set z-index
    nava.style.boxShadow = "none"; // Remove shadow
  }
};

// Add click event listener to each tab link
tab_links.forEach((tab_link) => {
  tab_link.addEventListener("click", () => {
    tab_links.forEach((tab_link) => {
      tab_link.classList.remove("active-link"); // Remove active class from all tab links
    });

    tab_contents.forEach((tab_content) => {
      tab_content.classList.remove("active-tab"); // Remove active class from all tab contents
    });

    tab_link.classList.add("active-link"); // Add active class to clicked tab link

    document
      .getElementById(tab_link.textContent.toLowerCase()) // Get the corresponding tab content
      .classList.add("active-tab"); // Add active class to the corresponding tab content
  });
});

// Initialize EmailJS with your User ID
emailjs.init({
  publicKey: "qMHmY9ldVNVeksvn2", // Your EmailJS public key
});

// Function to send email
function sendEmail(event) {
  event.preventDefault(); // Prevent default form submission

  // EmailJS Configuration
  const SERVICE_ID = "service_dpy3quy"; // Your EmailJS service ID
  const TEMPLATE_ID = "template_kaeqr8c"; // Your EmailJS template ID

  // Collect form data
  const name = document.querySelector("#username").value; // Get name from form
  const email = document.querySelector("#email").value; // Get email from form
  const subject = document.querySelector("#subject").value; // Get subject from form
  const phone = document.querySelector("#phone").value; // Get phone from form
  const message = document.querySelector("#message").value; // Get message from form

  // Validate form fields
  if (!name || !email || !subject || !message) {
    alert("Please fill in all required fields"); // Alert if any required field is missing
    return;
  }

  // EmailJS template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    phone_number: phone,
    message: message,
  };

  // Send email using EmailJS
  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text); // Log success
      alert("Your message was sent successfully!"); // Alert success
      event.target.reset(); // Reset form after successful submission
    })
    .catch((error) => {
      console.error("Email sending failed:", error); // Log error
      alert("Failed to send message. Please try again."); // Alert failure
    });
}

// Add event listener to form submission
document.querySelector(".form").addEventListener("submit", sendEmail); // Attach sendEmail function to form submit event
