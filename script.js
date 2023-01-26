// localStorage.removeItem("date")
$(document).ready(function() {
    // Global Variables
    let sumsCalculated = 0
    let timesTaken = []
    let totalTime = 0
    let averageTime = 0
    let difficultSumQuestion = ""
    let difficultSumTime = 0
    let lastOperatorNumber = 5




    function setStorage() { // Only to be used after player has completed the game.
        let date = new Date()
        localStorage.setItem("date", date.toUTCString().slice(0,-13))
        localStorage.setItem("totalTime", totalTime)
        localStorage.setItem("averageTime", averageTime)
        localStorage.setItem("difficultSumQuestion", difficultSumQuestion.slice(0,-1))
        localStorage.setItem("difficultSumTime", (difficultSumTime / 1000).toFixed(2))
    }

    function checkStorage() {
        let date = new Date()
        if(localStorage.date == date.toUTCString().slice(0,-13)) {
            return true
        } else {
            return false
        }
    }

    document.getElementById("copyBtn").addEventListener('click', function() {
        navigator.clipboard.writeText("I completed 10 sums in " + localStorage.getItem("totalTime") + " seconds on www.10sums.com")
        $("#copyBtn").css('cursor', 'default')
        $("#copyBtn").css('background-color', '#0A142F')
        $("#copyBtn").css('color', 'white')
        $("#copyBtn").text("Copied to clipboard")
    })

    function getComputerTime() { // Gets the computer time, used for welcome message
        let date = new Date();
        return date.getHours()
    }

    function getRandomNumber(num) {
        return Math.floor(Math.random() * num)
    }

    function displayEndElements() {
        let shareDiv = $("#shareButtons")
        shareDiv.css('visibility', 'visible')
        shareDiv.fadeTo("slow", 1, function() {
            // Complete
        })
    }

    function fadeText(num) {
        let text = $("#text")
        if(num == 0) {
            text.fadeTo("slow", 1, function() {
                return true
            })   
        } else if(num == 1) {
            text.fadeTo("slow", 0, function() {
                return true
            })
        } else {
            alert("Incorrect Number Applied.")
        }
        
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getWelcomeMessage() {
        let welcomeMessage = ""
        if(getComputerTime() >= 0 && getComputerTime() <= 5) {
           const earlyMessages = ["Good Morning! You're early.", "Very Good Morning! You are early.", "Splendid Morning! You're early.", "Good Early Morning!"]
           welcomeMessage = earlyMessages[Math.floor(Math.random()*earlyMessages.length)]
        } else if(getComputerTime() > 5 && getComputerTime() <= 12) {
            const perfectMessages = ["Good Morning.", "Good Morning!", "Great Morning!", "Splendid Morning!", "Good Great Morning!", "Morning.", "Hello, Good Morning!"]
            welcomeMessage = perfectMessages[Math.floor(Math.random()*perfectMessages.length)]
        } else if(getComputerTime() > 12 && getComputerTime() <= 17) {
            const lateMessages = ["Good Afternoon!", "Afternoon. How are you?", "It's afternoon, welcome.", "Good Afternoon. Welcome.", "It's afternoon, where have you been?"]
            welcomeMessage = lateMessages[Math.floor(Math.random()*lateMessages.length)]
        } else if(getComputerTime() > 17 && getComputerTime() <= 21) {
            const veryLateMessages = ["Good Evening.", "Good Evening!", "Welcome. ", "Hello and good evening!"]
            welcomeMessage = veryLateMessages[Math.floor(Math.random()*veryLateMessages.length)]
        } else if(getComputerTime() > 21 && getComputerTime() <= 23) {
            const nightMessages = ["It's late, is it time for maths?.", "It's night time! Do some maths.", "It's night time!!", "Please try get here earlier, it's night!"]
            welcomeMessage = nightMessages[Math.floor(Math.random()*nightMessages.length)]
        } else {
            welcomeMessage = "Hello"
        }
        return welcomeMessage
    }


    function getQuestion() {
        let operatorNumber = getRandomNumber(2)
        console.log("Operator Number " + operatorNumber)
        console.log("Last Operator Number " + lastOperatorNumber)
        while(operatorNumber == lastOperatorNumber) {
            operatorNumber = getRandomNumber(2)
        }
        let number1 = 0
        let number2 = 0
        let answer = 0
        let question = ""
        lastOperatorNumber = operatorNumber

        if(operatorNumber == 0) {
            // Addition
            number1 = getRandomNumber(30)
            if(number1 == 0) {
                number1 += 1
            }
            number2 = getRandomNumber(number1)
            if(number2 == 0) {
                number2 += 1
            }
            answer = number1 + number2
            question = number1 + "+" + number2 + "="
        } else if(operatorNumber == 1) {
            // Subtraction
            number1 = getRandomNumber(30)
            number2 = getRandomNumber(number1)
            answer = number1 - number2
            question = number1 + "-" + number2 + "="
        } else if(operatorNumber == 2) {
            // Multiplication
            number1 = getRandomNumber(12)
            number2 = getRandomNumber(12)
            answer = number1 * number2
            question = number1 + "x" + number2 + "="
        }

        return [answer, question]
    }

    function calculateTime(questionTime, question) {
        let questionStartDate = questionTime
        let questionEndDate = new Date()
        let questionText = question

        const diffTime = Math.abs(questionEndDate - questionStartDate)
        

        if(diffTime > difficultSumTime) { // This updates the longest sum in the variables at the top
            difficultSumTime = diffTime
            difficultSumQuestion = questionText
            
        }
        timesTaken.push(diffTime) // Pushes the time taken into the array so that average time can be calculated later.
    }

    function getTotalTime() {
        totalTime = 0
        for (let i = 0; i < timesTaken.length; i++) {
            totalTime += timesTaken[i]
        }
        totalTime = (totalTime / 1000).toFixed(2)
        return totalTime
    }

    function getAverageTime() {
        averageTime = 0
        let averageTimeSeconds
        for (let i = 0; i < timesTaken.length; i++) {
            averageTime += timesTaken[i]
        }
        averageTimeSeconds= (averageTime / 1000)
        averageTime = (averageTimeSeconds / timesTaken.length).toFixed(2)
        return (averageTimeSeconds / timesTaken.length).toFixed(2)
    }

    function displayPastResults() {
       let text = $("#text")
       let sums = $("#sums")
       let comeBack = $(".comeBackText")
       let arrow = $(".arrow")
       let footer = $(".footer")
       let global = $("*")
       text.css("position", "relative")
       comeBack.css("visibility", "visible")
       footer.css("visibility", "visible")
       arrow.css("visibility", "visible")
       global.css("overflow-y", "visible")
       sums.text("10sums.com")
       text.html("You completed 10 sums in " + localStorage.totalTime + " seconds" + "<br>" + " It took you on average " + localStorage.averageTime +  " seconds per sum" + "<br>" +  " Your longest sum was " + localStorage.difficultSumQuestion + " with " + localStorage.difficultSumTime + " seconds")
       text.fadeTo("slow", 1)
       sums.fadeTo("slow",1)
       arrow.fadeTo("slow",1)
       comeBack.fadeTo("slow",1)
       footer.fadeTo("slow", 1)
        displayEndElements()
    }

    function gameOver() {
        let text = $("#text")
        let sums = $("#sums")
        // Placeholder
        getTotalTime()
        getAverageTime()
        setStorage()
        sums.fadeTo("slow", 0)
        text.fadeTo("slow", 0, function() {
            displayPastResults()
        })
        
        

        /*
        sums.fadeTo("slow", 0, function() {
            sums.text("10sums.com")
        })
        text.fadeTo("slow", 0, function() {
            text.html("You completed 10 sums in " + getTotalTime() + " seconds" + "<br>" + " It took you on average " + getAverageTime() +  " seconds per sum" + "<br>" +  " Your longest sum was " + difficultSumQuestion.slice(0, -1) + " with " + (difficultSumTime / 1000).toFixed(2) + " seconds")
        })
        */

        
        /*
        sums.fadeTo("slow", 1, function() {
            // Finished
        })
        text.fadeTo("slow", 1, function() {
            setStorage()
        })
        */
    
    
    
    }
    function input(answerText, questionText) {
        let startDate = new Date()
        let text = $("#text")
        let sums = $("#sums")
        let answer = answerText
        let question = questionText
        let input = ""
        $("#text").focus();

        function addText(question, input) {
            if(sumsCalculated < 10) {
                text.text(question + input)
            } else if(sumsCalculated == 10) {
                //text.text("")
            }
            
        }

        function logger(event) {
            switch(event.key) {
                case "1":
                    input = input + "1"
                    addText(question, input)
                    break
                case "2":
                    input = input + "2"
                    addText(question, input)
                    break
                case "3":
                    input = input + "3"
                    addText(question, input)
                    break
                case "4":
                    input = input + "4"
                    addText(question, input)
                    break
                case "5":
                    input = input + "5"
                    addText(question, input)
                    break
                case "6":
                    input = input + "6"
                    addText(question, input)
                    break
                case "7":
                    input = input + "7"
                    addText(question, input)
                    break
                case "8":
                    input = input + "8"
                    addText(question, input)
                    break
                case "9":
                    input = input + "9"
                    addText(question, input)
                    break
                case "0":
                    input = input + "0"
                    addText(question, input)
                    break
                case "Backspace":
                    input = input.slice(0,-1)
                    addText(question, input)
                    break
            }
            if(parseInt(input) == answer) {
                // Placeholder
                input = ""
                answer = 999999
                sumsCalculated++
                sums.text(sumsCalculated + "/10")
                // Placeholder
                calculateTime(startDate, questionText)

                if(sumsCalculated == 10) {
                    // Game is finished
                    // Stop event
                    document.getElementById("body").removeEventListener('keydown', logger)
                    gameOver()
                    
                } else if(sumsCalculated < 10) {
                    // Game Continues
                    game()
                }
            }
        }
        document.getElementById("body").addEventListener('keydown', logger)
          
    }

    function game() {
        let question = getQuestion()
        let answer = question[0]
        let questionText = question[1]
        let text = $("#text")
        let sums = $("#sums")
        sums.fadeTo("fast", 1, function() {
            // Finished
        })   

        // Placeholder
        text.text(questionText)
        input(answer, questionText, true)
    }

    function displayWelcomeMessageTwo() {
        let text = $("#text")
        sleep(1000).then(() => { 
            text.text("Press any key to begin")
            fadeText(0);
            document.getElementById("body").addEventListener('keypress', function keyer(event) {
                document.getElementById("body").removeEventListener('keypress', keyer)
                game()
            })
         });    
    }

    function displayWelcomeMessageOne() {
        let text = $("#text")
        // Checks if the user has already played for today
        if(checkStorage()) {

            displayPastResults()
        } else if(!checkStorage()) { 
            text.text(getWelcomeMessage())  
            fadeText(0)
            sleep(2000).then(() => { 
                fadeText(1);
                displayWelcomeMessageTwo();
             });
        }
    }


    displayWelcomeMessageOne()
    
    





















































    // Footer Animations and click detector stuff

    $(".footerCreator").hover(function(){
        $(this).css('cursor', 'pointer'); // 'default' to revert
        $(this).css('text-decoration-line', 'underline')
    }, function() {
        // Placeholder
        $(this).css('text-decoration-line', 'none')
    })

    $("#fbBtn").hover(function() {
        $(this).css('cursor', 'pointer'); // 'default' to revert
        $(this).animate({"border-width":"4px"}, 100);
        $(this).animate({"color":"#fffff"}, 100);
        //$(this).css("background-color", "yellow");
    }, function() {
        $(this).css("background-color", "transparent");
        $(this).animate({"border-width":"2px"}, 100);
    })
    $("#fbBtn").click(function() {
        // Placeholder
    })

    $("#liBtn").hover(function() {
        $(this).css('cursor', 'pointer'); // 'default' to revert
        $(this).animate({"border-width":"4px"}, 100);
        $(this).animate({"color":"#fffff"}, 100);
        //$(this).css("background-color", "yellow");
    }, function() {
        $(this).css("background-color", "transparent");
        $(this).animate({"border-width":"2px"}, 100);
    })
    $("#liBtn").click(function() {
        // Placeholder
    })

    $("#twBtn").hover(function() {
        $(this).css('cursor', 'pointer'); // 'default' to revert
        $(this).animate({"border-width":"4px"}, 100);
        $(this).animate({"color":"#fffff"}, 100);
        //$(this).css("background-color", "yellow");
    }, function() {
        $(this).css("background-color", "transparent");
        $(this).animate({"border-width":"2px"}, 100);
    })
    $("#twBtn").click(function() {
        // Placeholder
    })
})