const accesskey = 'Zvsj0pMmO3ITYdaNCYLjrAUp1KIppoOi2FnaupUDvK4';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');

// setInterval(() => {
//     console.log(searchInput[0].value);
// }, 200);

const imageContainer = document.querySelector('.image-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');


let page = 1;

//Function to fetch images using Unsplash API
const fetchImage = async (query, pageNo) =>{
    if(pageNo === 1) {
     imageContainer.innerHTML = '';
    }

    const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accesskey}`

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
     
    data.forEach(photo => {
        //creating image div
        const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src="${photo.urls.regular}" class="wh-200"/>`;
        imageElement.style.scrollSnapAlign = 'center';

        //creating overlay
        // const overlayElement = document.createElement('div');
        // overlayElement.classList.add('overlay');

        // //Creating overlay text
        // const overlayText = document.createElement('h3');
        // overlayText.innerText = `${photo.alt_description}`;

        // overlayElement.appendChild(overlayText);
        // imageElement.appendChild(overlayElement);

        imageContainer.appendChild(imageElement);
    });
    
    if  (data.total_pages === pageNo){
        loadMoreBtn.Style.display = "none";
    }
    else {
        loadMoreBtn.style.display = "block";
    }

    
}


// Adding Event Listener to search form
 searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(searchInput.value)
    const inputText = searchInput.value.trim();
    // console.log('searching');
    if(inputText !== ''){
         page = 1;
        fetchImage(inputText,page);
    }
  else{
    imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`
  }
});


// Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener('click',() => {
    fetchImage(searchInput.value.trim(), ++page);
});

const ie = document.getElementsByClassName('imageDiv');
ie.forEach(i => i.addEventListener('mouseenter', e => e.classList.add('overlay')));
ie.forEach(i => i.addEventListener('mouseleave', e => e.classList.remove('overlay')));