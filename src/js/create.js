const title = document.getElementById("title");
const body = document.getElementById("body");
const btnCreate = document.getElementById("btnCreate");

btnCreate.addEventListener("click", async (e) => {
  e.preventDefault();

  const createTitle = title.value;
  const cretaeBody = body.value;

  const data = {
    title: createTitle,
    body: cretaeBody,
  };

  // if (!localStorage.getItem("jwt")) window.location.href = "Auth/login.html";

  try {
    const res = await fetch("http://localhost:8003/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer 1|hC2ewhcXDuuknbh307fkBmD9mKRZy0RhFfoHSPiq",
      },

      body: JSON.stringify(data),
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
