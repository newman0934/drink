const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"')
const orderLists = document.querySelector('[data-order-lists]')
const alphaPos = new AlphaPos()


//---------建構式區-------------------

//Drink建構式  
function Drink(name, sugar, ice){
    this.name = name;
    this.sugar = sugar;
    this.ice = ice;
}

//AlphaPos建構式 
function AlphaPos () { }  



//---------函式區----------------------


//Drink取價格方法
Drink.prototype.price = function () {
    switch (this.name) {
      case 'Black Tea':
      case 'Oolong Tea':
      case 'Baozong Tea':
      case 'Green Tea':
        return 30
      case 'Bubble Milk Tea':
      case 'Lemon Green Tea':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
        return 55
      default:
        alert('No this drink')
    }
  }

//AlphaPos 取飲料名稱，冰跟甜度方法
AlphaPos.prototype.getCheckValue = function(inputName){
    let selectedOption = ""
    document.querySelectorAll(`[name=${inputName}]`).forEach(function(item){
        if(item.checked){
            selectedOption = item.value
        }
    })
    return selectedOption
}

//將訂單加到左側訂單區
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

//刪除訂單
AlphaPos.prototype.deleteDrink = function (target) {
    target.remove()
}
//結帳
AlphaPos.prototype.checkout = function () {
    let totalAmount = 0
    document.querySelectorAll('[data-drink-price]').forEach(function(drink) {
        totalAmount += Number(drink.textContent)
    })
    return totalAmount
}
//清空訂單
AlphaPos.prototype.clearOrder = function (target) {
    target.querySelectorAll('.card').forEach(function(card) {
      card.remove()
    })
 }


//----------------監聽區----------------------------


//監聽新增訂單按鈕
addDrinkButton.addEventListener("click",function(){
    //取得飲料名稱
    const drinkName = alphaPos.getCheckValue('drink')
    //取得冰塊
    const ice = alphaPos.getCheckValue('ice')
    //取得甜度
    const sugar = alphaPos.getCheckValue('sugar')
    //如果沒有選擇飲料跳出錯誤訊息
    if (!drinkName) {
        alert('Please choose at least one item.')
        return
    }
    const drink = new Drink(drinkName, sugar, ice)
    alphaPos.addDrink(drink)
})

//監聽刪除訂單按鈕
orderLists.addEventListener('click', function(event) {
    let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
    if (!isDeleteButton) {
      return
    }
    alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})


checkoutButton.addEventListener('click', function() {
    // 1. 計算訂單總金額
    alert(`Total amount of drinks：$${alphaPos.checkout()}`)
    // 2. 清空訂單
    alphaPos.clearOrder(orderLists)
})