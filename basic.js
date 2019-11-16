//didnt know if jquery was ok, can remove if not.
$(document).ready(function(){
  bindFilter();
});
const bindFilter = function(){
  $('#filter_by').keyup(function(){
    const filterValue = document.getElementById('filter_by').value;
    $('#joke_table tr').map(function(ind, e){
      $(e).show();
      if($(e).find(`td:contains(${filterValue})`).length === 0){
        return e;
      }
    }).hide();
  });
}

const populateJokeTable = function(jokes){
  const jokeElements = jokes.map(function(joke){
    return '<tr title="click to remove" onclick="removeJoke(this)"><td>' + joke.joke + '</td></tr>';
  }).join('');
  $('#joke_table').html(jokeElements);
};

const removeJoke = function(e){
  $(e).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    e.remove();
  });
  $(e).addClass('hiding');
};

const getJokes = function(){
  const numberOfJokes = document.getElementById('jokes_value').value,
    jokeApi = "http://api.icndb.com/jokes/random/";
  $('#filter_by').val('');
  $.ajax({
    url: jokeApi + numberOfJokes
  }).done(function(response) {
    populateJokeTable(response.value);
  });
};