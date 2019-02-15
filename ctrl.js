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
     var xhttp = new XMLHttpRequest();

    var client_id = "6c63dbb7e392cbcebd4fa6b487d9ee52ba760d12de39.api.hackerearth.com";
    var client_secret = "d1c781782f80e7f08464e9c1d252d9d7939ee85d";
    var test_id = 654823;

    var payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'test_id': test_id,
        'emails': ['jyothisp52@gmail.com', 'akul753.com', 'mail@akuls.co'],
        'send_email': false,
        'extra_parameters': {
            'candidate_names': {
                'jyothisp52@gmail.com': 'JP',
                'akul753.com': 'Akul',
                'mail@akuls.co': 'Awesome'
            }
        }
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("head").innerHTML =
                this.status;
        }
    };
    xhttp.open("POST", "https://api.hackerearth.com/recruiter/v1/tests/invite/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
}


