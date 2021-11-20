const title = document.getElementById("title");
const body = document.getElementById("body");
const ErrTitle = document.getElementById("ErrTitle");
const ErrBody = document.getElementById("ErrBody");
const btnCreate = document.getElementById("btnCreate");
const postSuccess = document.getElementById("postSuccess");

const createLink = document.getElementById("createLink");
const handleLogout = document.getElementById("handleLogout");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loggedOutContent = document.getElementById("loggedOutContent");

const Auth = document.querySelectorAll(".Auth");
const Guest = document.querySelectorAll(".Guest");

if (!localStorage.getItem("jwt")) window.location.href = "Auth/login.html";

if (localStorage.getItem("jwt")) {
  createLink.textContent = "Create";
  handleLogout.textContent = "Logout";
  Auth.forEach((A) => {
    A.style.display = "block";
  });
}

if (!localStorage.getItem("jwt")) {
  loginBtn.textContent = "Login";
  registerBtn.textContent = "Register";
  Guest.forEach((G) => {
    G.style.display = "block";
  });
}

const titleText = "The title field is required.";
const bodyText = "The body field is required.";

const handleRequiredFields = () => {
  if (!title.value || !body.value) {
    ErrTitle.textContent = titleText;
    ErrBody.textContent = bodyText;
  }
};

const handleKeyUpFields = () => {
  if (title.value.length > 0) {
    ErrTitle.textContent = "";
  }
  if (body.value.length > 0) {
    ErrBody.textContent = "";
  }
};
title.addEventListener("keyup", handleKeyUpFields);
body.addEventListener("keyup", handleKeyUpFields);

btnCreate.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const createTitle = title.value;
  const cretaeBody = body.value;

  const data = {
    title: createTitle,
    body: cretaeBody,
  };

  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (title.value.length === 0 || body.value.length === 0) {
      return (postSuccess.innerHTML = "");
    }
    postSuccess.innerHTML = response.message;
    postSuccess.style.backgroundColor = "lightgreen";
  } catch (error) {
    console.log(error);
  }
});

handleLogout.addEventListener("click", async (e) => {
  e.preventDefault();

  await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  localStorage.clear("jwt");

  window.location.href = "../index.html";
});
