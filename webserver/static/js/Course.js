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
		location.reload();
	});

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
});