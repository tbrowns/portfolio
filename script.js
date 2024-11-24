const menu = document.getElementById("links_container"); // Get the menu container element
const open = document.getElementById("menu-btn"); // Get the menu open button element
const close = document.getElementById("close"); // Get the menu close button element

const nava = document.getElementById("header"); // Get the header element

const links = document.querySelectorAll("#nav-link"); // Get all elements with the ID 'link'

const tab_links = document.querySelectorAll(".tab-links"); // Get all elements with the class 'tab-links'
const tab_contents = document.querySelectorAll(".tab-content"); // Get all elements with the class 'tab-content'

AOS.init();

// Add click event listener to each link
links.forEach((link) => {
  link.addEventListener("click", () => {
    if (close.style.display == "block") closemenu(); // Close the menu if it's open
    links.forEach((link) => {
      link.classList.remove("active-nav-link"); // Remove active class from all nav links
    });
    link.classList.add("active-nav-link"); // Add active class to clicked nav link
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
  if (window.scrollY >= 100) {
    // If scrolled more than 100px
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
  limitRate: {
    // Set the limit rate for the application
    id: "app",
    // Allow 1 request per 10s
    throttle: 15000,
  },
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

// Projects data
const projects = [
  {
    title: "Wine Store Management App",
    description:
      "A Firebase-powered wine and spirit store management application",
    image: "assets/images/wine-app-preview.png",
    techStack: ["HTML", "Firebase", "JavaScript"],
    github: "https://github.com/tbrowns/tax-calculator/",
    demo: "https://winesapp.netlify.app/",
  },
  {
    title: "RAG Application",
    description: "A Next.js application for file upload and chat functionality",
    image: "assets/images/moscore-preview.png",
    techStack: ["Next.js", "Tailwind", "Supabase", "TypeScript"],
    github: "https://github.com/tbrowns/moscore-web-app.git",
    demo: "#",
  },
  {
    title: "Tax Calculator App",
    description:
      "A React-based tax calculator application for East African Countries",
    image: "assets/images/calc-preview.png",
    techStack: ["React", "Tailwind", "JavaScript"],
    github: "https://github.com/tbrowns/tax-calculator.git",
    demo: "#",
  },
];

// Dynamically create project cards
const projectGrid = document.querySelector(".project-grid");
projects.forEach((project) => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
          <img src="${project.image}" alt="${
    project.title
  }" class="project-image"/>
          <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <p class="tech-stack">
                  ${project.techStack
                    .map((tech) => `<span>${tech}</span>`)
                    .join(" ")}
              </p>
              <div class="project-links">
                  <a href="${project.github}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="aqua" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub
                    </a>
                  <a href="${project.demo}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="aqua" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    Live Demo
                  </a>
              </div>
          </div>
      `;
  projectGrid.appendChild(projectCard);
});
