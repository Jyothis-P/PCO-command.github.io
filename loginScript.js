function doNothing() {
    window.location.href = "#";
}

//This is the shit
function sendLink() {
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
    // r = requests.post("https://api.hackerearth.com/recruiter/v1/tests/invite/", data=json.dumps(payload))


    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("head").innerHTML =
                this.status;
        }
    };

    // var xhhr = new XDomainRequest();
    // xhhr.open("POST", "https://api.hackerearth.com/recruiter/v1/tests/invite/");
    // xhhr.send(JSON.stringify(payload));
    xhttp.open("POST", "https://api.hackerearth.com/recruiter/v1/tests/invite/", true);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
}


$(document).ready(function () {
    // $(".box").show(2000);
    //fadeInUp(1000);

    $(".container").fadeIn(2000);
});


function fadeInUp(duration) {

    $(".container").css({opacity: 0});
    var j = 0;
    for (var i = 0; i <= duration; i++) {
        j += 1 / duration;

        setTimeout(function () {
            $(".container").css({opacity: j});
        }, 1000);

    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
