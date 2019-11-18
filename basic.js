//didnt know if jquery was ok, can remove if not.
let data = {
  pg: 0,
  paginationAmount: 10,
  jokes: null,
  filteredJokes: null,
  shownJokes: []
};
$(document).ready(function(){
  bindFilter();
});
const bindFilter = function(){
  $('#filter_by').keyup(function(){
    const filterValue = document.getElementById('filter_by').value;
    let filteredJokes = Array.from(data.jokes).filter(function(joke){
      return joke.indexOf(filterValue) != -1;
    });
    data.filteredJokes = new Set(filteredJokes);
    populateJokeTable(data.filteredJokes, 0);
  });
}

const populateJokeTable = function(jokes, pg){
  let start = pg * data.paginationAmount;
  data.filteredJokes = jokes;
  jokes = Array.from(jokes);
  if(!jokes[start]){
    return false;
  }
  data.pg = pg;
  data.shownJokes = [];
  for(var i = 0; i < data.paginationAmount; i++){
    if(!jokes[start+i]){
      break;
    }
    data.shownJokes.push(jokes[start+i]);
  }
  const jokeElements = data.shownJokes.map(function(joke){
    return '<tr title="click to remove" onclick="removeJoke(this)"><td>' + joke + '</td></tr>';
  }).join('');
  $('#results').html(jokes.length);
  $('#joke_table').html(jokeElements);
  $('#page_number').html(pg + 1);
};

const removeJoke = function(e){
  $(e).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    data.jokes.delete(e.textContent);
    data.filteredJokes.delete(e.textContent);
    $('#results').html(data.filteredJokes.size);
    e.remove();
  });
  $(e).addClass('hiding');
};

const pageUp = function(e){
  populateJokeTable(data.filteredJokes, data.pg + 1);
};

const pageDown = function(e){
  populateJokeTable(data.filteredJokes, data.pg - 1);
};

const getJokes = function(){
  const numberOfJokes = document.getElementById('jokes_value').value,
    jokeApi = "http://api.icndb.com/jokes/random/";
  $('#filter_by').val('');
  $.ajax({
    url: jokeApi + numberOfJokes
  }).done(function(response) {
    data.jokes = new Set(response.value.map(function(joke){return joke.joke;}));
    populateJokeTable(data.jokes, 0);
  });
};