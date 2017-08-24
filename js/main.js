var span     = document.getElementById("secondes")
var secondes = 5
var timer    = function(){
	secondes       -= 1
	span.innerHTML  = secondes
	if(secondes === 0) return
	setTimeout( timer, 1000 )
}

timer()