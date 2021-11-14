const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

const ErrEmail = document.getElementById("ErrEmail");
const ErrPassword = document.getElementById("ErrPassword");

const emailText = "The email field is required.";
const passwordText = "The password field is required.";

const handleRequiredFields = (e) => {
  if (email.value.length === 0 || password.value.length === 0) {
    ErrEmail.textContent = emailText;
    ErrPassword.textContent = passwordText;
  }
};

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const emailContent = email.value;
  const passwordContent = password.value;

  const data = {
    email: emailContent,
    password: passwordContent,
  };

  // (!localStorage.getItem('jwk')) ? localStorage.setItem('jwt', ) : null;

  try {
    const res = await fetch("http://localhost:8002/api/login", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
