var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function getevents() {
    branch = document.getElementById("branch");
    branch = branch.value;
    sel = document.getElementById("event");
    sel.innerHTML = '<option value="">select...</option>';
    firebase.database().ref('/events/' + branch).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {

            s = '"' + child.key + '"';
            console.log(s)
            sel = document.getElementById("event");
            sel.innerHTML += '<option value=' + s + ">" + child.key + "</option>"
        })
        // ...
    });
}

function getparticipants() {
    event = document.getElementById("event").value;
    branch = document.getElementById("branch").value;


    var table = document.querySelector('#usertable tbody');
    var events = firebase.database().ref().child('/registration/' + event);
    events.on('value', snap => {

        table.innerHTML = "";
        snap.forEach(snapshot => {
            var user = firebase.database().ref().child('/users/' + snapshot.key);
            user.once('value', sna => {

                var eve = snapshot.val();
                if (eve !== "paid") {
                    var row = table.insertRow(-1);
                    row.setAttribute("id", snapshot.key);
                    cell = row.insertCell(-1);
                    if (sna.val().name) {
                        cell.innerHTML = sna.val().name;
                    } else {
                        cell.innerHTML = snapshot.key;
                    }
                    cell = row.insertCell(-1);
                    cell.innerHTML = eve;
                }
            });
        });
    });
}


function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            alert("successful");
            // getparticipants();

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            event_name = 'def';
            document.getElementById("ename").innerText = '';

            tble = document.getElementById("userbody");
            tble.innerHTML = "";
            firebase.auth().signOut();

        });

    })

}


