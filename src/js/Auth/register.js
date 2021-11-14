const fullname = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_confirmation = document.getElementById("password_confirmation");
const btnRegister = document.getElementById("btnRegister");

const ErrFullname = document.getElementById("ErrFullname");
const ErrEmail = document.getElementById("ErrEmail");
const ErrPassword = document.getElementById("ErrPassword");

const fullnameText = "The fullname field is required.";
const emailText = "The email field is required.";
const passwordText = "The password field is required.";
const passwordConfirmationText = "The password confirmation does not match";
const passwordMinLen = "The password must be at least 8 characters.";

const handleRequiredFields = (e) => {
  if (fullname.value.length === 0 || email.value.length === 0 || password.value.length === 0) {
    ErrFullname.textContent = fullnameText;
    ErrEmail.textContent = emailText;
    ErrPassword.textContent = passwordText;
  }

  if (password.value != password_confirmation.value) {
    ErrPassword.textContent = passwordConfirmationText;
  }

  if (password.value.length < 8) {
    ErrPassword.textContent = passwordMinLen;
  }
};

btnRegister.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const fullnameContent = fullname.value;
  const emailContent = email.value;
  const passwordContent = password.value;

  const data = {
    fullname: fullnameContent,
    email: emailContent,
    password: passwordContent,
  };

  try {
    const res = await fetch("http://localhost:8003/api/register", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "[*]",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }

  // const data = await res.json();

  // console.log(data);

  // if (password.value.length < 8) {
  //   ErrPassword.textContent = passwordMinLen;
  // }
});
