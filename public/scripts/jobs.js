const jobDivs = document.querySelectorAll('.job-info');

function handleKeyDown(e){
    if(e.keyCode == 46){
        const jobID = prompt("Enter the job id you want to delete: ");
        if(jobID > jobDivs.length)
            alert("Invalid job id!");
        else{
            const myTimeout = setTimeout(() => {
                jobDivs[jobID].remove();
            }, 2500);
            var i = 0;
            var opacityInterval = setInterval(() => {
                let compStyles = window.getComputedStyle(jobDivs[jobID]);
                console.log(compStyles.opacity);
                jobDivs[jobID].style.opacity = parseFloat(compStyles.opacity) - 0.2;  
                i++; 
                if(i == 5)
                    opacityInterval.clear();
            }, 250);          
            // function myLoop() {         
            //     setTimeout(function() {   
            //     let compStyles = window.getComputedStyle(jobDivs[jobID]);
            //     console.log(compStyles.opacity);
            //     jobDivs[jobID].style.opacity = parseFloat(compStyles.opacity) - 0.2;  
            //     i++;                    
            //     if (i < 5) {           
            //         myLoop();            
            //     }                     
            //     }, 250)
            // }
            // myLoop();  
        }
        
    }
}
function handleDoubleClick(e){
    if(confirm("Are you sure you want to delete this job?")){
        e.currentTarget.remove();
    }
}
function init(){
    if(authenticated){
        document.addEventListener("keydown", handleKeyDown);
        document.querySelectorAll('.job-info').forEach(item => {
            item.addEventListener("dblclick", handleDoubleClick);
        })
    }
    // const colors = ['#C05780, CDAC', '#FF6F68', '#00B0BA', '#C05780', '#E7C582','#0065A2'];
    // document.querySelectorAll('.job-info').forEach(item => {
    //     item.style.background = colors[Math.floor(Math.random()*colors.length)];
    // })
}
window.onload = init;