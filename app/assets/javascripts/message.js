$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__message" data-message-id=${message.id}>
         <div class="main-chat__message__box">
           <div class="main-chat__message__box__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message__box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
           <p class = "lower-message__image">
           <img src=${message.image} >
           </p>
         </div>
       </div>`
   } else {
     var html =
      `<div class="main-chat__message" data-message-id=${message.id}>
         <div class="main-chat__message__box">
           <div class="main-chat__message__box__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message__box__data">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
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
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
     .fail(function(){
       alert('error');
     });
     return false;
  });

});

