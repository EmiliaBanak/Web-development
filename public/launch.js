if (!localStorage.getItem("visited")) {
  alert("Welcome to Jönköping City!");
  localStorage.setItem("visited", "yes");
}

fetch("http://localhost:3000/venues")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then((data) => {
    console.log("GET response data:", data);
    const list = document.getElementById("shopsList");

    data.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country.name;
      list.appendChild(li);
    });
  });
