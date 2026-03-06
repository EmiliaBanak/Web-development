if (!localStorage.getItem("visited")) {
  alert("Welcome to Jönköping City!");
  localStorage.setItem("visited", "yes");
}

let venues = [];

fetch("http://localhost:3000/venues")
  .then((response) => response.json())
  .then((data) => {
    venues = data;
    renderVenues();
  })
  .catch((error) => console.log("Error:", error));

/*fetch("http://localhost:3000/venues")
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
  */

//Render venues
function renderVenues(list = venues) {
  const container = document.getElementById("venueList");
  container.innerHTML = "";
  list.forEach((venue, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h4>${venue.name}</h4>
      <p>${venue.district}</p>
      <a href="${venue.url}" target="_blank">Visit website</a><br>
      <button class="venueBtns" id="deleteBtn">DELETE</button>
      <button class="venueBtns" id="editBtn">EDIT</button>
    `;

    //DELETE
    li.querySelector("#deleteBtn").addEventListener("click", () => {
      venues.splice(index, 1);
      renderVenues();
    });

    //EDIT
    li.querySelector("#editBtn").addEventListener("click", () => {
      li.innerHTML = `
      <form class="editForm">
      <input type="text" value="${venue.name}" class="editName"/>
      <input type="text" value="${venue.url}" class="editURL"/>
      <input type="text" value="${venue.district}" class="editDistrict"/>
      </form>
      <button class="venueBtns" id="saveBtn">SAVE</button>
      <button class="venueBtns" id="cancelBtn">CANCEL</button>
      `;

      //SAVE EDIT
      li.querySelector("#saveBtn").addEventListener("click", () => {
        venue.name = li.querySelector(".editName").value;
        venue.url = li.querySelector(".editURL").value;
        venue.district = li.querySelector(".editDistrict").value;
        renderVenues();
      });

      //CANCEL EDIT
      li.querySelector("#cancelBtn").addEventListener("click", () => {
        renderVenues();
      });
    });

    container.appendChild(li);
  });
}

//Sort venues by name
document.getElementById("sortName").addEventListener("click", () => {
  venues.sort((a, b) => a.name.localeCompare(b.name));
  renderVenues();
});

//Sort venues by district
document.getElementById("sortDistrict").addEventListener("click", () => {
  venues.sort((a, b) => a.district.localeCompare(b.district, "sv"));
  renderVenues();
});

//Add a new venue
document
  .getElementById("venueForm")
  .addEventListener("submit", function (submit) {
    submit.preventDefault();

    const name = document.getElementById("name").value;
    const URL = document.getElementById("URL").value;
    const district = document.getElementById("district").value;

    const newVenue = {
      name: name,
      url: URL,
      district: district,
    };

    venues.push(newVenue);

    this.reset();
    renderVenues();
  });

renderVenues();
