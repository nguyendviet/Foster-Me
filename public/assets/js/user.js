$(()=>{
    $('.btn-signup').on('click', (e)=>{
        e.preventDefault();

        var cat = false;
        var dog = false;

        if ($('.cat-signup').is(':checked')) {
            cat = true;
        }

        if ($('.dog-signup').is(':checked')) {
            dog = true;
        }

        var newUser = {
            name: $('.name-signup').val().trim(),
            email: $('.email-signup').val().trim(),
            password: $('.email-signup').val().trim(),
            address: $('.address-signup').val().trim(),
            phone: $('.phone-signup').val().trim(),
            cat: cat,
            dog: dog
        };

        // send signup request
        $.ajax({
            url: '/signup',
            method: 'POST',
            data: newUser
        })
        .done((signupData)=>{
            console.log(signupData);
            console.log(signupData.token);
            // when successfully signed up, get token from server
            var data = {
                token: signupData.token,
                email: newUser.email,
                password: newUser.password
            };

            // send login request with signup token received
            $.ajax({
                url: '/login',
                method: 'POST',
                data: data
            }).done((loginData)=>{
                console.log('done');
                console.log(loginData);
                // window.location.href = redirect.url;

                console.log('this is login data token: ' + loginData.token);
                // send redirect request to right user with login token received
                $.ajax({
                    url: '/user/' + loginData.id,
                    headers: {token: loginData.token}
                })
                .done((content)=>{
                    console.log('you can login now');
                    // replace content with page rendered from server
                    $('body').html(content);
                });
            });
        });
    });

    function login(token) {

    }
});