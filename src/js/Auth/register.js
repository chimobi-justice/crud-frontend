const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnRegister = document.getElementById("btnRegister");

const NameErr = document.getElementById("NameErr");
const EmailErr = document.getElementById("EmailErr");
const PasswordErr = document.getElementById("PasswordErr");
const success = document.getElementById("success");

const nameText = "The name field is required.";
const emailText = "The email field is required.";
const passwordText = "The password field is required.";
const passwordMaxLen = "The password must not be greater than 8 characters.";

const handleRequiredFields = () => {
  if (userName.value.length === 0 || email.value.length === 0 || password.value.length === 0) {
    NameErr.textContent = nameText;
    EmailErr.textContent = emailText;
    PasswordErr.textContent = passwordText;
  }

  if (userName.value && (!email.value || !password.value)) {
    NameErr.textContent = "";
  }

  if (email.value && (!password.value || !userName.value)) {
    EmailErr.textContent = "";
  }

  if (password.value && (!email.value || !userName.value)) {
    PasswordErr.textContent = "";
  }

  if (password.value.length > 8) {
    PasswordErr.textContent = passwordMaxLen;
  }
};

const handleKeyUpFields = () => {
  if (userName.value.length > 0) {
    NameErr.textContent = "";
  }
  if (email.value.length > 0) {
    EmailErr.textContent = "";
  }
  if (password.value.length > 0) {
    PasswordErr.textContent = "";
  }
};
userName.addEventListener("keyup", handleKeyUpFields);
email.addEventListener("keyup", handleKeyUpFields);
password.addEventListener("keyup", handleKeyUpFields);

btnRegister.addEventListener("click", async (e) => {
  e.preventDefault();
  handleRequiredFields();

  const userNameContent = userName.value;
  const emailContent = email.value;
  const passwordContent = password.value;

  const data = {
    name: userNameContent,
    email: emailContent,
    password: passwordContent,
  };

  try {
    const res = await fetch("http://localhost:8000/api/register", {
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

    if (dataResponse.message === "The given data was invalid.") {
      success.innerHTML = dataResponse.message;
    } else if (dataResponse.message === "account created successfull") {
      success.innerHTML = dataResponse.message += " Please login";
      success.style.backgroundColor = "lightgreen";
    }
    if (userName.value.length === 0 || email.value.length === 0 || password.value.length === 0) {
      success.innerHTML = "";
      return (EmailErr.textContent = dataResponse.errors.email);
    } else if (userName.value || email.value || password.value) {
      return (EmailErr.textContent = dataResponse.errors.email);
    }
  } catch (error) {
    console.log(error);
  }
});
