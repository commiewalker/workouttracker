$(function () {

    $("#btnAddWorkout").on("click", () => {
        $("#formWorkout").fadeToggle("slow");
    })

    $("#btnWOSubmit").on("click", function (event) {
        event.preventDefault();

        const workoutName = $("#woName").val().trim();

        const newWO = {
            name: workoutName
        };

        $.ajax("/workout", {
            type: "POST",
            data: newWO
        }).then(() => {
            console.log("Success");
            location.reload();
        });

    })

    $("#btnInfo").on("click", () => {
        $(".current").fadeToggle("slow");
    })

    $("#btnXSubmit").on("click", (e) => {
        e.preventDefault();

        const name = $("#exName").val().trim();
        const type = $("#exType").val().trim();
        const duration = $("#exDuration").val().trim();

        const newX = {
            name: name,
            type: type,
            duration: duration
        };

        $.ajax("/exercise", {
            type: "POST",
            data: newX
        }).then(() => {
            console.log("Success");
            location.reload();
        })
    })

    $("#btnAddExcerise").on("click", () => {
        $("#formExcercise").fadeToggle("slow");
    })
    // END of the cureent exercise    
    $("#btnInfoP").on("click", () => {
        $(".previous").fadeToggle("slow");
    })




}) // End of on load function