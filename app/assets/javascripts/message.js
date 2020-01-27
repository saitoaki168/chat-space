$(function(){ 
    function buildHTML(message){
        if ( message.image ) {
          var html = `<div class="message__date">
                <div class="message__date__user">
                  ${message.user_name}
                </div>
                <div class="message__date__daytime">
                  ${message.created_at}
                </div>
              </div>
              <div class="chat-main__message__comments">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                <img src=${message.image} >
              </div>
            </div>`
          return html;
        } else {
          var html =
           `<div class="message__date">
                <div class="message__date__user">
                  ${message.user_name}
                </div>
                <div class="message__date__daytime">
                  ${message.created_at}
                </div>
              </div>
              <div class="chat-main__message__comments">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
            </div>`
          return html;
        };
    }
    function scroll() {
        $('.chat-main__message').animate({scrollTop: $('.chat-main__message')[0].scrollHeight});
    }

$('#new_message').on('submit', function(e){
   e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action')
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);      
      $('form')[0].reset();
      scroll();
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
})
});