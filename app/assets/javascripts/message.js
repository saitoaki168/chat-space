$(function(){ 

    function buildHTML(message){
        if ( message.image ) {
          var html = `<div class="message" data-message-id="${message.id}">
            <div class="message__date">
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
            </div>
          </div>`
          return html;
        } else {
          var html =`<div class="message" data-message-id="${message.id}">
           <div class="message__date">
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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        scroll();
        $('form')[0].reset();
        $(".submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 5000);
  }
});