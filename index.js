$(document).ready(() => {

    // responsive toggle btn
    const toggleBtn = $(".toggleBtn");
    const closeBtn = $(".closeBtn");

    toggleBtn.on("click", () => {
        $(".nav-links").css("right", "0")
    })

    closeBtn.on("click", () => {
        $(".nav-links").css("right", "-210px")
    })
    // end of responsive toggle btn

    // bird texts
    $(".bird-defination").on("click", () => {
        $(".text").toggleClass("text-truncate");
        if ($(".text").hasClass("text-truncate")) {
            $(".bird-defination").css("height", "auto");
        } else {
            $(".bird-defination").css("height", "");
        }
    });

    //navbar buttons 
    let home = $(".home");
    let birds = $(".birds");
    let birdIcon = $(".bird-icon")
    let flyBtn = $(".flyBtn");
    let exploreBtn = $(".exploreBtn");

    // home category
    home.on("click", homeBtn);
    birdIcon.on("click", homeBtn);

    // bird category
    birds.on("click", birdCategory)
    flyBtn.on("click", birdCategory)
    exploreBtn.on("click", birdCategory)

    // home page changing function
    function homeBtn(event) {
        event.preventDefault();
        $(".main-content").removeClass("d-none");
        $(".main-content").addClass("d-block");

        $(".birds-category").removeClass("d-block");
        $(".birds-category").addClass("d-none");

        $(".birds-description").removeClass("d-block");
        $(".birds-description").addClass("d-none");

        birds.removeClass("active");
        home.addClass("active");
    }

    //bird category page changing function
    function birdCategory(event) {

        event.preventDefault();
        $(".main-content").removeClass("d-block");
        $(".main-content").addClass("d-none");

        $(".birds-category").removeClass("d-none");
        $(".birds-category").addClass("d-block");

        home.removeClass("active");
        birds.addClass("active");

        showBirds();
    }
})

async function showBirds() {
    try {
        let response = await fetch("Birds.json");
        let data = await response.json();
        // console.log(data);

        let birds = data['Tbl_Bird'];
        console.log(birds);

        birds.forEach((bird, index) => {
            console.log(bird)

            // Create HTML elements for each bird
            let col = $(`<div class="col-md-3 mb-4"></div>`);
            let card = $(`<div class="card bird-card bg-dark rounded-4"></div>`);
            let cardBody = $(`<div class="card-body text-light"></div>`);
            let cardText = $(`<div class="card-text text-light"></div>`);
            let cardTitle = $(`<div class="card-title"></div>`);
            let img = $(`<img class="rounded-4" style="width: 100%; height: 250px">`);

            // Set attributes and text content based on bird data
            img.attr("src", bird.ImagePath);

            cardText.text(bird.BirdEnglishName);
            cardTitle.text(bird.BirdMyanmarName);

            // for checking selected bird
            card.attr("value", bird.Id);

            // Append elements to build the card structure
            cardBody.append(cardText, cardTitle)
            card.append(img, cardBody);
            col.append(card);

            // Append the card to the bird row
            console.log($(".bird-row"))
            $(".bird-row").append(col);
            // end of looping the category 

        })
        // click on bird and show bird's info
        $(".bird-card").on("click", (event) => {

            let selectedBirdId = $(event.currentTarget).attr("value");
            // console.log(selectedBird)
            let selectedBird = birds.find(bird => bird.Id == selectedBirdId);
            $(".description-bird").empty();

            $(".birds-category").removeClass("d-block");
            $(".birds-category").addClass("d-none");

            $(".birds-description").removeClass("d-none");
            $(".birds-description").addClass("d-block");

            let col1 = $(`<div class="col-md-4 mt-3 mb-5"></div>`);
            let col2 = $(`<div class="col-md-8 mt-3 mb-5"></div>`);
            let img = $(`<img class="rounded-4" style="width: 100%; height: 100%;">`);
            let engTitle = $(`<h1 class="text-ligth mb-3"></h1>`);
            let mynTitle = $(`<h1 class="text-ligth mb-3"></h1>`);
            let textHolder = $(`<p class="mt-5" style="font-size: 18px;"></p>`);

            img.attr("src", selectedBird.ImagePath);
            engTitle.text(selectedBird.BirdEnglishName);
            mynTitle.text(selectedBird.BirdMyanmarName);
            textHolder.text(selectedBird.Description);

            col1.append(img);
            col2.append(engTitle, mynTitle, textHolder);

            $(".description-bird").append(col1, col2);
            // end of bird description

            // appear back btn
            $(".back-button").removeClass("d-none");
            $(".back-button").addClass("d-block");

            $(".back-button").on("click", () => {
                $(".birds-description").removeClass("d-block");
                $(".birds-description").addClass("d-none");

                $(".birds-category").removeClass("d-none");
                $(".birds-category").addClass("d-block");

                $(".back-button").removeClass("d-block");
                $(".back-button").addClass("d-none");
            })
        })
    }
    catch (error) {
        console.log("In catch: ", error);
    }
}