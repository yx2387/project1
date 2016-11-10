$(document).ready(function(){
	$("#assignment_panel").hide();
	$("#announcement_panel").hide();
	$("#qa_panel").hide();

	$("#file_nav").click(function(){
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#file_nav").addClass("active");

		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#assignment_panel").hide();
		$("#file_panel").show();
	});

	$("#assignment_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#assignment_nav").addClass("active");

		$("#file_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").hide();
		$("#assignment_panel").show();
	});
	$("#announcement_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#qa_nav").removeClass("active");
		$("#announcement_nav").addClass("active");

		$("#file_panel").hide();
		$("#assignment_panel").hide();
		$("#qa_panel").hide();
		$("#announcement_panel").show();
	});
	$("#qa_nav").click(function(){
		$("#file_nav").removeClass("active");
		$("#assignment_nav").removeClass("active");
		$("#announcement_nav").removeClass("active");
		$("#qa_nav").addClass("active");

		$("#file_panel").hide();
		$("#assignment_panel").hide();
		$("#announcement_panel").hide();
		$("#qa_panel").show();
	});


});