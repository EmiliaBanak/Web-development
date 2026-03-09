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

/*
fetch("http://localhost:3000/venues")
  .then((response) => response.json())
  .then((data) => {
    const list = document.getElementById("venueList");

    data.forEach((shop) => {
      const li = document.createElement("li");
      li.textContent = shop.name + " - " + shop.district;
      list.appendChild(li);
    });
  })
  .catch((error) => console.log(error));
  */

//Render venues
function renderVenues(list = venues) {
  const container = document.getElementById("venueList");
  if (!container) return;
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

    // DELETE
    li.querySelector("#deleteBtn").addEventListener("click", () => {
      fetch(`http://localhost:3000/venues/${venue.id}`, {
        method: "DELETE",
      }).then(() => {
        venues = venues.filter((v) => v.id !== venue.id);
        renderVenues();
      });
    });

    // EDIT
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

      // SAVE EDIT
      li.querySelector("#saveBtn").addEventListener("click", () => {
        const updatedVenue = {
          name: li.querySelector(".editName").value,
          url: li.querySelector(".editURL").value,
          district: li.querySelector(".editDistrict").value,
        };

        fetch(`http://localhost:3000/venues/${venue.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVenue),
        })
          .then((res) => res.json())
          .then((data) => {
            const index = venues.findIndex((v) => v.id === venue.id);
            venues[index] = data;
            renderVenues();
          });
      });

      // CANCEL EDIT
      li.querySelector("#cancelBtn").addEventListener("click", () => {
        renderVenues();
      });
    });
    container.appendChild(li);
  });
}

//Sort venues by name
//The following website was used as inspiration to create the following logic
//https://www.scaler.com/topics/javascript-alphabetical-sort/
document.getElementById("sortName").addEventListener("click", () => {
  venues.sort((a, b) => a.name.localeCompare(b.name));
  renderVenues();
});

//Sort venues by district
//The following website was used as inspiration to create the following logic
//https://www.scaler.com/topics/javascript-alphabetical-sort/
document.getElementById("sortDistrict").addEventListener("click", () => {
  venues.sort((a, b) => {
    const districtA = a.district || "";
    const districtB = b.district || "";
    return districtA.localeCompare(districtB, "sv");
  });
  renderVenues();
});

//Add a new venue
document
  .getElementById("venueForm")
  .addEventListener("submit", function (submit) {
    submit.preventDefault();

    const newVenue = {
      name: document.getElementById("name").value,
      url: document.getElementById("URL").value,
      district: document.getElementById("district").value,
    };

    //POST
    fetch("http://localhost:3000/venues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVenue),
    })
      .then((res) => res.json())
      .then((data) => {
        venues.push(data);
        renderVenues();
        this.reset();
      });
  });

//renderVenues();
