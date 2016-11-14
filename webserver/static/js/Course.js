$(document).ready(function(){
	$("form#ask_form").submit(function() {
		var formData = new FormData($(this)[0]);

	    $.post("/upload", formData, function(data) {
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	});

	// $("#modalShow").on('hide.bs.modal', function () {
	// 	var current_index = $("#tabs").tabs("option","active");
	// 	$("#tabs").tabs('load',current_index);
	// });
});