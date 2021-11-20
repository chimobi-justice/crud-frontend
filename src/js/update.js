const title = document.getElementById("title");
const body = document.getElementById("body");
const btnUpdate = document.getElementById("btnUpdate");

const ErrTitle = document.getElementById("ErrTitle");
const ErrBody = document.getElementById("ErrBody");
const updatedPostMessage = document.getElementById("updatedPostMessage");

const createLink = document.getElementById("createLink");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loggedOutContent = document.getElementById("loggedOutContent");

const Auth = document.querySelectorAll(".Auth");
const Guest = document.querySelectorAll(".Guest");

const urlParam = new URLSearchParams(window.location.search);
const getParamId = urlParam.get("id");

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
  if (title.value.length === 0 || body.value.length === 0) {
    ErrTitle.textContent = titleText;
    ErrBody.textContent = bodyText;
  }
};

btnUpdate.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const postTitle = title.value;
  const postBody = body.value;

  const data = {
    title: postTitle,
    body: postBody,
  };

  try {
    const res = await fetch(`http://localhost:8000/api/posts/${getParamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    updatedPostMessage.innerHTML = response.message;
    updatedPostMessage.style.backgroundColor = "lightgreen";
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
