const searchContainer = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await fetch(`http://localhost:8002/api/posts/search/${searchInput.value}`);
  const res = await data.json();

  const posts = res
    .map(
      (post) =>
        `<div>
          <div>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <a href="show.html?id=${post.id}">view post</a>
          </div>
        </div>`
    )
    .join("");

  searchContainer.innerHTML = posts;
});
