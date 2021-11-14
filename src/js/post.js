const getSinglePost = document.getElementById("getSinglePost");

const urlParams = new URLSearchParams(window.location.search);
const getParamId = urlParams.get("id");

const showPost = async () => {
  const data = await fetch(`http://localhost:8003/api/posts/${getParamId}`);
  const res = await data.json();

  const post = `
      <div id="postWrapper">
        <h2>${res.title}</h2>
        <p>${res.body}</p>
        <button onClick="handleEdit();">Edit Post</button>
        <button onClick="handleDelete();" id="deleteBtn">Delete Post</button>
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
    const DeleteRes = await fetch(`http://localhost:8003/api/posts/${getParamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer 1|hC2ewhcXDuuknbh307fkBmD9mKRZy0RhFfoHSPiq",
      },
    });

    console.log(DeleteRes);
  } catch (error) {
    console.log(error);
  }

  window.location.href = "../index.html";
};
