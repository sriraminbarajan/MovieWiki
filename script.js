var SearchCount = 4; 
var request='',data;
function show(){
	var output='';
	if(request.readyState === 4) {
                    data = JSON.parse(request.responseText);
                    if(data.Response == "True") {
                    //Load Data To The Container div
	if(SearchCount < data.Search.length){
		document.querySelector('#show').style.display='block';
	}    
	else{
		document.querySelector('#show').style.display='none';
	}
                    for(var i = 0; i<SearchCount;i++) { 
                        output += `
                        <div class="packet">
                                <img src="${data.Search[i].Poster}" class="created_poster">
                                <a href="Information.html" class="details" data-tag=${data.Search[i].imdbID}>More Details</a>
                                <h5 class="created_title">Title : ${data.Search[i].Title}</h5>
                                
                        </div>
                    `; 
                }
                    document.querySelector('#output').style.display = "visible";
                    document.querySelector('#response').innerHTML = "Here Are The Movies That We Found";
                    document.querySelector('#output').innerHTML = output;
                    document.querySelectorAll('.details').forEach(function(a) {
                        a.onclick = function() {
                            localStorage.setItem("tag3", a.dataset.tag);
                        }
                    });
                } 
                else if(data.Error === "Too many results.") {
                    document.querySelector('#response').innerHTML = "Sorry We Have To Many Things To Show You Can You Be More Specific";
                    document.querySelector('#output').style.display = "none";
                }   
                    
                else if(data.Error === "Movie not found!") {
                    document.querySelector('#response').innerHTML = "Sorry We Have Not Found Your Movie";
                    document.querySelector('#output').style.display = "none";
                }	
            }
            else {
                document.querySelector('#response').innerHTML = "Loading...";
            }	
}

function index() {
    var search = document.querySelector('#search').value;
    // Check the input value 
   
if(search === '') {
        alert("Please Enter A Movie Name");
    }
    else
        {
            // Link To omdbapi : http://www.omdbapi.com/?s=''&apikey=70cc2544
            
            // Sending Ajax Request
            request = new XMLHttpRequest();
            var output = "";
            request.open('GET', 'http://www.omdbapi.com/?s='+search+'&apikey=70cc2544');
            
            //Loding The Ajax Response
            request.onreadystatechange = function() {
	show();                
        } 
        request.send();
  }
  return false;
}

//Function for event listener to show more results
function showMore(){
		
	SearchCount+=4;
	if(data.Search.length < SearchCount)
		SearchCount = data.Search.length;
	show();
}

function information() {
    if((localStorage.getItem("tag3") === null) || (localStorage.getItem("tag3") === undefined)) {
        alert("You Have Been Redirected To index.html. As We have No Movie To Give You Details About");
        window.open("index.html", "_self");
    }
    else {
        var image = document.querySelector('#movie_poster');
        var title = document.querySelector('#title');
        var imdbrating = document.querySelector('#imdbrating');
        var year = document.querySelector('#year');
        var genre = document.querySelector('#genre');
        var plot = document.querySelector('#plot');
        var link = document.querySelector('#to_imdb');
        var link_to = document.querySelector('#link_to');
        var imdbtag = localStorage.getItem("tag3");

            //Link to Imdb : https://www.imdb.com/title/

            var request = new XMLHttpRequest();
            request.open('GET', 'http://www.omdbapi.com/?i='+imdbtag+'&apikey=70cc2544');

            request.onload = function() {

                var data = JSON.parse(request.responseText);   
                image.src =  data.Poster;
                title.innerHTML = "Title : "+data.Title;
                year.innerHTML = "Year : "+data.Year;
                imdbrating.innerHTML = "Imdb Ratings : "+data.imdbRating;
                genre.innerHTML = "Genre : "+data.Genre;
                plot.innerHTML = "Plot : "+data.Plot;
                link.href = "https://m.imdb.com/title/"+imdbtag+"/";
                link.innerHTML = "View More";
                link_to.innerHTML = "Link To Imdb : ";


            }
        request.send();  
            document.querySelector('#display').style.display = "block";
    }	
}

function goback() {
    window.history.back();
}