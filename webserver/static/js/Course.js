$(document).ready(function(){
	$("#ask_btn").click(function() {
		var url = "/ask/" + $("#ask_btn").attr("uid") + "/" + $("#ask_btn").attr("oid");
	    $.post(url,
		{
		    title:$("#title").val(),
		    des:$("#des").val()
		},
		function(data){
		    $("#showText").text(data);
			$("#modalShow").modal();
		});
	});

	$("#modalShow").on('hide.bs.modal', function () {
		var current_index = $("#tabs").tabs("option","active");
		$("#tabs").tabs('load',current_index);
	});
});