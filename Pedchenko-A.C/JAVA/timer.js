(function () {
    var pomMinutes = 25;
    var breakMinutes = 5;
    var none = "none";
    var name = "friend";
    var $pom = $('#pom');

    var pom = {
        minutes: pomMinutes,
        seconds: 0,
        activity: "Work",
        interval: none
    };

    var breakRest = {
        minutes: breakMinutes,
        seconds: 0,
        activity: "Break",
        interval: none
    };

    function getSeconds(seconds) {
        if (seconds < 10) {
            return '0' + seconds;
        }
        return seconds;
    }

    function getTime(timer) {

        return timer.minutes + ":" + getSeconds(timer.seconds);
    }

    var currentlyRunning = {
        timer: pom
    };


    $("button#start").on("click", startTimer);
    $("button#pause").on("click", pause);
    $pom.on("click", pause);
    $("button#reset").on("click", reset);
    $("input#work-time").on("change", setWork);
    $("input#break-time").on("change", setBreak);

    $("#work-add").on("click", {
        element: "#work-time",
        minutes: "pomMinutes"
    }, add);

    $("#work-subtract").on("click", {
        element: "#work-time",
        minutes: "pomMinutes"
    }, subtract);

    $("#break-add").on("click", {
        element: "#break-time",
        minutes: "breakMinutes"
    }, add);

    $("#break-subtract").on("click", {
        element: "#break-time",
        minutes: "breakMinutes"
    }, subtract);

    function add(event) {

        var $time = $(event.data.element);
        window[event.data.minutes] = $time.val();
        $time.val(++window[event.data.minutes]);

    }

    function subtract(event) {
        var $time = $(event.data.element);
        var current = $time.val();

        if (current > 0) {
            window[event.data.minutes] = current;
            $time.val(--window[event.data.minutes]);
        }

    }

    function setWork() {
        var $worktime = $("#work-time");
        pomMinutes = $worktime.val();
        if (pomMinutes < 0) {
            pomMinutes = 1;
            $worktime.val(pomMinutes);
        }
    }

    function setBreak() {
        var $breaktime = $("#break-time");
        breakMinutes = $breaktime.val();
        if (breakMinutes < 0) {
            breakMinutes = 1;
            $breaktime.val(breakMinutes);
        }
    }

    function printTime() {
        $("#time").text(getTime(currentlyRunning.timer));
    }

    function printActivity() {
        $("#activity").text(currentlyRunning.timer.activity);
    }

    function startTimer() {
        if (currentlyRunning.timer.interval === none) {
            currentlyRunning.timer.interval = setInterval(countDown, 1000);
            printActivity();
        }
    }

    function timeZero() {
        return ((currentlyRunning.timer.minutes === 0) && (currentlyRunning.timer.seconds === 0));
    }

    function reset() {
        endTimer();
        refreshTimers();
        printTime();
        printActivity();
    }


    function refreshTimers() {
        pomMinutes = $("#work-time").val();
        pom.minutes = pomMinutes;
        pom.seconds = 0;
        breakMinutes = $("#break-time").val();
        breakRest.minutes = breakMinutes;
        breakRest.seconds = 0;
        pom.interval = none;
        breakRest.interval = none;
    }

    function switchTimers() {
        if (currentlyRunning.timer === pom) {
            currentlyRunning.timer = breakRest;
            $pom.addClass('break');
        }
        else {
            currentlyRunning.timer = pom;
            $pom.removeClass('break');
        }
    }

    function soundAlarm() {
        if (currentlyRunning.timer === pom) {
            responsiveVoice.speak("Great job, " + name + ".  Now it's time for a break", "UK English Male");
        }
        else {
            responsiveVoice.speak(name + ", time to get back to work!", "UK English Male");
        }
    }

    function timerFinish() {
        endTimer();
        refreshTimers();
        soundAlarm();
        switchTimers();
        printActivity();
        startTimer();
    }

    function deductTime() {
        var timer = currentlyRunning.timer;

        if (timeZero()) {
            timerFinish();
        }

        if (timer.seconds === 0) {
            timer.minutes -= 1;
            timer.seconds = 59;
        }
        else {
            timer.seconds -= 1;
        }
    }

    function countDown() {
        deductTime();
        printTime();
    }

    function endTimer() {
        if (currentlyRunning.timer.interval == none) {
            return;
        }
        clearInterval(currentlyRunning.timer.interval);
        currentlyRunning.timer.interval = none;
    }

    function pause() {
        if (currentlyRunning.timer.interval === none) {
            startTimer();
        }
        else {
            endTimer();
        }
    }

    $("#modal-submit").on('click', setName);
    function setName(event) {
        name = $("#name").val();
        if ((name === null) || (name === "")) {
            name = "friend";
        }
    }

    function init() {
        printTime();
        printActivity();
        $('#myModal').modal();
    }

    init();

})();