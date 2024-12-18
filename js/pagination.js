const cakes_const = [
    { name: "Тирамису", price: "2900 р/кг", image: "../img/cakes/tiramisu.jpeg" },
    { name: "Прага", price: "2750 р/кг", image: "../img/cakes/praga.jpeg" },
    { name: "Киевский", price: "2650 р/кг", image: "../img/cakes/kiev.jpeg" },
    { name: "Наполеон", price: "2650 р/кг", image: "../img/cakes/napoleon.jpeg" },
    { name: "Красный бархат", price: "2650 р/кг", image: "../img/cakes/red_velvet.jpeg" },
    { name: "Медовик", price: "2700 р/кг", image: "../img/cakes/medovik.jpeg" },
    { name: "Муссовый торт 3 шоколада", price: "2850 р/кг", image: "../img/cakes/3_choko.jpeg" },
    { name: "Черный лес", price: "2750 р/кг", image: "../img/cakes/black_tree.jpeg" },
    { name: "Молочная девочка", price: "2850 р/кг", image: "../img/cakes/milky_girl.jpeg" },
];

let photos = []
// [
//     { name: "Брауни", price: "300 р/шт", image: "../img/cakes/brauni.jpeg" },
//     { name: "Тирамису", price: "2900 р/кг", image: "../img/cakes/tiramisu.jpeg" },
//     { name: "Прага", price: "2750 р/кг", image: "../img/cakes/praga.jpeg" },
//     { name: "Киевский", price: "2650 р/кг", image: "../img/cakes/kiev.jpeg" },
//     { name: "Наполеон", price: "2650 р/кг", image: "../img/cakes/napoleon.jpeg" },
//     { name: "Красный бархат", price: "2650 р/кг", image: "../img/cakes/red_velvet.jpeg" },
//     { name: "Медовик", price: "2700 р/кг", image: "../img/cakes/medovik.jpeg" },
//     { name: "Муссовый торт 3 шоколада", price: "2850 р/кг", image: "../img/cakes/3_choko.jpeg" },
//     { name: "Черный лес", price: "2750 р/кг", image: "../img/cakes/black_tree.jpeg" },
//     { name: "Молочная девочка", price: "2850 р/кг", image: "../img/cakes/milky_girl.jpeg" },
// ];

const minicakes_const = [
    { name: "Брауни", price: "300 р/шт", image: "../img/cakes/brauni.jpeg" },
    { name: "Тирамису", price: "2900 р/кг", image: "../img/cakes/tiramisu.jpeg" },
    { name: "Прага", price: "2750 р/кг", image: "../img/cakes/praga.jpeg" },
    { name: "Киевский", price: "2650 р/кг", image: "../img/cakes/kiev.jpeg" },
    { name: "Наполеон", price: "2650 р/кг", image: "../img/cakes/napoleon.jpeg" },
    { name: "Красный бархат", price: "2650 р/кг", image: "../img/cakes/red_velvet.jpeg" },
    { name: "Медовик", price: "2700 р/кг", image: "../img/cakes/medovik.jpeg" },
    { name: "Муссовый торт 3 шоколада", price: "2850 р/кг", image: "../img/cakes/3_choko.jpeg" },
    { name: "Черный лес", price: "2750 р/кг", image: "../img/cakes/black_tree.jpeg" },
    { name: "Молочная девочка", price: "2850 р/кг", image: "../img/cakes/milky_girl.jpeg" },
];

let cakes = cakes_const;

const currentLocation = window.location.pathname;
    
if (currentLocation.endsWith("index.html")) {
    cakes = cakes_const;
}
if (currentLocation.endsWith("cake.html")) {
    cakes = minicakes_const;
}
if (currentLocation.endsWith("photo.html")){
    cakes = photos;
}

const itemsPerPage = 6;
const buttonsPerPage = 5;
let currentPage = 1;

const catalog = document.querySelector('.catalog');
let prevPageButton = document.getElementById('prevPage');
let nextPageButton = document.getElementById('nextPage');
let  pageButtons = [];
const paginationContainer = document.querySelector(".pagination");

function renderCakes(page) {
    catalog.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const cakesToDisplay = cakes.slice(startIndex, endIndex);

    cakesToDisplay.forEach(cake => {
        const cakeElement = document.createElement('div');
        cakeElement.classList.add('catalog_card');
        cakeElement.innerHTML = `
            <div class="catalog_card_photo"><img src="${cake.image}" alt="${cake.name}" class="catalog_card_photo_img"></div>
        `;
        if (!currentLocation.endsWith("photo.html")){
            cakeElement.innerHTML += `<div class="catalog_card_details">
                <div class="catalog_card_details_name">${cake.name}</div>
                <div class="catalog_card_details_price">${cake.price}</div>
            </div>`;
        }
        catalog.appendChild(cakeElement);
    });

    updatePagination(page);
}


function renderPaginationButtons() {
    paginationContainer.innerHTML = ""; // Очищаем пагинацию

    const pagesCount = Math.ceil(cakes.length / itemsPerPage);

    // Создание кнопки "Назад"
    const prevButton = document.createElement("a");
    prevButton.href = "#";
    prevButton.id=`prevPage`;
    prevButton.classList.add("pagination_button");
    prevButton.innerHTML = "&laquo;";
    paginationContainer.appendChild(prevButton);
    prevPageButton = prevButton

    pageButtons.length=0;

    let start = Math.max(currentPage-1,1)

    // Создание кнопок страниц
    for (let i = start; i <= Math.min(start+buttonsPerPage-1,pagesCount); i++) {
        const pageButton = document.createElement("a");
        pageButton.href = "#";
        pageButton.id = `page${i}`;
        pageButton.classList.add("pagination_button");
        // if (i === currentPage) {
        //     pageButton.classList.add("pagination_button__active");
        // }
        pageButton.textContent = i;
        paginationContainer.appendChild(pageButton);
        pageButtons.push(pageButton)
    }


    // Создание кнопки "Вперёд"
    const nextButton = document.createElement("a");
    nextButton.href = "#";
    nextButton.id=`nextPage`;
    nextButton.classList.add("pagination_button");
    nextButton.innerHTML = "&raquo;";
    paginationContainer.appendChild(nextButton);
    nextPageButton = nextButton

    // pageButtons = document.querySelectorAll('.pagination_button');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const page = parseInt(e.target.innerText);
            currentPage = page;
            updatePage()
        });
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage()
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(cakes.length / itemsPerPage)) {
            currentPage++;
            updatePage()
        }
    });

}

function updatePagination(page) {
    pageButtons.forEach(button => button.classList.remove('pagination_button__active'));
    document.getElementById(`page${page}`).classList.add('pagination_button__active');

    prevPageButton.style.display = page === 1 ? 'none' : 'inline-block';
    nextPageButton.style.display = page === Math.ceil(cakes.length / itemsPerPage) ? 'none' : 'inline-block';
}

function updatePage() {
    if (cakes.length !=0 ){
        console.log(currentPage);
        renderPaginationButtons();
        renderCakes(currentPage);
    }
}

updatePage()