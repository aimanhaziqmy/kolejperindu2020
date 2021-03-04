// When the user scrolls the page, execute myFunction
$(document).ready(function(){
    
    $(".stickymenu a, .stickymenu a[href='#topPage']").on('click',function(event){
        if(this.hash !==""){
            event.preventDefault();
            var hash= this.hash;
            $('html,body').animate({
                scrollTop:$(hash).offset().top - 100 }, 900, function(){   
                window.location.hash=hash - 100;
            });
        }
    });
})
            
$(window).scroll(function(){
    $(".slideanim").each(function(){
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if(pos < winTop + 600){
            $(this).addClass("slide");
        }
    });
});

$(document).ready(function(){
  
    
   
});