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

        $.ajax({
            url: '/signup',
            method: 'POST',
            data: newUser
        })
        .done((data)=>{
            console.log(data);
            console.log(data.token);
            var data = {
                token: data.token
            };
            $.ajax({
                url: '/user',
                method: 'POST',
                data: data
            }).done((data)=>{
                console.log('done');
            });
        });
    });
});