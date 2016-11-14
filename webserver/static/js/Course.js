$(document).ready(function(){
	$("#ask_btn").click(function() {
	    $.post("/ask",
		{
		    uid:$("#ask_btn").attr("uid"),
		    oid:$("#ask_btn").attr("oid"),
		    title:$("#title").val(),
		    des:$("#des").val()
		},
		function(data){
		    $("#showText").text(data);
			$("#modalShow").modal();
		});
	});

	// $("#modalShow").on('hide.bs.modal', function () {
	// 	var current_index = $("#tabs").tabs("option","active");
	// 	$("#tabs").tabs('load',current_index);
	// });
});