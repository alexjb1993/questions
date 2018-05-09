// JavaScript to move the questions from the form into the database

//Adapted from: https://github.com/claireellul/cegeg077-week6formcode

//Create function to ensure all question boxes are filled
function questSubmit() {
var loc=document.getElementById("locationdesc").value;
var quest=document.getElementById("question").value;
var aA=document.getElementById("answera").value;
var aB=document.getElementById("answerb").value;
var aC=document.getElementById("answerc").value;
var aD=document.getElementById("answerd").value;
// check if all boxes are filled
		if (loc==null || loc=="",quest==null || quest=="",aA==null || aA=="",aB==null || aB=="",aC==null || aD=="",aD==null || aD=="")
        {
// show an alert if any boxes are empty and kill the function
      alert("Fill out required fields");
      return false;
  }
    else
// if all boxes are filled allow data upload
    			{
    	questUpld()
  }
}

// Create function for data upload
function questUpld() {
// show an alert saying that the data is being stored
	alert ("Your question has be stored");
// define variables from text box contents
var locationdesc = document.getElementById("locationdesc").value;
var question = document.getElementById("question").value;
var answera = document.getElementById("answera").value;
var answerb = document.getElementById("answerb").value;
var answerc = document.getElementById("answerc").value;
var answerd = document.getElementById("answerd").value;
var lat = document.getElementById("lat").value;
var lng = document.getElementById("lng").value;

// convert text box variables into string
var postString = "locationdesc="+locationdesc +"&question="+question +"&answera="+answera +"&answerb="+answerb +"&answerc="+answerc+ "&answerd="+answerd;

	// Check which radio button is selected and set it as the correct answer
		if (document.getElementById("radA").checked) { postString=postString+"&answercorrect=1";
			}
		if (document.getElementById("radB").checked) { postString=postString+"&answercorrect=2";
			}
		if (document.getElementById("radC").checked) { postString=postString+"&answercorrect=3";
			}
		if (document.getElementById("radD").checked) { postString=postString+"&answercorrect=4";
			}

//add the latitude and the longitude values on to the end of the string
postString = postString + "&lat=" + lat + "&lng=" + lng;

// process question data
questProcess(postString);
}

// Create variable to hold the XMLHttpRequest()
var reqXLM;

// Upload the question data through the server using XMLHttpRequest
function questProcess(postString) {
			reqXLM = new XMLHttpRequest();
			reqXLM.open('POST','http://developer.cege.ucl.ac.uk:30285/questUpload',true);
			reqXLM.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			reqXLM.onreadystatechange = questUploadComp;
			reqXLM.send(postString);
		}

// Upload to data server and check response
function questUploadComp() {
// Wait until data is ready
		if (reqXLM.readyState == 4) {
// Display response
		document.getElementById("questReturn").innerHTML = reqXLM.responseText;
	}
}
