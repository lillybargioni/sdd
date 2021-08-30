var slideImages = document.getElementsByClassName("thumbIMG");


// Function assigns the clicked image to the local variable 'selected', and then
// displays it as featured image by updating the img src.
function showSlide() {
  var selected = '';

  selected = 'img_assets/portfolio/' + this.id + '.jpg';
  document.getElementById('change').src = selected;
}


// Function acts as listener for user interaction with the slideshow thumbnails.
// The loop runs until all images have been stored in the global array slideImages,
// while calling the showSlide Function each iteration.
function createEventListeners(){
	for (i=0; i< slideImages.length; i++){
		slideImages[i].addEventListener("click", showSlide, false);
	}
}


// Function declares variable and assigns it's value to a hidden div element.
// If/else statement acts as a toggle for the elements display style (hidden/displayed).
// Called dirrectly from home.html, and runs when the subscription button is clicked.
function showEntry() {
  var subscribe = document.getElementById("showSubscribe");

  if(subscribe.style.display === "none" || subscribe.style.display === "") {
      subscribe.style.display = "inline-flex";
  } else {
      subscribe.style.display = "none";
    }
}


// When page loads, if/else statement determines browser compatibility
// and determines calling method to run the event listener.
if(window.addEventListener) {
  window.addEventListener("load",createEventListeners, false);
} else if (window.attatchEvent) {
    window.attatchEvent("onload", createEventListeners, false);
}
