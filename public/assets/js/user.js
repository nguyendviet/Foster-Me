$(()=>{

    $('.btn-parent').on('click', ()=>{
        // show signup form to parent
        $('.signUp').show();
        $('.animal').show();
        $('.btn-signup-parent').show();
        $('.btn-signup-shelter').hide();

        // show login form to parent
        // $('.logIn').show();
        // $('.btn-login-parent').show();
        // $('.btn-login-shelter').hide();
    });

    $('.btn-shelter').on('click', ()=>{
        // show signup form for shelter
        $('.signUp').show();
        $('.animal').hide();
        $('.btn-signup-parent').hide();
        $('.btn-signup-shelter').show();

        // show login form to shelter
        // $('.logIn').show();
        // $('.btn-login-parent').hide();
        // $('.btn-login-shelter').show();
    });

    // when sign up as parent
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
            console.log('Fill the form!');
            return;
        }
        // if all fields are filled
        else {
            // create new user object with details
            var newUser = {
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
                data: newUser
            })
            .done((content)=>{
                // when successfully signed up, sign in automatically
                console.log(content);

                console.log('should be in user page now.');
                $('body').html(content);

                // send login request with new user's email and password
                // $.ajax({
                //     url: '/login',
                //     method: 'POST',
                //     data: signupData,
                //     headers: {
                //         "Authorization": "Basic " + btoa(signupData.email + ':' + signupData.password)
                //     }
                // }).done((result)=>{
                //     console.log(result);
                //     console.log('\nafter login request');
                //     // send redirect request to right user's page with login token received
                //     $.ajax({
                //         url: '/user/' + result.id,
                //         headers: {token: result.token}
                //     })
                //     .done((content)=>{
                //         // replace content with page rendered from server
                //         $('body').html(content);
                //     });
                // });
            });
        }
    });

    // when sign up as shelter
    $('.btn-signup-shelter').on('click', (e)=>{
        e.preventDefault();

        var name = $('.name-signup').val().trim();
        var email = $('.email-signup').val().trim();
        var password = $('.password-signup').val().trim();
        var address = $('.address-signup').val().trim();
        var phone = $('.phone-signup').val().trim();

        // check if any field is left empty
        if (!name || !email || !password || !address || !phone) {
            console.log('Fill the form!');
            return;
        }
        // if all fields are filled
        else {
            // create new user object with details
            var newUser = {
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone
            };

            // send signup request with new user's details
            $.ajax({
                url: '/signup/shelter',
                method: 'POST',
                data: newUser
            })
            .done((content)=>{
                // when successfully signed up, sign in automatically
                console.log(content);

                console.log('should be in user page now.');
                $('body').html(content);
            });
        }
    });

    // log in
    $('.btn-login').on('click', (e)=>{
        e.preventDefault();
        console.log('login clicked');

        var user = {
            email: $('.email-login').val().trim(),
            password: $('.password-login').val().trim()
        };

        console.log(user);

        $.ajax({
            url: '/login',
            method: 'POST',
            data: user,
            headers: {
                "Authorization": "Basic " + btoa(user.email + ':' + user.password)
            }
        })
        .done((result)=>{
            console.log('token from login request: ' + result.token);
            var token = result.token;
            userToken = token;

            // send redirect request to right user with login token received
            $.ajax({
                url: '/user/' + token
                // headers: {token: result.token}
            })
            .done((content)=>{
                // replace content with page rendered from server
                $('body').html(content);
                console.log('run map function here');
            });
        });
    });

    // logout
    $('.btn-logout').on('click', ()=>{
        console.log('logout clicked');

        $.ajax({
            url: '/logout',
            method: 'POST'
        })
        .done((content)=>{
            console.log('logged out');
            $('body').html(content);
        });
    });

    // delete account
    $('.btn-delete-account').on('click', ()=>{
        $('.btn-delete-account').hide();
        $('.confirm-delete').show();
    });

    // confirm delete account
    $('.btn-confirm-delete-account').on('click', ()=>{
        console.log('delete account clicked');
        var email = $('.thisEmail').data('email');
        var deleteObj = {
            email: email
        }

        console.log(email);

        $.ajax({
            url: '/delete',
            method: 'POST',
            data: deleteObj
        })
        .done((content)=>{
            console.log('account deleted');
            console.log(content);
            $('body').html(content);
        });
    });

    // cancel delete account
    $('.btn-cancel-delete-account').on('click', ()=>{
        $('.btn-delete-account').show();
        $('.confirm-delete').hide();
    });
});