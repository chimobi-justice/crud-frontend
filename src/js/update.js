const title = document.getElementById("title");
const body = document.getElementById("body");
const btnUpdate = document.getElementById("btnUpdate");

const ErrTitle = document.getElementById("ErrTitle");
const ErrBody = document.getElementById("ErrBody");

const urlParam = new URLSearchParams(window.location.search);
const getParamId = urlParam.get("id");

const titleText = "The title field is required.";
const bodyText = "The body field is required.";

const handleRequiredFields = (e) => {
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

  // if (!localStorage.getItem("jwt")) window.location.href = "Auth/login.html";

  try {
    const res = await fetch(`http://localhost:8003/api/posts/${getParamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer 1|hC2ewhcXDuuknbh307fkBmD9mKRZy0RhFfoHSPiq",

        // authorization: `Bearer ${localStorage.getItem("jwt")} || null`,
      },
      body: JSON.stringify(data),
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
