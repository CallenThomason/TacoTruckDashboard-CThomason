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

const resetButton = document.getElementById("reset-button");

const bestSeller = document.getElementById("best-seller");

// const entireItem = document.getElementById("entire-item"); 




// ----- functions -----

function drawMenu() {

    menuList.replaceChildren();

    let totalsold = 0;
    if (menu.length === 0) {

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

            drawMenu();
        });
        row.addEventListener("click", function () {
            row.classList.toggle("sold-out")
            if (row.classList.contains("sold-out")) {

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

        menuList.appendChild(totalSoldToday);

    }
    else {

        totalSoldToday.textContent = `Total Sold Today: ${totalsold}`;
        menuList.appendChild(totalSoldToday);


    }
    betterSeller();
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

function reset() {

    locationButtonUsed = false;
    newLocation.value === "";
    addLocation();
    statusLine.textContent = "Closed";
    statusLine.classList.remove("open");
    menu.forEach(function (item) {
        item.sold = 0;
    });
    drawMenu();
}

function betterSeller() {
    bestSeller.replaceChildren();
    let savedIndex = 0;
    const row = document.createElement("p")
    row.textContent = "No Best seller of the Day Yet";
    row.classList.add("empty");

    for (let i = 0; i < menu.length; i++) {
        if (Number(menu[savedIndex].sold) < Number(menu[i].sold)) {

            savedIndex = i;
        }
    }


    if (menu[savedIndex] != undefined) {

        //console.log(menu[savedIndex].name + menu[savedIndex].sold); 
        if (menu[savedIndex].sold > 0) {
            row.textContent = `The Best Seller of Today is: ${menu[savedIndex].name}`;
            row.classList.remove("empty");
            bestSeller.appendChild(row);
        }
    }

    bestSeller.appendChild(row);

}

// ----- listeners -----

openButton.addEventListener("click", openFunction);

addButton.addEventListener("click", addItem);

newItem.addEventListener("input", noEmpty);

newDesc.addEventListener("input", noEmpty);

locationButton.addEventListener("click", addLocation);

newLocation.addEventListener("input", noEmptyLocation);

resetButton.addEventListener("click", reset);

// entireItem.addEventListener("click", soldOut); 




// ----- run at load -----
drawMenu();
addLocation();
betterSeller();

addButton.disabled = true;
locationButton.disabled = true; 