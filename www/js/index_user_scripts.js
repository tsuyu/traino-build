/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     
    //Start register to joomla
     $( "#register_button" ).click(function() {
  submit_check_first();
});

function submit_check_first(){
		var jform_name = document.getElementById("name").value;
		var jform_username = document.getElementById("username2").value;
		var jform_password1 = document.getElementById("password1").value;
		var jform_password2 = document.getElementById("password2").value;
		var jform_email1 = document.getElementById("email1").value;
		var jform_email2 = document.getElementById("email2").value;
		var option = "com_mobile_extension";
		var task = "registration.register";
		
		var atpos = jform_email1.indexOf("@");
   		var dotpos = jform_email1.lastIndexOf(".");
		if (jform_username == '') {
			alert('Username cannot be leave blank.');
			return false;
		}
		else if (jform_username == '') {
			alert('Username cannot be leave blank.');
			return false;
		}
		else if (jform_password1.length < 4) {
			alert('Password must more than 4 characters.');
			return false;
		}
		else if (jform_password1 !== jform_password2) {
			alert('Password1 and Password2 not same.');
			return false;
		}
   		else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=jform_email1.length) {
   			alert('Please check your email format.');
        	return false;
   		}
		else if (jform_email1 !== jform_email2) {
			alert('Email1 and Email2 not same.');
			return false;
		}

		$.ajax({
			    type: 'POST',
			    url: 'http://user.mydroid.io/yusuf/yusuffrontend/api_registration.php',
			    data: {
			    	'username':jform_username,
			    	'email':jform_email1
			    	// 'cce1a30941d052957da36ac58a754179':1
			    },
			    success: function(response) {
			    	if (response == 'duplicate_email') {
			    		alert('Email already exists in database.');
			    		return false;
			    	}
			    	else if(response == 'username_exists'){
			    		alert('Username already exists in database.');
			    		return false;
			    	}
			    	else if (response == 'everything_ok'){
			    		alert('Form will be submit to database.');
			   	  		submit_to_joomla(jform_name,jform_username,jform_password1,jform_password2,jform_email1,jform_email2,option,task);
			    	}
			    },
			    error: function(response){
		          alert("Connection error!");
		        }
			});
	}

function submit_to_joomla2(name,username,password1,password2,email1,email2,option,task){
		$.ajax({
			    type: 'POST',
			    url: 'http://user.mydroid.io/yusuf/index.php', //url of joomla website
			    data: {
			    	'option': option,
			    	'task': task,
			    	'jform[name]':name,
			    	'jform[username]':username,
			    	'jform[password1]':password1,
			    	'jform[password2]':password2,
			    	'jform[email1]':email1,
			    	'jform[email2]':email2,
			    },
			    success: function(response) {
			   	  alert("Registered successfully! Activate your account before login from the login screen.");
			    },
			    error: function(response){
		          alert("Conection error!");
		        }
			});
	}
    //End register to jommla
     
    //connect to joomla backend
     $( "#submit_form_button" ).click(function() {
	  submit_to_joomla();
	});

	function submit_to_joomla(){ 
		var jform_username = document.getElementById("username").value;
		var jform_password = document.getElementById("password").value;

		var option = "com_mobile_extension";
		var task = "user.login";
		$.ajax({
                type: "POST",
                url: "http://user.mydroid.io/yusuf/yusuffrontend/api_login.php",
                data: {
                    username: jform_username,
                    password: jform_password
                },
                success: function (ret) {
                    var loginDetails = {};
                    console.log(ret);
                    if (ret.indexOf("success") > -1) {
                        alert("Logged in successfully!");
                        loginDetails.email = jform_username;
                        loginDetails.password = "NaN";
                        localStorage.setItem("login", btoa(JSON.stringify(loginDetails)));
                       // SET LANDING PAGE AFTER LOGIN
                         activate_page("#dashboard");
                    } else {
                        alert("Error in details or you have not activated your account. Check spam box too for activation mail!");
                    }
                },
                error: function(err) {
                    console.log(err);
                    alert("Conection error!");
                }
            });
	}
    //end
     
    //pull data from MySQL for feedback
    $( document ).ready(function() {
			    $.ajax({
				    url: 'http://user.mydroid.io/yusuf/api.php?private_key=e4ed5acb3a53e3935a1a8f1676fb111de2a4842a',
				    type: "get",
				    dataType: "json",
				    success: function(response) {
				    	var data = response['data'];
				    	console.log(data);
				    	$('#listdata').html('<div class="list-group"></div>');
				        for (var i = 0; i < data.length; i++) {
					        $('.list-group').append(
					        	'<a href="#" class="list-group-item allow-badge widget">'
					        	+ '<h4 class="list-group-item-heading">' 
					        	+ data[i]['fullname'] 
					        	+ "</h4>"
					        	+ '<p class="list-group-item-text">'
					        	+ data[i]['email']
					        	+ '</p>'
					        	+ '<p class="list-group-item-text">'
					        	+ data[i]['telephone']
					        	+ '</p>'
					        	+ '<p class="list-group-item-text">'
					        	+ data[i]['message']
					        	+ '</p>'
					        	+ '</a>'
					        );
					    }
				    }
				});
			}); 
     
    //end
     /* button  Back */
    $(document).on("click", ".uib_w_9", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
         return false;
    });
    
        /* button  .uib_w_1 */
    $(document).on("click", ".uib_w_1", function(evt)
    {
         /*global activate_page */
         activate_page("#info"); 
         return false;
    });
    
        /* button  Create Account */
    $(document).on("click", ".uib_w_5", function(evt)
    {
         /*global activate_page */
         activate_page("#CreateAccount"); 
         return false;
    });
    
        /* button  .uib_w_17 */
    $(document).on("click", ".uib_w_17", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($(".uib_w_26"));  
         return false;
    });
    
        /* button  Info */
    $(document).on("click", ".uib_w_19", function(evt)
    {
         /*global activate_page */
         activate_page("#info"); 
         return false;
    });
    
        /* button  Feedback Form */
    $(document).on("click", ".uib_w_20", function(evt)
    {
         /*global activate_page */
         activate_page("#feedback"); 
         return false;
    });
    
        /* button  Location Map */
    $(document).on("click", ".uib_w_22", function(evt)
    {
         /*global activate_page */
         activate_page("#location"); 
         return false;
    });
    
        /* button  Tutorial Videos */
    $(document).on("click", ".uib_w_23", function(evt)
    {
         /*global activate_page */
         activate_page("#videos"); 
         return false;
    });
    
        /* button  Charts */
    $(document).on("click", ".uib_w_24", function(evt)
    {
         /*global activate_page */
         activate_page("#charts"); 
         return false;
    });
    
        /* button  Others */
    $(document).on("click", ".uib_w_25", function(evt)
    {
         /*global activate_page */
         activate_page("#others"); 
         return false;
    });
    
        /* button  .uib_w_8 */
    $(document).on("click", ".uib_w_8", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
         return false;
    });
    
        /* button  .uib_w_31 */
    $(document).on("click", ".uib_w_31", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_33 */
    $(document).on("click", ".uib_w_33", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_35 */
    $(document).on("click", ".uib_w_35", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_37 */
    $(document).on("click", ".uib_w_37", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_39 */
    $(document).on("click", ".uib_w_39", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_41 */
    $(document).on("click", ".uib_w_41", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  .uib_w_43 */
    $(document).on("click", ".uib_w_43", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
        /* button  #sendfeedback */
    $(document).on("click", "#sendfeedback", function(evt)
    {
        /* your code goes here */ 
          evt.preventDefault();
          var $form = $( this ),
          url = "http://user.mydroid.io/yusuf/yusuf.php";
          var posting = $.post( url, { fullname: $('#fullname').val(), email: $('#email').val(), telephone: $('#telephone').val(), message: $('#message').val() } );
          posting.done(function( data ) {
            alert('success');
          });

         activate_page("#dashboard");
         return false;
    });
    
        /* button  #logout */
    $(document).on("click", "#logout", function(evt)
    {
        localStorage.removeItem("login");
        activate_page("#mainpage");
        /* your code goes here */ 
         return false;
    });
    
        /* button  .uib_w_56 */
    $(document).on("click", ".uib_w_56", function(evt)
    {
         /*global activate_page */
         activate_page("#dashboard"); 
         return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
