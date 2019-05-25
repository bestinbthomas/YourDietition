
function calculateReq(){
    let age =  parseInt(document.getElementById('ageInput').value);
    let height = parseInt(document.getElementById('heightInput').value);
    let weight = parseInt(document.getElementById('weightInput').value);
    let sex = document.getElementById('gender').value;
    let form = document.getElementById("myForm");
    let s = (sex == 'M')?5:-161;
    let BMR = (10*weight)+(6.25*height)-(5*age) + s;
    let max = Math.round(BMR * 1.66);
    let calorie = parseInt(document.getElementById('calories').value);
    let infodiv = document.getElementById('infodiv');
    let BMI = Math.round(weight*10000/(height*height));
    let d = new Date();
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let D = months[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear();
    if(age && height && weight && (sex=='F'||sex =='M') && calorie){

        let saveobj = {
            Age : age,
            Height : height,
            Weight : weight,
            Sex : sex,
            Calorie : calorie,
            date : D
        };

        if(localStorage.getItem("saveObjs")== null){
            let saveObjs = [];
            saveObjs.push(saveobj);
            localStorage.setItem("saveObjs",JSON.stringify(saveObjs));
        }
        else{
            let saveObjs = JSON.parse(localStorage.getItem("saveObjs"));
            saveObjs.push(saveobj);
            localStorage.setItem("saveObjs",JSON.stringify(saveObjs));
        }

        form.reset();

        infodiv.style.color = "#0f0f0f";

        infodiv.innerHTML = 
        "<p>Thank you for completing this form.<BR><BR>" +
        "Your Body Mass Index is " + BMI+"</p>"+
        "<p>value of s "+s;
        if(BMI<18.5){
            infodiv.innerHTML += "<p>You are under weight try consuming more food <BR></p>"
        }
        else if(BMI<25){
            infodiv.innerHTML += "<p>Your BMI is fine maintain this <BR></p>"
        }
        else if(BMI<30){
            infodiv.innerHTML += "<p>You are over weight try controlling fat consumption<BR></p>"
        }
        else {
            infodiv.innerHTML += "<p>You are obese please control your fat intake and exercise regularly<BR></p>"
        }
        infodiv.innerHTML +=
        "<p>you had  " + calorie + "kcal calories<BR></p>"+
        "<p>"+BMR+" to "+max+"kcal is the optimum calorie intake recommended for you <BR></p>";
        if(calorie<BMR){
            infodiv.innerHTML += "<p>You need to have more calories to stay healthy !!! <BR></p>";
        }
        else if(calorie>max){
            infodiv.innerHTML += "<p>You are having too much calories, control it to stay in shape !! <BR></p>";
        }
        else{
            infodiv.innerHTML += "<p>Yay, Your calorie intake is in the optimum range keep it up !!</p>"
        }
    }
    else{
        infodiv.style.color="#ff0000";
        infodiv.innerHTML = "*Please fill the form";
    }
}

function Loadinfo(){

    let PrevDiv = document.getElementById('prevInfo');
    PrevDiv.style.visibility="visible";
    let infodiv = document.getElementById('infodiv');

    if(localStorage.getItem("saveObjs")== null){
        infodiv.style.color="#ff0000";
        infodiv.innerHTML = "*No logs to show";
    }
    else{
        let saveObjs = JSON.parse(localStorage.getItem("saveObjs"));
;
        
        
        PrevDiv.innerHTML = "";
        let i =0;
        while(saveObjs[i] != null){
            
            let saveobj = saveObjs[i];
            PrevDiv.innerHTML += 
            "<div class =\"smallcont\">"+
            "<p class =\"datepara\"> Date : " + saveobj.date +"<BR></p>"+
            "<p class =\"infopara\"> Age : " + saveobj.Age +"<BR></p>"+
            "<p class =\"infopara\"> Height : " + saveobj.Height +"<BR></p>"+
            "<p class =\"infopara\"> Weight : " + saveobj.Weight +"<BR></p>"+
            "<p class =\"infopara\"> Gender : " + saveobj.Sex +"<BR></p>"+
            "<p class =\"infopara\"> Calories intake : " + saveobj.Calorie +"<BR></p>"+
            "</div>";
            i++;
        }
    }  

}

function deleteinfo(){
    let infodiv = document.getElementById('infodiv');
    let PrevDiv = document.getElementById('prevInfo');
    if(localStorage.getItem("saveObjs")== null){
        infodiv.style.color="#ff0000";
        infodiv.innerHTML = "*No logs to show";
    }
    else{
        PrevDiv.innerHTML = "";
        localStorage.removeItem("saveObjs");
    }
}