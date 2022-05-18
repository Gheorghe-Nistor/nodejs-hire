
function handleKeyDown(e){
    if(e.keyCode == 46){
        const jobID = prompt("Enter the job id you want to delete: ");
        const jobDivs = document.querySelectorAll('.job-info');
        if(jobID > jobDivs.length)
            alert("Invalid job id!");
        else{
            const myTimeout = setTimeout(() => {
                jobDivs[jobID].remove();
            }, 2500);
            var i = 0;           
            function myLoop() {         
                setTimeout(function() {   
                let compStyles = window.getComputedStyle(jobDivs[jobID]);
                console.log(compStyles.opacity);
                jobDivs[jobID].style.opacity = parseFloat(compStyles.opacity) - 0.2;  
                i++;                    
                if (i < 5) {           
                    myLoop();            
                }                     
                }, 250)
            }
            myLoop();  
        }
        
    }
}

function init(){
    if(authenticated){
        document.addEventListener("keydown", handleKeyDown);
    }
}
window.onload = init;