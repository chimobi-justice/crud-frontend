const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

const ErrEmail = document.getElementById("ErrEmail");
const ErrPassword = document.getElementById("ErrPassword");
const invalidCreds = document.getElementById("invalidCreds");

const emailText = "The email field is required.";
const passwordText = "The password field is required.";

const handleRequiredFields = () => {
  if (!email.value || !password.value) {
    ErrEmail.textContent = emailText;
    ErrPassword.textContent = passwordText;
  }
  if (email.value && !password.value) {
    ErrEmail.textContent = "";
  }
  if (password.value && !email.value) {
    ErrPassword.textContent = "";
  }
};

const handleKeyUpFields = () => {
  if (email.value.length > 0) {
    ErrEmail.textContent = "";
  }
  if (password.value.length > 0) {
    ErrPassword.textContent = "";
  }
};
email.addEventListener("keyup", handleKeyUpFields);
password.addEventListener("keyup", handleKeyUpFields);

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const emailContent = email.value;
  const passwordContent = password.value;

  const data = {
    email: emailContent,
    password: passwordContent,
  };

  try {
    const res = await fetch("http://localhost:8000/api/login", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await res.json();

    localStorage.setItem("jwt", dataResponse.token);

    if (dataResponse.message === "successfully loggedIn") {
      window.location.href = "../../pages/create.html";
    }

    if (email.value.length === 0 || password.value.length === 0) {
      invalidCreds.innerHTML = "";
      return;
    } else if (email.value || password.value) {
      invalidCreds.innerHTML = dataResponse.message;

      if (dataResponse.message === "successfully loggedIn") {
        invalidCreds.style.backgroundColor = "lightgreen";
      }

      if (dataResponse.message === "Invalid Credentials") {
        invalidCreds.style.backgroundColor = "red";
      }

      return;
    }
  } catch (error) {
    console.log(error);
  }
});
