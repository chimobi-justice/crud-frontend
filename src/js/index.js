const post = document.getElementById("post");
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const createLink = document.getElementById("createLink");
const handleLogout = document.getElementById("handleLogout");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loggedOutContent = document.getElementById("loggedOutContent");

const Auth = document.querySelectorAll(".Auth");
const Guest = document.querySelectorAll(".Guest");

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

const AllPost = async () => {
  const data = await fetch("http://localhost:8000/api/posts");
  const res = await data.json();

  const posts = res
    .map(
      (post) =>
        `<div id="postWrapper">
            <h2 id="click">${post.title}</h2>
            <p>${post.body}</p>
            <a href=pages/post.html?id=${post.id} id="getAPost">view post</a>
        </div>`
    )
    .join("");

  post.innerHTML = posts;
};

AllPost();

btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await fetch(`http://localhost:8000/api/posts/search/${searchInput.value}`);
  const res = await data.json();

  const posts = res
    .map(
      (post) =>
        `<div id="postWrapper">
           <h2>${post.title}</h2>
           <p>${post.body}</p>
           <a href="pages/post.html?id=${post.id}">view post</a>
        </div>`
    )
    .join("");

  post.innerHTML = posts;
});

handleLogout.addEventListener("click", async (e) => {
  e.preventDefault();

  const loggedOutRes = await fetch("http://localhost:8000/api/logout", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  localStorage.clear("jwt");

  window.location.href = "./index.html";
});
