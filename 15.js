

let arrCompleted = []
let arr = []
//Starting position of empty cell
let ei = 3
let ej = 3


const createArr =  function(){

for (i = 0; i < 4; i++){
		arr[i] = [];
		for(j = 0; j < 4; j++){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = " ";
		}
    }
    return arr 
}

createArr()
 
const arrCopy = function (arrSrc, arrDis){
    
    for(elm in arrSrc){
     arrDis.push(arrSrc[elm].slice());
   }
   return arrDis
   }

   arrCopy(arr, arrCompleted)


let swap = function (arr, i1, j1, i2, j2 ) {
    temp = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = temp;

    return arr
}



let shuffleArr = function (arr){
    
    for (i = 0; i<500; i++) {
        randomNumber = Math.floor(Math.random() * 4)
        
        if (randomNumber === 0 && ei !== 0){
            swap(arr,  ei, ej, --ei, ej) // Move up
            
        }else if (randomNumber === 1 && ej !== 3) {
            swap(arr,  ei, ej, ei, ++ej )// Move right
            
            
        } else if (randomNumber === 2 && ei !== 3) {
            swap(arr, ei, ej, ++ei, ej) // Move down
            
        } else if (randomNumber === 3 && ej !== 0) {
             
                swap(arr, ei, ej, ei, --ej)// move left
                
            }
            
        }
    return arr
    }
    


// describes moves
let moveItem = (e) => {
    let cell = e.target.innerHTML


    
    let cellY = (+e.target.id[0])
    let cellX = (+e.target.id[2])



    if ((cellY == ei && Math.abs(cellX - ej) == 1) || (cellX == ej && Math.abs(cellY - ei) == 1)) {
     temp = arr[ei][ej]
     arr[ei][ej] = arr[cellY][cellX] 
     arr[cellY][cellX]= temp
     
       
        cell = ''
        ei = cellY 
        ej = cellX
    }
    else {
        const unMovable = alert('this cell cannot be moved. Please click on either cell next to empty one')
            console.log(unMovable)
    }


    
   rendershuffeledPlayground(arr)
   
   isCompleted(arr, arrCompleted)
}




  

const playground = document.getElementById('playground')
console.log(playground)


arr.forEach(function(element, i){
    const line = document.createElement('div')
    line.setAttribute('class', 'lines')
    playground.appendChild(line)
        element.forEach(function(elem, index){
            const item = document.createElement('div')
            item.setAttribute('class', 'item')
            item.setAttribute('id', `${i}-${index}`)
            item.innerHTML = arr[i][index]
            item.addEventListener('click', moveItem)
            line.appendChild(item)
        })
})
// shuffles the array and renders it
const start = document.createElement('button')
start.textContent = "Start"
document.querySelector('body').appendChild(start)

start.addEventListener('click', function(e){
    if (document.querySelector("h2")) {
        document.querySelector("h2").innerHTML = ''
    }
    
    shuffleArr(arr)
    rendershuffeledPlayground(arr)
    

})
//renders puzzle after shuffling and after every move
const rendershuffeledPlayground = function(arr) {
    //document.querySelector("body").innerHTML = ''
   playground.innerHTML = ''
  
    //tempArr = []
    arr.forEach(function(element, i){
        const line = document.createElement('div')
        line.setAttribute('class', 'lines')
        playground.appendChild(line)
            element.forEach(function(elem, index){
                const item = document.createElement('div')
                item.setAttribute('class', 'item')
                item.setAttribute('id', `${i}-${index}`)
                item.addEventListener('click', moveItem)
                item.innerHTML = arr[i][index]
                line.appendChild(item)
                item.addEventListener('click', moveItem)
            })
    })

}


// Checks whether the puzzle is completed
const isCompleted = function(arr, arrCompleted){
    if (JSON.stringify(arr) === JSON.stringify(arrCompleted)){
        const congrats = document.createElement("h2")
        congrats.textContent = "Congratulations, the puzzle has been completed"
        document.querySelector("body").appendChild(congrats)
        
    } 

}
    



