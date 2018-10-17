var dataset = [
  {
    "itemNo": "4125789",
    "qty": "10",
    "unitPrice": 3.55,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "7546985",
    "qty": "1",
    "unitPrice": 6.00,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  }
]

function getElementIndex(node) {
  var index = 0;
  while ( (node = node.previousElementSibling) ) {
      index++;
  }
  return index;
}

document.querySelector(".quickOrder-list").children(".quickOrder-row").addEventListener("blur", function(e){
    console.log(e.currentTarget);
    var order = getElementIndex(e.currentTarget.closest(".quickOrder-row"));
    console.log(order);
  
});