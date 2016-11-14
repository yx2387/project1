$(document).ready(function(){
	$("#file_panel").hide();
	$("#announcement_panel").hide();
	$("#qa_panel").hide();
	$("#assignment_panel").hide();
	$("#account_panel").hide();

	$("#course_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#account_nav").removeClass("active");
		$("#course_nav").addClass("active");

		$("#file_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#assignment_panel").hide();
		$("#account_panel").hide();
		$("#course_panel").show();
	});

	$("#file_nav").click(function(){
		$("#course_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#account_nav").removeClass("active");
		$("#file_nav").addClass("active");

		$("#course_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#assignment_panel").hide();
		$("#account_panel").hide();
		$("#file_panel").show();
	});

	$("#assignment_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#course_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#account_nav").removeClass("active");
		$("#assignment_nav").addClass("active");

		$("#course_panel").hide();
		$("#file_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#account_panel").hide();
		$("#assignment_panel").show();
	});
	$("#announcement_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#course_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#account_nav").removeClass("active");
		$("#announcement_nav").addClass("active");

		$("#course_panel").hide();
		$("#file_panel").hide();
		$("#assignment_panel").hide();
		$("#qa_panel").hide();
		$("#account_panel").hide();
		$("#announcement_panel").show();
	});
	$("#qa_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#course_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#account_nav").removeClass("active");
		$("#qa_nav").addClass("active");

		$("#course_panel").hide();
		$("#file_panel").hide();
		$("#assignment_panel").hide();
		$("#announcement_panel").hide();
		$("#account_panel").hide();
		$("#qa_panel").show();
	});

	$("#account_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#course_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#account_nav").addClass("active");

		$("#course_panel").hide();
		$("#file_panel").hide();
		$("#assignment_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#account_panel").show();
	});
	
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
			location.reload();
		    $("#showText").text("Answer Successfully!");
			$("#modalShow").modal();
		});
	});

	$("form#file_form").submit(function() {
		var formData = new FormData($(this)[0]);

	    $.post("/upload", formData, function(data) {
	        location.reload();
		    $("#showText").text("Answer Successfully!");
			$("#modalShow").modal();
	    });
	});
});
