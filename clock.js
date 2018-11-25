$(document).ready(function () {
    
    let breakLen = 5;
    let sessionLen = 25;
    $('#min').text(`${sessionLen}`);
    
    $('.arrow').on('click', function(){
        if (this.id === 'breakDown'){
            breakLen--;
            if (breakLen < 1) {
                breakLen++;
            }
        }
        else if (this.id === 'breakUp'){
            breakLen++;
            if (breakLen > 25) {
                breakLen--;
            }
        }
        else if (this.id === 'sessionUp'){
            sessionLen++;
            if (sessionLen > 60) {
                sessionLen--;
            }
        }
        else if (this.id === 'sessionDown'){
            sessionLen--;
            if (sessionLen < 1) {
                sessionLen++;
            }
        }
        $('#breakLength').text(`${breakLen}`);
        $('#sessionLength').text(`${sessionLen}`)

        Reset();
    })
    
    let timer;
    let mins;
    let secs;
    let sessionOrBreak = true;
    let isPaused = false;
    let hasBegun = false;

    function timerStart(bool) {
        if(bool){mins = String(sessionLen)}
        else if(!bool){mins = String(breakLen)};
        secs = '00';
        $('#sec').text(`${secs}`);
        $('#min').text(`${mins}`);
        timer = setInterval(update, 1000)
    }
    
    function update() {
        if (!isPaused){
            secs--;
            if (String(secs).length < 2){
            let currentSec = secs;
            secs = `0${currentSec}`
            }
            if (secs < 0){ 
                mins--;
                if (mins < 0) {
                    mins = '00';
                    secs='00';
                    $('#beep')[0].play();
                    setTimeout(() => {
                        $('#beep').pause();
                        $('#beep').currentTime = 0;
                    }, 1000);
                    clearInterval(timer);
                    sessionOrBreak = !sessionOrBreak;
                    timerStart(sessionOrBreak);
                    if(sessionOrBreak){
                        $('#clockMode').text('Session');
                    }
                    else if(!sessionOrBreak){
                        $('#clockMode').text('Break')
                    }
                }
                else{
                    secs = 59;
                }
            }
        $('#sec').text(`${secs}`);
        $('#min').text(`${mins}`);
        }
    }

    $('#playpause').on('click', function playOrPause() {
        if (!hasBegun){
            hasBegun = true;
            timerStart(sessionOrBreak);
            $(this).html('<span class="icon"><i class="fas fa-pause fa-3x"></i></span>');
            console.log('clicked!');
        }
        else if(hasBegun){isPaused = !isPaused;
            if (isPaused){
            $(this).html('<span class="icon"><i class="fas fa-play fa-3x"></i></span>')}
            else if(!isPaused){
                $(this).html('<span class="icon"><i class="fas fa-pause fa-3x"></i></span>');

            }
        };
    });

    function Reset() {
        $(this).css('transform', 'rotate(180deg)')
        clearInterval(timer);
        $('#min').text(`${sessionLen}`);
        $('#sec').text(`00`);
        hasBegun = false;
        sessionOrBreak = true; 
        isPaused = false;
        $('#playpause').html('<span class="icon"><i class="fas fa-play fa-3x"></i></span>')
        $('#clockMode').text('Session');
    }

    $('#reset').on('click', Reset);

});