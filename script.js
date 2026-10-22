// ----- data -----
let menu = [];

// ----- elements -----
const menuList = document.getElementById("list-container");

const openButton = document.getElementById("open-button");
const statusLine = document.getElementById("status");

const addButton = document.getElementById("add-button");
const newItem = document.getElementById("new-item");
const newDesc = document.getElementById("new-desc");

const locationButton = document.getElementById("location-button");
const newLocation = document.getElementById("location");
const todayLocation = document.getElementById("today-location");

const totalSoldToday = document.getElementById("total-sold");

// const entireItem = document.getElementById("entire-item"); 




// ----- functions -----

function drawMenu() {

    menuList.replaceChildren();

    let totalsold = 0;
     if (menu.length === 0) {
            console.log("working");
            const empty = document.createElement("li");
            empty.textContent = "No Menu Items Added";
            empty.classList.add("empty");
            menuList.appendChild(empty);

             totalSoldToday.textContent = "Total Sold Today: 0";
        
        menuList.appendChild(totalSoldToday);

            return;
        }
    
    for (let i = 0; i < menu.length; i++) {

       

        totalsold = totalsold + menu[i].sold;
        console.log(totalsold);
        const row = document.createElement("ul");
        row.id = `row-${i}`;
        row.textContent = `${menu[i].name}`;

        const soldButton = document.createElement("button");
        soldButton.textContent = "Sold One";
        soldButton.classList.add("sold-button");


        // if (totalsold = 0) {
        //     totalSoldToday.textContent = "Total Sold Today: 0";

        // }

        soldButton.addEventListener("click", function () {
            menu[i].sold += 1;
            console.log(menu[i].sold);
            drawMenu();
        });
        row.addEventListener("click", function () {
            row.classList.toggle("sold-out")
            if (row.classList.contains("sold-out")) {
                console.log("hi");
                soldButton.disabled = true;
            }
            else {
                soldButton.disabled = false;
            }
        });
        //row.appendChild(soldButton);


        const info = document.createElement("li");
        info.id = row.id;
        info.textContent = `${menu[i].desc}`;
        info.classList.add("info-style");


        menuList.appendChild(row);
        menuList.appendChild(info);
        menuList.appendChild(soldButton);

    }
    if (totalsold === 0) {

        totalSoldToday.textContent = "Total Sold Today: 0";
        console.log("hi");
        menuList.appendChild(totalSoldToday);

    }
    else {

        totalSoldToday.textContent = `Todal Sold Today: ${totalsold}`;
        menuList.appendChild(totalSoldToday);


    }

    //whole.appendChild(soldButton);
}



function openFunction() {
    statusLine.textContent = "Open";
    statusLine.classList.add("open");
}

function addItem() {
    menu.push({ name: newItem.value, desc: newDesc.value, sold: 0, soldout: false })
    drawMenu();

    newItem.value = "";
    newDesc.value = "";
    addButton.disabled = true;
}

function noEmpty() {

    if (newItem.value === "" || newDesc.value === "") {
        addButton.disabled = true;

    }
    else {
        addButton.disabled = false;
        console.log("Hello");
    }
}
let locationButtonUsed = false;
function addLocation() {
    todayLocation.replaceChildren();
    const item = document.createElement("p");
    item.textContent = newLocation.value;
    if (item.textContent === "") {
        item.textContent = "No Location Set";
        item.classList.add("empty");
        todayLocation.appendChild(item);
        return;
    }

    todayLocation.appendChild(item);
    newLocation.value = "";
    locationButton.disabled = true;
    locationButtonUsed = true;
}
function noEmptyLocation() {
    locationButton.disabled = false;
    if (locationButtonUsed || newLocation.value === "") {
        locationButton.disabled = true;
    }
}

// function soldOut(){
//       entireItem.classList.toggle("sold-out")
// }

// ----- listeners -----

openButton.addEventListener("click", openFunction);

addButton.addEventListener("click", addItem);

newItem.addEventListener("input", noEmpty);

newDesc.addEventListener("input", noEmpty);

locationButton.addEventListener("click", addLocation);

newLocation.addEventListener("input", noEmptyLocation);

// entireItem.addEventListener("click", soldOut); 




// ----- run at load -----
drawMenu();
addLocation();

addButton.disabled = true;
locationButton.disabled = true; 