/* eslint-disable no-undef */
'use strict';
let arrayOfNames = [];
let arrayOfObjects = [];
$.ajax('./data/page-1.json').then( (data) => {
  data.forEach(value =>{
    arrayOfObjects.push(value);
    let card = new Card(value);
    if(!arrayOfNames.includes(value.keyword)){
      arrayOfNames.push(value.keyword);
    }
    card.render();

  });
  $('#photo-template').first().remove();
  arrayOfNames.forEach(value =>{
    let dropdownListOption = $('.option').first().clone();
    dropdownListOption.text(value);
    dropdownListOption.val(value);
    $('select').append(dropdownListOption);
  });
});//end of ajax function



$('select').on('change', function(){
  $('.container').html('<div id="photo-template"><h2></h2><img src="" alt=""><p></p></div>');
  arrayOfObjects.forEach(value =>{
    if(value.keyword === $('select').val()){
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
  let cardCopy = $('#photo-template').first().clone();
  cardCopy.find('h2').text(this.title);
  cardCopy.find('img').attr('src', this.imgUrl);
  cardCopy.find('p').text(this.description);
  $('.container').append(cardCopy);
};

