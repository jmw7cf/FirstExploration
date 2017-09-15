var default_content="";

$(document).ready(function () {
   
    checkURL(); //this will check if the URL has a reference to a page. It will load it.
    
    $('ul li a').click(function(e){ //go through all of our navigation links
        checkURL(this.hash); // assigns them to an onclick event using their own hash
    });
    
    //filling in the default content
	default_content = $('#pageContent').html();
    
    setInterval("checkUrl()", 250); //checks for a change in the URL every ms. This is to see if history buttons (back) have been used.
});

var lasturl=""; //stores the current URL hash

function checkURL(hash){
    if(!hash) hash=window.location.hash;  //if there is no paramenter you'll use the hash value from the current address.
    
    if(hash != lasturl) {
        
        lasturl=hash;
        
        if(hash=="")
		$('#pageContent').html(default_content);
		
		else
		loadPage(hash);
    }
}

function loadPage(url) { //loads the page via AJAx
    
       url=url.replace('#', '');
//    function stageContent(content){
//                $("#pageContent").html(content);
//            }
//            
//            function evaluateHash() {
//                if(location.hash == "#JohnMayer") {
//                    $.get("about.html", stageContent);
//                }
//                else if(location.hash == "#TaylorSwift") {
//                    $.get("TaylorSwift.html", pageContent);
//                }
//                else if(location.hash == "#RyanReynolds") {
//                    $.get("RyanReynolds.html", pageContent);
//                }
//                else if(location.hash == "#JimmyFallon") {
//                    $.get("JimmyFallon.html", pageContent);
//                }
//                else if(location.hash == "#NationalParkService") {
//                    $.get("NationalParkService.html", pageContent);
//                }
//                else {
//                    $.get("index.html", pageContent);
//                }
//            }
//            
//            $(function(){
//                evaluateHash();
//                window.onhashchange = evaluateHash;
//            });
//    

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