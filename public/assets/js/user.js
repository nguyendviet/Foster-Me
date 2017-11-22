$(()=>{

    $('.btn-signup').on('click', (e)=>{
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
            .done((signupData)=>{
                // when successfully signed up, sign in automatically
                console.log(signupData);
                
                // send login request with new user's email and password
                $.ajax({
                    url: '/login',
                    method: 'POST',
                    data: signupData,
                    headers: {
                        "Authorization": "Basic " + btoa(signupData.email + ':' + signupData.password)
                    }
                }).done((result)=>{
                    console.log(result);
                    console.log('\nafter login request');
                    // send redirect request to right user's page with login token received
                    $.ajax({
                        url: '/user/' + result.id,
                        headers: {token: result.token}
                    })
                    .done((content)=>{
                        // replace content with page rendered from server
                        $('body').html(content);
                    });
                });
            });
        }
    });

    $('.btn-login').on('click', (e)=>{
        e.preventDefault();
        console.log('clicked');

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
            console.log('done');
            console.log(result);

            // send redirect request to right user with login token received
            $.ajax({
                url: '/user/' + result.id,
                headers: {token: result.token}
            })
            .done((content)=>{
                // replace content with page rendered from server
                $('body').html(content);
            });
        });
    });
});