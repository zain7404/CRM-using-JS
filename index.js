let add_card = document.getElementById('add-card');
let popup = document.getElementById('popup');
let popup_two = document.getElementById('popup_two');

let close_button = document.getElementById("close-button");
let save_button = document.getElementById("save-button");

let busy = document.getElementById("busy");
let working = document.getElementById("working");
let Gym = document.getElementById("Gym");
let available = document.getElementById("available");
let Waste = document.getElementById("Waste");

let clear = document.getElementById("clear");

let field = document.getElementById("field");
let notes = document.getElementById("notes");
let status = document.getElementById("status");
let profile = document.getElementById("profile");
let lead = document.getElementById("lead");
let edit_field = document.getElementById("edit-field");
let edit_notes = document.getElementById("edit-notes");
let edit_status = document.getElementById("edit-status");
let edit_profile = document.getElementById("edit-profile");
let edit_lead = document.getElementById("edit-lead");
let edit = document.getElementById("edit-button");




let close_profile = document.querySelector(".close");
let CardsData = JSON.parse(localStorage.getItem("cardContainer")) || [];
window.onload = function() {
    SaveData();
};

function SaveData() {
    let cardContainer = document.querySelector(".card-container");
    let innerHTML = "";
    for (let i = 0; i < CardsData.length; i++) {
        let cardData = CardsData[i];
        innerHTML += `<div id="card">

    <div style ="display: flex;top: -23px;display: flex;position: relative;">
    <i class="fa fa-edit" style="font-size:14px"onclick = "editCard(${i});"></i>
    <i class="fa fa-trash" style="font-size:14px"onclick = "deleteCard (${i});"></i>
    </div>
    <h2>${cardData.field}</h2>
    <h3>Profile: <span>${cardData.profile}</span></h3>
<h3>Notes : <span>${cardData.notes}</span></h3>
<h3>Status : <span>${cardData.status}</span></h3>
<div class="card-end">
    <h3 id = "lead-heading">Lead By: <span>${cardData.lead}</span></h3>
</div>
</div>`;
    }
    cardContainer.innerHTML = innerHTML;
}

function generateId() {
    return Math.random().toString(36).substring(2, 6);
}
generateId();

add_card.addEventListener("click", () => {
    popup.style.display = "block";
});

close_button.addEventListener("click", () => {
    popup.style.display = "none";
});

save_button.addEventListener("click", (e) => {
    e.preventDefault();

    let cardContainer = document.querySelector('.card-container');
    if (notes.value === '' || field.value === '' || status.value === '' || profile.value === '' || lead.value === '') {
        let msg = document.getElementById('snackbar');
        msg.innerHTML = 'Please fill all the fields';
        msg.style.background = "red";
        myFunction();
        return;
    } else {
        let msg = document.getElementById('snackbar');
        msg.innerHTML = 'Card saved successfully';
        msg.style.background = "green";
        myFunction();

    }
    CardsData.push({
        id: generateId(),
        notes: notes.value,
        field: field.value,
        status: status.value,
        profile: profile.value,
        lead: lead.value,
    });

    SaveData();

    localStorage.setItem("cardContainer", JSON.stringify(CardsData));

    popup.style.display = "none";

    notes.value = "";
    field.value = "";
    status.value = "";
    profile.value = "";
    lead.value = "";
});

function deleteCard(index) {
    CardsData.splice(index, 1);
    SaveData();
    localStorage.setItem("cardContainer", JSON.stringify(CardsData));
    let msg = document.getElementById('snackbar');
    msg.innerHTML = 'Card deleted Successfully';
    msg.style.background = "green";
    myFunction();
}

function editCard(index) {
    let cardToEdit = CardsData[index];

    edit_field.value = cardToEdit.field;
    edit_notes.value = cardToEdit.notes;
    edit_status.value = cardToEdit.status;
    edit_profile.value = cardToEdit.profile;
    edit_lead.value = cardToEdit.lead;

    popup_two.style.display = "block";

    // Define a separate function for handling the edit action


    // Add the event listener to the edit button
    edit.addEventListener("click", handleEdit);

    function handleEdit(e) {
        e.preventDefault();

        CardsData[index].field = edit_field.value;
        CardsData[index].notes = edit_notes.value;
        CardsData[index].status = edit_status.value;
        CardsData[index].profile = edit_profile.value;
        CardsData[index].lead = edit_lead.value;

        if (edit_notes.value === '' || edit_field.value === '' || edit_status.value === '' || edit_profile.value === '' || edit_lead.value === '') {
            let msg = document.getElementById('snackbar');
            msg.innerHTML = 'Please fill all the fields';
            msg.style.background = "red";
            myFunction();
            return;
        } else {
            let msg = document.getElementById('snackbar');
            msg.innerHTML = 'Card edited successfully';
            msg.style.background = "green";
            myFunction();
        }

        localStorage.setItem("cardContainer", JSON.stringify(CardsData));

        SaveData();

        popup_two.style.display = "none";

        // Remove the event listener after it's been triggered once
        edit.removeEventListener("click", handleEdit);
    }
}



clear.addEventListener("click", () => {
    selectedProfile = "";
    selectedStatus = "";

    SaveData();
})
document.querySelectorAll(".profile").forEach((button) => {
    button.addEventListener("click", () => {
        selectedProfile = button.textContent.trim();
        console.log("selected_profile", selectedProfile);
        filterCard();
    });
});
document.querySelectorAll("#busy, #available, #Waste, #Gym, #working")
    .forEach((button) => {
        button.addEventListener("click", () => {
            selectedStatus = button.textContent.trim();
            console.log("selected Status", selectedStatus);
            filterCard();
        });
    });

let selectedProfile = "";
let selectedStatus = "";

function filterCard() {
    let filterDta = CardsData;
    let filterHTML = filterDta.filter((card) => {
        if (card.profile === selectedProfile) {
            return card.profile === selectedProfile
        }
    })

    if (selectedStatus !== "") {
        if (selectedProfile !== "") {
            filterHTML = filterDta.filter((card) => {
                return card.profile === selectedProfile && card.status === selectedStatus
            })
        } else {
            filterHTML = filterDta.filter((card) => {
                return card.status === selectedStatus
            })
        }

    }
    if (filterHTML.length === 0) {
        let msg = document.getElementById('snackbar');
        msg.innerHTML = 'There are no cards for this filter';
        msg.style.background = "red";
        myFunction();
    }
    let cardContainer = document.querySelector('.card-container');
    let innerHTML = '';
    filterHTML.forEach((cardData, index) => {
        innerHTML += `<div id="card">
    <div style ="display: flex;     top: -23px;display: flex;position: relative;" >
        <i class="fa fa-edit" style="font-size:14px" onclick="editCard(${index});"></i>
        <i class="fa fa-trash" style="font-size:14px" onclick="deleteCard(${index});"></i>
    </div>
    <h2>${cardData.field}</h2>
    <h3>Profile: <span>${cardData.profile}</span></h3>
    <h3>Notes : <span>${cardData.notes}</span></h3>
    <h3>Status : <span>${cardData.status}</span></h3>
    <div class="card-end">
        <h3 id = "lead-heading">Lead By: <span>${cardData.lead}</span></h3>
    </div>
</div>`;
    })

    cardContainer.innerHTML = innerHTML;
}
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */







function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
}
document.addEventListener('DOMContentLoaded', function() {
    let menu_icon_box = document.querySelector(".menu_icon_box");
    let box = document.querySelector(".box");

    menu_icon_box.onclick = function() {
        menu_icon_box.classList.toggle("active");
        box.classList.toggle("active_box");

    }

    // Close sidebar when clicking outside sidebar and not on buttons
    document.addEventListener('click', function(e) {
        if (!box.contains(e.target) && !menu_icon_box.contains(e.target)) {
            menu_icon_box.classList.remove("active");
            box.classList.remove("active_box");
        }
    });

    // Prevent closing sidebar when clicking on buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up to the document click event
        });
    });
});