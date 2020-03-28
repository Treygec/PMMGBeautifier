/**
* Sort Inventories by Code
* TODO: only grab the inventory where the button was pressed
*/
export class orderInventory {
cleanup() {}
run() {
var sortByCode = false

function sortInventoriesByCode() {
if (sortByCode) {
const inventories = document.querySelectorAll("div[class^='InventoryView__grid__'")

inventories.forEach(inventory => {

 let sorted = Array.from(inventory.children).sort(function (a: HTMLElement, b: HTMLElement) {

   let codeA = a.innerText.split('\n')[0]; // ignore upper and lowercase

   let codeB = b.innerText.split('\n')[0]; // ignore upper and lowercase
   if (codeA < codeB) {
     return -1;
   }
   if (codeA > codeB) {
     return 1;
   }
   // names must be equal
   return 0;

 })
 inventory.innerHTML = ''
 
 sorted.forEach( item => {
   inventory.appendChild(item)
 })
})
}
}

 function addSortByCodeButton() {
   const buttonContainer = document.querySelectorAll("div[class^='InventorySortControls__controls___'")
   buttonContainer.forEach(e => {
     let buttons = Array.from(e.children)
     let numButtons = buttons.length
     if (numButtons < 6) {
       let sortingButtons = buttons.splice(1,5)
       console.log(sortingButtons)
       sortingButtons.forEach(button => {
         button.addEventListener('click', function() {
           sortByCode = false;    
         })
       })
       let codeButton = document.createElement('div')
       codeButton.classList.add('InventorySortControls__criteria___1UBEZGp')
       let title = document.createElement('div')
       let arrowSpace = document.createElement('div')
       arrowSpace.classList.add('InventorySortControls__order___2snExpX')
       title.textContent = 'COD'
       codeButton.appendChild(title)
       codeButton.appendChild(arrowSpace)
       codeButton.addEventListener('click', function() {
         sortByCode = true
 })

       e.append(codeButton)
     }

   })
 }
}
}