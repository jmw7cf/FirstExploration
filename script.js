$(document).ready(function () {
   
    checkURL(); //this will check if the URL has a reference to a page. It will load it.
    
    $('ul li a').click(function(e){ //go through all of our navigation links
        checkURL(this.hash); // assigns them to an onclick even usinr their own hash
    });
    
    setInterval("checkUrl()", 250); //checks for a change in the URL every ms. This is to see if history buttons (back) have been used.
});

var lasturl=""; //stores the current URL hash

function checkURL(hash){
    if(!hash) hash = window.location.hash;  //if there is no paramenter you'll use the hash value from the current address.
    
    if(hash != lasturl) {
        lasturl = hash; //update the hash
        loadPage(hash); //load the new page
    }
}

function loadPage(url) { //loads the page via AJAx
   url=url.replace('#page', '');
    
    $('#loading').css('visibility', 'visible');
    
    $.ajax({
        type: "POST",
        url: "load_page.php",
        data: 'page='+url,
        dataType: "html",
        success: function(msg){
            if(parseInt(msg)!=0){
                $('#pageContent').html(msg);
                $('#loading').css('visibility', 'hidden');
            }
        }
    });
}