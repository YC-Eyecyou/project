define(["common"],function(){
	$.ajax({
		url:"https://localhost:8000/test?1544530093758&position=1",
		success: function(data){
			console.log(data);
		}
	});
})
