var firebaseConfig = {
    apiKey: "AIzaSyAOzjDKEso1ksQ4awyFkUbDbv-k5gzg0dQ",
    authDomain: "sample-d917c.firebaseapp.com",
    databaseURL: "https://sample-d917c.firebaseio.com",
    projectId: "sample-d917c",
    storageBucket: "sample-d917c.appspot.com",
    messagingSenderId: "993836651696",
    appId: "1:993836651696:web:5f387ae080d648f0"
  };

  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var database = firebase.database();
  
  //Declaring current time
  var currentTime = moment().format();
  
  //Logging current time in console.log
    console.log("Current Time: " + currentTime);
          
  //When the submit button is clicked makes the function work
  $("#click-button").on("click", function() {
        // Prevent the page from refreshing
        event.preventDefault();
  
        // user input in the form 
      var trainNameForm = $("#trainNameForm").val().trim();
      var destinationForm = $("#destinationForm").val().trim();
      var trainTimeForm = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");


      var frequencyForm = $("#frequencyForm").val().trim();
  
      // Creates local "temporary" object for holding inputs
      var newTrain = {
      train: trainNameForm,
      destination: destinationForm,
      first: trainTimeForm,
      frequency: frequencyForm
      };
      
    //Setting new values in the database
    database.ref().push(newTrain);
    
    //Console.logging to make sure the new data has been stored to the database
    console.log(newTrain.train);
      console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
    
    //Clearing the inputs
     $("#trainNameForm").val("");
       $("#destinationForm").val("");
     $("#trainTimeForm").val("");
     $("#frequencyForm").val("");
  });
  
  //Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
    
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
    
    //Variable to figure out the converted train time
    var trainTimeConverted = moment(trainTime, "HH:mm");
    
    //Declaring a time difference variable
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log(timeDifference);
    
    var frequencyMinutes = childSnapshot.val().frequency;
    console.log("Frequency Minutes: " + frequencyMinutes);
    
    var minutesAway = Math.abs(timeDifference % frequencyMinutes);
      console.log("Minutes Away: " + minutesAway);
    
    var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
    console.log("Next Arrival: " + nextArrival);
    
    
    //Adding into the table
    $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  });
  

