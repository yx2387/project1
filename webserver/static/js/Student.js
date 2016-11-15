$(document).ready(function(){
	$("#logout").click(function(){
		window.location.href = "/logout_s";
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
