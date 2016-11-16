$(document).ready(function(){
	$('ul.navbar-nav li a').click(function(){
        var a_anchor = $(this).attr('href');
        var ul_id = $(this).parent().parent().attr('id');
        //该nav tabs下的current设置
        localStorage.setItem(ul_id, a_anchor);
    });

    $('ul.navbar-nav').each(function(){
        var tab_list = $(this);
        var current = localStorage.getItem(tab_list.attr('id'));
        if (current) {
            var link = tab_list.find('a[href="'+current+'"]');
            link.tab('show');
        }
    });

	$('#datetimepicker').datetimepicker();

	$("#logout").click(function(){
		window.location.href = "/logout_i";
	});

	$("#ann_btn").click(function() {
	    $.post($(this).attr("url"),
		{
			course:$("#ann_course").val(),
			title:$("#ann_title").val(),
			des:$("#ann_des").val()
		},
		function(data){
		    $("#showText").text(data);
			$("#modalShow").modal();
		});

	});

	$(".answer_btn").click(function() {
		alert($(this).siblings("textarea").val());
	    $.post($(this).attr("url"),
		{
			content:$(this).siblings("textarea").val()
		},
		function(data){
		    $("#showText").text(data);
			$("#modalShow").modal();
		});
	});


	$("#modalShow").on('hide.bs.modal', function () {
		location.reload();
	});
});
