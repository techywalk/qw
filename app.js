$(document).ready(function () {
    const surveyJSON = {
        elements: [
            { type: "text", name: "name", title: "Name", isRequired: true },
            { type: "text", name: "email", title: "Email", isRequired: true, inputType: "email" },
            { type: "text", name: "comments", title: "Comments", isRequired: true },
            { type: "html", html: "<button id='approveButton' class='btn btn-success'>Approve</button> <button id='rejectButton' class='btn btn-danger'>Reject</button>" }
        ]
    };

    const survey = new Survey.Model(surveyJSON);
    survey.onComplete.add(function (sender) {
        const results = JSON.stringify(sender.data);
        console.log("Survey results: " + results);
    });

    survey.render("surveyContainer");

    $('#surveyContainer').on('click', '#approveButton', function () {
        const data = survey.data;
        $.ajax({
            url: 'https://apim.quickwork.co/prodtest/requestcollection/v1/requestcollection/approve?apikey=X53Jd3MluqBBDHXAO6QBMqnECRZZOsBw',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                console.log('Approve result:', result);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    $('#surveyContainer').on('click', '#rejectButton', function () {
        const data = survey.data;
        $.ajax({
            url: 'https://your-api-endpoint/reject',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                console.log('Reject result:', result);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});
