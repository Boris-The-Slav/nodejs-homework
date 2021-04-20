const getBtn = document.querySelector(".btn-get");
const postBtn = document.querySelector(".btn-post");
const showFormBtn = document.querySelector(".btn-show-form");
const formContainer = document.querySelector(".create-user-container");
const postsContainer = document.querySelector(".posts-container");

const API_URL = "http://localhost:3000";

let showContainer = false;
formContainer.style.display = showContainer ? "block" : "none";

const fetchData = endpoint => {
  fetch(API_URL + endpoint, {
    method: "GET",
  })
    .then(res => res.json())
    .then(res => renderUsers(res, postsContainer));
};

const postData = (endpoint, reqBody) => {
  fetch(API_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(reqBody),
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const onAddNewUser = newUser => {
  postData("/users", newUser);
};

const getUserInputs = () => {
  return {
    name: document.querySelector("#name-input").value,
    username: document.querySelector("#username-input").value,
    email: document.querySelector("#email-input").value,
    address: { city: document.querySelector("#city-input").value },
    phone: document.querySelector("#phone-input").value,
  };
};

const renderUsers = (users, container) => {
  let inner = "";
  console.log(users);
  users.forEach(user => {
    inner += `<div class="user-container">
      <p>Name: ${user.name}</p>
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
      <p>Phone: ${user.phone}</p>
      </div>`;
  });
  container.innerHTML = inner;
};

getBtn.addEventListener("click", () => {
  fetchData("/users");
});

showFormBtn.addEventListener("click", () => {
  showContainer = !showContainer;
  formContainer.style.display = showContainer ? "block" : "none";
});

postBtn.addEventListener("click", e => {
  e.preventDefault();
  const newUser = getUserInputs();
  onAddNewUser(newUser);
});
