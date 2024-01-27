import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://invertible-lens-398011-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");

const input = document.getElementById("input");
const btn = document.getElementById("btn0");
const ul = document.getElementById("ul");


function renderLi(inp){
    
    
    let li = document.createElement("li");
    
    li.textContent = inp[1];
    
    ul.appendChild(li);
    
    li.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `ShoppingList/${inp[0]}`)
        
        remove(exactLocationOfItemInDB);
        
       
    })
}

btn.addEventListener("click",function(){
    let inputValue = input.value;
    push(shoppingListInDB, inputValue);
    
    input.value = "";
}
)

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        ul.innerHTML = "";
        
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            
            renderLi(currentItem);
        } 
        
    }
    else {
        ul.textContent =" No items here... yet";
    }

    }
)

