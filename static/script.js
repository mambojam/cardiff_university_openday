const mainEventContainer = document.querySelector("[data-main-event-container]");
const eventCardTemplate = document.querySelector("[data-event-template]");
const eventCardContainer = document.querySelector("[data-event-cards-container]");
const searchInput = document.querySelector('[data-search]');



let topics = [];

// Search for topics that include (name or description) input
searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    topics.forEach(topic => {
        const isVisible = topic.name.includes(value) || topic.description.includes(value);
        topic.element.classList.toggle("hide", !isVisible);
})})


// Fetch JSON data
fetch('static/OpenDay.json') 
    .then(res => {
        console.log("Checking request");
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        console.log("Request ok");
        return res.json();
    })
        
    .then(data => {


        console.log(data);

        // Fill main event container
        mainEventContainer.querySelector('.header').textContent = data.description;
        mainEventContainer.querySelector('.body').querySelector('.start').textContent = "Event start time: " + data.start_time;
        mainEventContainer.querySelector('.body').querySelector('.end').textContent = "Event end time: " + data.end_time;


        // Get Topics
        topics = data.topics.map(topic => {

            const card = eventCardTemplate.content.cloneNode(true).children[0];
            const image = card.querySelector('[data-image]')
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            if (topic.cover_image) {
                image.src = topic.cover_image;
            }
            
            header.textContent = topic.name;
            body.textContent = topic.description;
            eventCardContainer.append(card);



            return { name: topic.name, description: topic.description, events: topic.programs, element: card }

        })
        })
   