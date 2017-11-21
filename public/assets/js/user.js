$(()=>{
    $('.btn-signup').on('click', (e)=>{
        e.preventDefault();

        console.log('clicked');
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

        console.log(newUser);

        $.ajax({
            url: '/signup',
            method: 'POST',
            data: newUser
        })
        .done((data)=>{
            console.log('got data');
            console.log(data);
        });
    });
});