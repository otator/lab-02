/* eslint-disable no-undef */
'use strict';
let arrayOfKeywords = [];
let arrayOfObjects = [];

$.ajax('./data/page-1.json').then( (data) => {
  data.forEach(value =>{
    let card = new Card(value);
    if(!arrayOfKeywords.includes(value.keyword)){
      arrayOfKeywords.push(value.keyword);
    }
    if(!arrayOfObjects.includes(value)){
      arrayOfObjects.push(value);
    }
    card.render();

  });
  sortImages(data);
});//end of ajax for page-1



$('#selectByKeyword').on('change', function(){
  $('.container').html('<div id="photo-template"><h2></h2><img src="" alt=""><p></p></div>');
  arrayOfObjects.forEach(value =>{
    if(value.keyword === $('#selectByKeyword').val()){
      let card = new Card(value);
      card.render();
    }
  });
  $('#photo-template').first().remove();
});

$.ajax('./data/page-2.json').then( (data) => {
  data.forEach(value =>{
    if(!arrayOfKeywords.includes(value.keyword)){
      arrayOfKeywords.push(value.keyword);
    }
    if(!arrayOfObjects.includes(value)){
      arrayOfObjects.push(value);
    }
  });

  arrayOfKeywords.forEach(value =>{
    let dropdownListOption = $('.option').first().clone();
    dropdownListOption.text(value);
    dropdownListOption.val(value);
    $('#selectByKeyword').append(dropdownListOption);
  });
});//end of ajax for page-2


function Card(obj){
  this.imgUrl = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

Card.prototype.render = function(){
  let template = $('#script-container').html();
  let objOfMustache = Mustache.render(template, this);
  $('.container').append(objOfMustache);
};


$('#btn1').on('click', ()=>{
  ajaxData('./data/page-1.json');
});

$('#btn2').on('click', ()=>{
  ajaxData('./data/page-2.json');
});

function ajaxData(path){
  $('.container').html('');
  $.ajax(path).then((data) => {
    data.forEach(value =>{
      let card = new Card(value);
      if(!arrayOfKeywords.includes(value.keyword)){
        arrayOfKeywords.push(value.keyword);
      }
      if(!arrayOfObjects.includes(value)){
        arrayOfObjects.push(value);
      }
      card.render();

    });
    arrayOfKeywords.forEach(value =>{
      let dropdownListOption = $('.option').first().clone();
      dropdownListOption.text(value);
      dropdownListOption.val(value);
      $('#selectByKeyword').append(dropdownListOption);
    });
    $('#sortBy').val('default');
    $('#selectByKeyword').val('default');
    sortImages(data);
  });//end of ajax function

}
function sortImages(data){
  let arr = [...data];
  $('#sortBy').on('change', function(){
    if($('#sortBy').val() === 'horns'){
      arr.sort((a,b) => {
        if(a.horns < b.horns)
          return -1;
        else if(a.horns > b.horns)
          return 1;
        else
          return 0;
      });
    }
    else if(($('#sortBy').val() === 'title')){
      arr.sort((a,b) => {
        if(a.title < b.title)
          return -1;
        else if(a.title > b.title)
          return 1;
        else
          return 0;
      });
    }
    $('.container').html('');
    arr.forEach(value => {
      let newCard = new Card(value);
      newCard.render();
    });

  });
}
