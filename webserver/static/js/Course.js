$(document).ready(function(){
	$("#ask_btn").click(function() {
		// var url = "/ask/" + $("#ask_btn").attr("uid") + "/" + $("#ask_btn").attr("oid");
	 //    $.post(url,
		// {
		//     title:$("#title").val(),
		//     des:$("#des").val()
		// },
		// function(data){
		//     $("#showText").text(data);
		// 	$("#modalShow").modal();
		// });
		$("#showText").text("111");
			$("#modalShow").modal();
	});

	$("#modalShow").on('hide.bs.modal', function () {
		location.reload();
		$('.nav-tabs a[href="#' + "qa_panel" + '"]').tab('show');
	});
});