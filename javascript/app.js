var flow_document;

Zepto(function($){
  
  var hash = window.location.hash
  var id = hash.substr(1, hash.length);

  $.ajax({
    type: 'GET',
    url: '/flows/' + id + '.json' ,
    // type of data we are expecting in return:
    dataType: 'json',
    success: function(data){
      console.log(data);
      flow_document = data;
      init();
    },
    error: function(xhr, errorType, error){
      alert("All fields are required")
    }
  });
    
    
})

function init() {
  
  initial_step = flow_document.initial_step;
  header_link = $("a#flow_header_link");
  header_link.html(flow_document.title);
  $("#flow_header_description").html(flow_document.description);
  header_link.attr("href", window.location);
  start_flow();
}

function render_step(step) {
  step = flow_document[step]
  $('h1#step_title').html(step.title);
  links = step.link_to;
  $('#step_links').html('');
  if (links == undefined) {
    $('#step_links').append('<a class="connector_link restart_link" onclick="start_flow()">Restart</a>')
  } else {
    for(var key in links){      
      $('#step_links').append('<a class="connector_link" onclick="render_step(\''+key+'\')">'+links[key]+'</a>')
    };
  }
};

function start_flow() {
  initial_step = flow_document.initial_step;
  render_step(initial_step);
};


