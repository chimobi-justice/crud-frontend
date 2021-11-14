const post = document.getElementById("post");
const showPost = document.getElementById("showPost");

const AllPost = async () => {
  const data = await fetch("http://localhost:8003/api/posts");
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
