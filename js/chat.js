firebase.initializeApp({
    apiKey: "AIzaSyBai2Mnwmn522mAIC4g2E129kFwYoYhqzg",
    authDomain: "events-72382.firebaseapp.com",
    projectId: "events-72382",
});

var db = firebase.firestore();
$(document).on('click', '.send-message', function(){
    var message = $("#message").val();
    db.collection("chat").add({
        message: message,
    })
    .then((docRef) => {
       new display_message($("#message").val());
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});

function display_message(message){
    $('.chat-widget-popup-content').append(`
        <div class="message-line">
            ${message}
        </div>
    `);
}

$(document).ready(function(){
    db.collection("chat").get().then((querySnapshot) => {
        var i = 0;
        querySnapshot.forEach((doc) => {
            i++;
            if(i < 10){
                new display_message(doc.data().message);
            }
        });
    });
});