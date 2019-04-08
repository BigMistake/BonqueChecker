let requestUrl = "https://bonque-ers.herokuapp.com/check?email=";

function checkEmail(){
    let adres = document.getElementById("email").value;

    if(adres.length !== 0){
        let button = document.querySelector("button");
        button.setAttribute("disabled", "");
        $('.collapse').collapse('hide');


        $.ajax({
            type: "GET",
            url: requestUrl + adres,
            success: function(msg){
                button.removeAttribute("disabled");
                let response = JSON.parse(msg);
                $(".results-container").show();
                $("#explanation").show();

                if((response.hasOwnProperty("HasPassword") && response["HasPassword"] === true) && (response.hasOwnProperty("HasAcceptedPrivacyPolicy") && response["HasAcceptedPrivacyPolicy"] === true)){
                    $("#used").show();
                } else if (response.hasOwnProperty("IsValidated") && response["IsValidated"] === true){
                    $("#verified").show();
                } else if (response.hasOwnProperty("Exists") && response["Exists"] === true){
                    $("#bonque").show();
                } else {
                    $("#nope").show();
                }

                if(response.hasOwnProperty("IsDeleted") && response["IsDeleted"] === true){
                    $("#deleted").show();
                }

                document.getElementById("response").innerText = msg;
            }
        })
    }
}
