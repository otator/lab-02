/* eslint-disable no-undef */
'use strict';
let arrayOfNames = [];
let arrayOfObjects = [];
let arrayOfImagesPage1 = [];
let arrayOfImagesPage2 = [];
let arrayOfNames1 = [];
let arrayOfNames2 = [];
// $.ajax('./data/page-1.json').then( (data) => {
//   data.forEach(value =>{
//     arrayOfObjects.push(value);
//     let card = new Card(value);
//     if(!arrayOfNames.includes(value.keyword)){
//       arrayOfNames.push(value.keyword);
//     }
//     if(!arrayOfObjects.includes(card)){
//       arrayOfObjects.push(card);
//     }
//     // card.render();

//   });
//   $('#photo-template').first().remove();
//   arrayOfNames.forEach(value =>{
//     let dropdownListOption = $('.option').first().clone();
//     dropdownListOption.text(value);
//     dropdownListOption.val(value);
//     $('#selectByKeyword').append(dropdownListOption);
//   });
// });//end of ajax function

$('#selectByKeyword').on('change', function(){
  $('.container').html('<div id="photo-template"><h2></h2><img src="" alt=""><p></p></div>');
  arrayOfImagesPage1.forEach(value =>{
    if(value.keyword === $('#selectByKeyword').val()){
      let card = new Card(value);
      card.render();
    }
  });
  $('#photo-template').first().remove();
});


function Card(obj){
  this.imgUrl = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

Card.prototype.render = function(){
  // let cardCopy = $('#photo-template').first().clone();
  // cardCopy.find('h2').text(this.title);
  // cardCopy.find('img').attr('src', this.imgUrl);
  // cardCopy.find('p').text(this.description);
  // $('.container').append(cardCopy);

  let template = $('#script-container').html();
  let objOfMustache = Mustache.render(template, this);
  $('.container').append(objOfMustache);
  console.log('rendering');
};


$('#btn1').on('click', ()=>{
  alert('Button1 clicked');
  arrayOfImagesPage1 = ajaxData('./data/page-1.json');
  for(var i=0; i <arrayOfImagesPage1.length; i++){
    c=console.log(arrayOfImagesPage1[i]);
  }
  arrayOfImagesPage1.forEach(value =>{
    console.log(value);
    // let newCard = new Card(value);
    value.render();
  });
});

$('#btn2').on('click', ()=>{
  alert('Button2 clicked');
  arrayOfImagesPage2 = ajaxData('./data/page-2.json');
  arrayOfImagesPage2.forEach(value => {
    // let newCard = new Card(value);
    value.render();
  });
});

function ajaxData(path){
  let arr = [];
  $.ajax(path).then((data) => {
    data.forEach(value =>{
      let card = new Card(value);
      if(!arrayOfNames.includes(value.keyword)){
        arrayOfNames.push(value.keyword);
      }
      if(!arr.includes(card)){
        arr.push(card);
      }
      // card.render();

    });
    // arr.forEach(value =>{
    //   value.render();
    // });
    $('#photo-template').first().remove();
    arrayOfNames.forEach(value =>{
      let dropdownListOption = $('.option').first().clone();
      dropdownListOption.text(value);
      dropdownListOption.val(value);
      $('#selectByKeyword').append(dropdownListOption);
    });
  });//end of ajax function
  return arr;

}
