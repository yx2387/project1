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

	$("#file_upload_btn").click(function() {
		alert("2345");

	    var data = new FormData($("#file_form")[0]);

	    $.ajax({
	        url: '/upload',
	        data: data,
	        processData: false,
	        type: 'POST',
	        success: function ( data ) {
	            alert( data );
	        }
	    });
	});

	$("#assfile_form").submit(function(event) {
		alert("222");
		event.preventDefault();
		var formData = new FormData($(this)[0]);

	    $.post($("#assfile_form").attr("action"), formData, function(data) {
	    	alert("enter");
		    $("#showText").text(data);
			$("#modalShow").modal();
	    });
	    alert("end");
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


	$("#modalShow").on('hide.bs.modal', function () {
		location.reload();
	});
});
