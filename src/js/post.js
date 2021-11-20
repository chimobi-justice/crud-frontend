const getSinglePost = document.getElementById("getSinglePost");

const createLink = document.getElementById("createLink");
const handleLogout = document.getElementById("handleLogout");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

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

const urlParams = new URLSearchParams(window.location.search);
const getParamId = urlParams.get("id");

const showPost = async () => {
  const data = await fetch(`http://localhost:8000/api/posts/${getParamId}`);
  const res = await data.json();

  const post = `
      <div id="postWrapper">
        <h2>${res.title}</h2>
        <p>${res.body}</p>
        ${
          localStorage.getItem("jwt")
            ? `<button onClick="handleEdit();">Edit Post</button> 
        <button onClick="handleDelete();" id="deleteBtn">Delete Post</button>`
            : ""
        }
      </div>
    `;

  getSinglePost.innerHTML = post;
};

showPost();

const handleEdit = () => {
  window.location.href = `update.html?id=${getParamId}`;
};

const handleDelete = async () => {
  try {
    await fetch(`http://localhost:8000/api/posts/${getParamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    window.location.href = "../index.html";
  } catch (error) {
    console.log(error);
  }
};

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
