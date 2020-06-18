//Scrape button
$(".scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        console.log(data)

        location.reload()
    }).catch(function (error) {
        console.log(error)
    });
})

//Save article
$(".save").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/articles/save/" + thisId
    }).then(function (data) {
        location.reload()
        $(".clear").remove();

    }).catch(function (error) {
        console.log(error)
    });
})

$(".modal-trigger").on("click", function () {
    var thisId = $(this).attr("data-id");
    $("#list").empty();
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function (data) {
        console.log(data)
        $("#title").html(data.title.trim())
        for (var i = 0; i < data.note.length; i++) {
            $("#list").append(`<li style="font-size:20px">${data.note[i].body}<a style="float: right;" data-id="${data._id}" data-note-id="${data.note[i]._id}" id="delete" class="btn red">X</a></li><hr />`)
        }
    });
})

//Delete Article button
$(".delete").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/articles/delete/" + thisId
    }).then(function (data) {
        location.reload()
    }).catch(function (error) {
        console.log(error)
    });
});

//Save Note button
$(".savenote").on("click", function () {
    var thisId = $(this).attr("data-id");
    if (!$("#notemsg").html("")) {
        alert("please enter a note to save")
    } else {
        $.ajax({
            method: "PUT",
            url: "/notes/save/" + thisId,
            data: {
                body: $("#notemsg").val()
            }
        }).then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notemsg").val("");
            $("#modal1").modal("hide");
            location.reload()
        }).catch(function (error) {
            console.log(error)
        });
    }
});

//Delete Note button
$(document).on("click", ".red", function (event) {
    event.preventDefault()
    var noteId = $(this).attr("data-note-id")
    $.ajax({
        method: "DELETE",
        url: "/notes/delete/" + noteId
    }).then(function (data) {
        console.log(data)
        $("#modal1").hide();
        location.reload()
    }).catch(function (error) {
        console.log(error)
    });
});

//Clear button
$(".clear").on("click", function () {
    $.ajax({
        method: "DELETE",
        url: "/clear"
    }).then(function () {
        $("#articles").empty();
        location.reload()
    }).catch(function (error) {
        console.log(error)
    });
})