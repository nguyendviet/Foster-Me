$(()=>{
    var message = '';

    $('.btn-parent').on('click', ()=>{
        // switch button colours
        $('.btn-parent').attr('class', 'btn btn-primary btn-parent');
        $('.btn-shelter').attr('class', 'btn btn-secondary btn-shelter');
        // show signup form to parent
        $('.signUp').show();
        // show animal options
        $('.animal').show();
        // show the right sign up button
        $('.btn-signup-parent').show();
        $('.btn-signup-shelter').hide();
        // switch form title
        $('.parent-title').show();
        $('.shelter-title').hide();
    });

    $('.btn-shelter').on('click', ()=>{
        // switch button colours
        $('.btn-parent').attr('class', 'btn btn-secondary btn-parent');
        $('.btn-shelter').attr('class', 'btn btn-primary btn-shelter');
        // show signup form for shelter
        $('.signUp').show();
        // hide animal options
        $('.animal').hide();
        // show the right sign up button
        $('.btn-signup-parent').hide();
        $('.btn-signup-shelter').show();
        // switch form title
        $('.parent-title').hide();
        $('.shelter-title').show();
    });

    // sign up as parent
    $('.btn-signup-parent').on('click', (e)=>{
        e.preventDefault();

        var name = $('.name-signup').val().trim();
        var email = $('.email-signup').val().trim();
        var password = $('.password-signup').val().trim();
        var address = $('.address-signup').val().trim();
        var phone = $('.phone-signup').val().trim();
        var cat = false;
        var dog = false;

        // if cat checkbox is checked
        if ($('.cat-signup').is(':checked')) {
            cat = true;
        }

        // if dog checkbox is checked
        if ($('.dog-signup').is(':checked')) {
            dog = true;
        }

        // check if any field is left empty
        if (!name || !email || !password || !address || !phone) {
            message = 'All fields are required.';
            $('.signup-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            return;
        }
        // if all fields are filled
        else {
            // create new user object with details
            var newUser = {
                usertype: 'parent',
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone,
                cat: cat,
                dog: dog
            };

            // send signup request with new user's details
            $.ajax({
                url: '/signup',
                method: 'POST',
                data: newUser,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.signup-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((auth)=>{
                // save token to localstorage
                localStorage.setItem('token', auth.token);

                var userName = newUser.name.replace(/\s/g,''); // remove spaces from user's name
                var token = localStorage.getItem('token'); // get token from localstorage
                var tokenObj = {
                    token: token
                }

                // send user's authentication request to server
                $.ajax({
                    url: '/auth/' + userName,
                    method: 'POST',
                    headers: tokenObj
                })
                .done((content)=>{
                    $('body').html(content);
                });
            });
        }
    });

    // sign up as shelter
    $('.btn-signup-shelter').on('click', (e)=>{
        e.preventDefault();

        var name = $('.name-signup').val().trim();
        var email = $('.email-signup').val().trim();
        var password = $('.password-signup').val().trim();
        var address = $('.address-signup').val().trim();
        var phone = $('.phone-signup').val().trim();

        // check if any field is left empty
        if (!name || !email || !password || !address || !phone) {
            message = 'All fields are required.';
            $('.signup-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            return;
        }
        // if all fields are filled
        else {
            // create new user object with details
            var newUser = {
                usertype: 'shelter',
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone
            };

            // send signup request with new user's details
            $.ajax({
                url: '/signup',
                method: 'POST',
                data: newUser,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.signup-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((auth)=>{
                // save token to localstorage
                localStorage.setItem('token', auth.token);
                
                var userName = newUser.name.replace(/\s/g,''); // remove spaces from user's name
                var token = localStorage.getItem('token'); // get token from localstorage
                var tokenObj = {
                    token: token
                }

                // send user's authentication request to server
                $.ajax({
                    url: '/auth/' + userName,
                    method: 'POST',
                    headers: tokenObj
                })
                .done((content)=>{
                    $('body').html(content);
                });
            });
        }
    });

    // log in
    $('.btn-login').on('click', (e)=>{
        e.preventDefault();

        var user = {
            email: $('.email-login').val().trim(),
            password: $('.password-login').val().trim()
        };

        $.ajax({
            url: '/login',
            method: 'POST',
            data: user,
            headers: {
                'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
            },
            error: (err)=>{
                message = err.responseJSON.message;
                $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            }
        })
        .done((auth)=>{
            // save token to localstorage
            localStorage.setItem('token', auth.token);
            
            var userName = auth.name.replace(/\s/g,''); // remove spaces from user's name
            var token = localStorage.getItem('token'); // get token from localstorage
            var tokenObj = {
                token: token
            }

            // send user's authentication request to server
            $.ajax({
                url: '/auth/' + userName,
                method: 'POST',
                headers: tokenObj
            })
            .done((content)=>{
                $('body').html(content);
                console.log('run map function here'); // TO DO <===================================================
            });
        });
    });

    // logout
    $('.btn-logout').on('click', ()=>{

        // send request to logout
        $.ajax({
            url: '/logout',
            method: 'POST'
        })
        .done((content)=>{
            $('body').html(content);
        });
    });

    // save new password
    $('.btn-save-password').on('click', (e)=>{
        e.preventDefault();

        var newPassword = $('.password-new1').val().trim();
        var confirmPassword = $('.password-new2').val().trim();

        // if entered passwords don't match
        if (newPassword !== confirmPassword) {
            $('.change-password-notice').html('<div class="alert alert-danger" role="alert">The passwords you entered don\'t match.</div>');
        }
        // if entered passwords match
        else {
            var token = localStorage.getItem('token'); // get token from localstorage
            var tokenObj = {
                token: token
            };
            var newPassObj = {
                password: newPassword
            };
            
            // send request to update password
            $.ajax({
                url: '/user',
                method: 'PUT',
                data: newPassObj,
                headers: tokenObj,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((newpass)=>{
                $('.change-password-notice').html('<div class="alert alert-success" role="alert">Your new password has been successfully saved.</div>');
            })
        }
    });

    // delete account
    $('.btn-delete-account').on('click', ()=>{
        $('.btn-delete-account').hide();
        $('.confirm-delete').show();
    });

    // confirm delete account
    $('.btn-confirm-delete-account').on('click', ()=>{
        var token = localStorage.getItem('token'); // get token from localstorage
        var tokenObj = {
            token: token
        };
        var deleteObj = {
            token: token
        };

        // send delete request
        $.ajax({
            url: '/user',
            method: 'DELETE',
            data: deleteObj,
            headers: tokenObj,
            error: (err)=>{
                message = err.responseJSON.message;
                $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            }
        })
        .done((confirm)=>{
            // if get confirm == 1
            if(confirm) {
                // send request to render deleted page
                $.ajax({
                    url: '/deleted',
                    method: 'GET'
                })
                .done((content)=>{
                    $('body').html(content);
                });
            }
            else {
                $('.notice').html('<div class="alert alert-danger" role="alert">There\'s an error. Please try again.</div>');
            }
        });
    });

    // cancel delete account
    $('.btn-cancel-delete-account').on('click', ()=>{
        $('.btn-delete-account').show();
        $('.confirm-delete').hide();
    });
});