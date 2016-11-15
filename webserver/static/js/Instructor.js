$(document).ready(function(){
	$('#datetimepicker').datetimepicker();

	$("#logout").click(function(){
		window.location.href = "/logout_i";
	});

	$("#file_form").submit(function(e) {
		e.preventDefault();
		var formData = new FormData($(this)[0]);    
		$.post("/upload", formData, function(data) {
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	});

	$("#assfile_form").submit(function(event) {
		// event.preventDefault();
		// var formData = new FormData($(this)[0]);

	    $.post($("#assfile_form").attr("action"), formData, function(data) {
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	});

	$("#ann_form").submit(function() {
		var formData = new FormData($(this)[0]);

	    $.post($("#ann_form").attr("action"), formData, function(data) {
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	});

	$("#qa_form").submit(function() {
		var formData = new FormData($(this)[0]);

	    $.post($("#qa_form").attr("action"), formData, function(data) {
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	});


	// $("#modalShow").on('hide.bs.modal', function () {
	// 	location.reload();
	// });
});
