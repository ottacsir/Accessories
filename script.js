document.addEventListener("DOMContentLoaded", function () {
const memberBtn = document.getElementById("memberBtn");
const memberForm = document.getElementById("memberForm");
const joinBtn = document.getElementById("joinBtn");
const memberMessage = document.getElementById("memberMessage");

    if (memberBtn && memberForm) {
        memberBtn.addEventListener("click", function () {
            memberForm.classList.add("show");
        });
    }

    if (joinBtn) {
        joinBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const name = document.getElementById("memberName").value.trim();
            const email = document.getElementById("memberEmail").value.trim();

            if (name === "" || email === "") {
                memberMessage.textContent = "Please enter name and email.";
                memberMessage.className = "error";
                memberMessage.style.display = "block";
                return;
            }

            let members = JSON.parse(localStorage.getItem("members")) || [];

            const exists = members.some(member => member.email === email);

            if (exists) {
                memberMessage.textContent = "This email is already registered.";
                memberMessage.className = "error";
                memberMessage.style.display = "block";
                return;
            }

            members.push({ name, email });
            localStorage.setItem("members", JSON.stringify(members));

            memberMessage.textContent = "Welcome to Miya Accessories ✨";
            memberMessage.className = "success";
            memberMessage.style.display = "block";

            document.getElementById("memberName").value = "";
            document.getElementById("memberEmail").value = "";
            setTimeout(() => {
                memberForm.classList.remove("show");
                memberMessage.style.display="none";
            }, 3000);
        });
    }

    const form = document.querySelector("form");
    const formMessage = document.getElementById("formMessage");

    if (form && formMessage) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                formMessage.textContent = "Please fill in all fields.";
                formMessage.className = "form-message error";
                formMessage.style.display = "block";
                return;
            }

            const contactData = {
                name,
                email,
                message,
                date: new Date().toLocaleString()
            };

            let messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push(contactData);
            localStorage.setItem("messages", JSON.stringify(messages));

            formMessage.textContent = "Message sent successfully 💌";
            formMessage.className = "form-message success";
            formMessage.style.display = "block";

            form.reset();
        });
    }

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

});