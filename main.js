var slideImg = document.getElementById("slideImg");
var images = new Array(
    "images/frontImage1.png",
    "images/frontImage2.jpg",
    "images/frontImage3.jpg",
    "images/frontImage5.png",
    "images/frontImage4.jpg"          
);
var len = images.length;
var i = 0;

function slider(){
    if(i> len-1){
        i = 0;
    }
    slideImg.src = images[i];
    i++;
    setTimeout('slider()',2000);
}