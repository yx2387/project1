$(document).ready(function(){
	$('#datetimepicker').datetimepicker();

	$("#logout").click(function(){
		window.location.href = "/logout_i";
	});

	$("#qa_answer").click(function(){
		$.post("/ans",
		{
		    uid:$("#qa_answer").attr("uid"),
		    qid:$("#qa_answer").attr("qid")
		},
		function(data,status){
		    $("#showText").text("Answer Successfully!");
			$("#modalShow").modal();
		});
	});

	$("form#file_form").submit(function() {
		// var formData = new FormData($(this)[0]);

	 //    $.post("/upload", formData, function(data) {
		//     $("#showText").text("Answer Successfully!");
		// 	$("#modalShow").modal();
	 //    });
	 $("#showText").text("Answer Successfully!");
	$("#modalShow").modal();
	});


	// $("#modalShow").on('hide.bs.modal', function () {
	// 	location.reload();
	// });
});
