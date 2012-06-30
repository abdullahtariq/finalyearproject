	$(document).ready(function()
	{
		$("#registerHere input").hover(function(){
			$(this).popover('show');
		});
	$('#registerHere').validate({
		rules:{
			name:"required",
			txtUser:"required",
			txtPassword:{
						required:true,
						minlength:6
						}
		},
		messages:{
			name:"Enter your first & last name",
			txtUser:"Enter Valid User as mentioned",
			txtPassword:{
					required:"Enter your password",
					minlength:"Password must be minimum 6 characters"
			}
		},
		errorClass: "help-inline",
		errorElement: "span",
		highlight:function(element, errorClass, ValidClass)
		{
			$(element).parents('.control-group').addClass('error');
		},
		unhighlight: function(element, errorClass, ValidClass)
		{
			$(element).parents('.control-group').removeClass('error');
			$(element).parents('.control-group').addClass('success');
		}

	});
	});
	 