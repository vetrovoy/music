document.addEventListener("DOMContentLoaded", function () {
    $('body').on('submit', '#add_review', function (event) {
        event.preventDefault();

        var data = {};
        $.each($(this).serializeArray(), function() {
            data[this.name] = this.value;
        });

        $.ajax({
            type:"POST",
            url: BaseURL+LngAbr+"/reviews/add_review",
            data:data,
            dataType: 'json',
            success:function(data){
                if(data.error == false) {
                    $.fancybox.close();
                    Swal.fire({
                        icon: 'success',
                        title: data.msg
                    })
                        .then(function () {
                        })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: data.error
                    });
                }

            }
        });
    });
});