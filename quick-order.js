var dataset = [
  {
    "itemNo": "4125789",
    "qty": 10,
    "unitPrice": 3.55,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "7546985",
    "qty": 1,
    "unitPrice": 6.00,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  }
]

var ajaxDataset = [
  {
    "itemNo": "4125789",
    "qty": 1,
    "unitPrice": 3.55,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "7546985",
    "qty": 1,
    "unitPrice": 6.00,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "4125781",
    "qty": 1,
    "unitPrice": 4.55,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "7546981",
    "qty": 1,
    "unitPrice": 6.00,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "4125782",
    "qty": 1,
    "unitPrice": 7.55,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  },
  {
    "itemNo": "7546982",
    "qty": 1,
    "unitPrice": 9.00,
    "currency": "$",
    "link": "#",
    "description": "Caster, Medium Duty Stainless Steel Swivel Stem, Non-Brake, 5\" Wheel Diameter"
  }
]

function GetValidDataset(){
  var renderedLinesItemNos = [];
  document.querySelectorAll(".itemNoContainer input").forEach(function(el){
    renderedLinesItemNos.push(el.value);
  });  
  return dataset.filter(function(o){return renderedLinesItemNos.includes(o.itemNo)},[]);
}
function renderDataset(arr, addNewLine) {
  document.querySelector(".quickOrder-list").innerHTML = "";
  if (addNewLine === false) {    
    arr.map(function(o){
      document.querySelector(".quickOrder-list").insertAdjacentHTML('beforeend',renderQuickOrderLine(o));
    });    
  } else {   
    arr.map(function(o){
      document.querySelector(".quickOrder-list").insertAdjacentHTML('beforeend',renderQuickOrderLine(o));
    });
    document.querySelector(".quickOrder-list").insertAdjacentHTML('beforeend',renderQuickOrderLine());    
  } 

  //Events on Render Dataset

  //Render suggestions
  document.querySelectorAll(".quickOrder-list .itemNoContainer input").forEach(function(el) {
    el.addEventListener("keyup", function(e){      
      if (e.keyCode !== 9) {     
        // var isInAjaxDataset = ajaxDataset.filter(function(o){
        //   return o.itemNo === e.currentTarget.value;
        // }).length > 0;
        // if (isInAjaxDataset)
        // console.log(e.currentTarget.closest(".quickOrder-row").index());      
        renderSuggestions(e);
        renderTotal();
      } 
    });
    // el.addEventListener("focusout", function(e){ 
    //     if(document.querySelector("#suggestionBox") !== null) {
    //       document.querySelector("#suggestionBox").remove();
    //     }
    // });
  });
  // document.querySelectorAll(".quickOrder-list .itemNoContainer input").forEach(function(el) {
  //   el.addEventListener("focusin", function(e){      
  //     if (e.keyCode !== 9) {
  //       var isInAjaxDataset = ajaxDataset.filter(function(o){
  //         return o.itemNo === e.currentTarget.value;
  //       }).length > 0;
  //       console.log(isInAjaxDataset);       
  //     }
  //   });
  // });

  //Quantity Event -- Change
  document.querySelectorAll(".quickOrder-list .quantityContainer input").forEach(function(el) {
    el.addEventListener("change", function(e){
        //verifies if itemNo is invalid on line
        var itemNo = e.currentTarget.closest(".quickOrder-row").querySelector(".itemNoContainer input").value;        
        if (dataset.filter(function(o){return o.itemNo === itemNo}).length > 0) {
          // var value = parseFloat(e.currentTarget.value);
          // //updates dataset
          // dataset = [].concat(dataset.reduce(function(r,v,i){
          //   if (v.itemNo === itemNo) {
          //     v.qty = value;
          //   }
          //   r.push(v);
          //   return r;
          // },[]));  
          // var shouldRerenderWithNewLine = inputCollection.indexOf(e.currentTarget) !== inputCollection.length -1; 
          var indexOfNextInputToBeFocused = inputCollection.indexOf(e.currentTarget) + 1;                   
          // renderDataset(dataset,false);          
          inputCollection[indexOfNextInputToBeFocused].focus(); 
        }
    });
  });

  //deletes line
  document.querySelectorAll(".fa-trash-o").forEach(function(el) {
    el.addEventListener("click", function(e){
      var itemNo = e.currentTarget.closest(".quickOrder-row").querySelector(".itemNoContainer input").value;  
      dataset = [].concat(dataset.reduce(function(r,v,i){
        if (v.itemNo !== itemNo) {
          r.push(v);  
        }
        return r;
      },[]));  
      var shouldRerenderWithNewLine = inputCollection.indexOf(e.currentTarget.closest(".quickOrder-row").querySelector(".quantityContainer input")) !== inputCollection.length -1;    
      renderDataset(dataset,shouldRerenderWithNewLine);   
    });
  });

  calculateInputCollection(); 
  renderTotal();
}

function renderQuickOrderLine(o) {
  var output = "";
  if (o !== undefined) {   
    output += '<div class="quickOrder-row">';
    output += '<div class="row">';
    output += '<div class="col-xs-2 itemNoContainer"><input type="text" class="form-control" value="'+ o.itemNo +'"/></div>';                  
    output += '<div class="col-xs-1 quantityContainer"><input type="text" class="form-control" value="'+ o.qty +'"/></div>';
    output += '<div class="col-xs-4 description"><a href="'+o.link+'">'+o.description+'</a></div>';
    output += '<div class="col-xs-2 unitPrice">'+ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(o.unitPrice)+'</div>';
    output += '<div class="col-xs-2 lineTotal">'+ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(o.unitPrice*o.qty)+'</div>';
    output += '<div class="col-xs-1 delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div>';
    output += '</div>';
    output += '</div>';  
  } else {    
    output += '<div class="quickOrder-row">';
    output += '<div class="row">';
    output += '<div class="col-xs-2 itemNoContainer"><input type="text" class="form-control" value=""/></div>';                  
    output += '<div class="col-xs-1 quantityContainer"><input type="text" class="form-control" value="1"/></div>';
    output += '<div class="col-xs-4 description"></div>';
    output += '<div class="col-xs-2 unitPrice"></div>';
    output += '<div class="col-xs-2 lineTotal"></div>';
    output += '<div class="col-xs-1 delete"></div>';
    output += '</div>';
    output += '</div>';  
  }

  return output;
}

function getNodeIndex(node) {
  var index = 0;
  while ( (node = node.previousSibling) ) {
      if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
          index++;
      }
  }
  return index;
}

function renderTotal() {
  if(document.querySelector("#total") !== null) {
    document.querySelector("#total").remove();
  }
  var validDataset = GetValidDataset();
  var total = validDataset.reduce(function(r,v,k){
    r = r + v.qty*v.unitPrice;
    return r;
  },0);

  var output = "";
  output += '<div class="col-xs-12 bg-info text-right" id="total"><strong>Subtotal: '+ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total) +'</strong></div>';

  document.querySelector(".quickOrder-total").insertAdjacentHTML('beforeend',output);
}

function renderSuggestionBox(data, val) {  
  var alreadyFilledItemNumbers = [];
  document.querySelectorAll(".itemNoContainer input").forEach(function(el){ 
    alreadyFilledItemNumbers.push(el.value);  
  });     
  var output = "";
  output += '<div id="suggestionBox">';
  data.map(function(o){ 
    var isAlreadyInListClass = alreadyFilledItemNumbers.filter(function(val) {return val === o.itemNo}).length > 0 ? "disabled" : "";    
    output+= '<div class="suggestionLine '+ isAlreadyInListClass +'" data-itemNo="'+o.itemNo+'">'+o.itemNo+' - '+ o.description+' </div>'
  });
  output += '</div>';
  return output;
}

function registerEventsSuggestionBox() {
  document.querySelectorAll(".suggestionLine").forEach(function(el){
    el.addEventListener("click", function(e){
      var itemNo = e.currentTarget.attributes["data-itemNo"].value;
      if(!e.currentTarget.classList.contains("disabled")) {        
        var indexOfLine = getNodeIndex(e.currentTarget.closest(".quickOrder-row"));                    
        var indexOfQuantityToBeFocused = inputCollection.indexOf(e.currentTarget.closest(".quickOrder-row").querySelector(".quantityContainer input"));
        if(dataset[indexOfLine] === undefined) { //edit on new line                   
          dataset = dataset.concat(ajaxDataset.filter(function(o){return o.itemNo === itemNo})); 
          renderDataset(dataset, true);
        } else { //edit on already existing line
          dataset[indexOfLine] = ajaxDataset.filter(function(o){return o.itemNo === itemNo})[0];    
          renderDataset(dataset, true);                              
        }
        inputCollection[indexOfQuantityToBeFocused].focus();
        
      }
    });
  });
}

function renderSuggestions(e) {
  var val = e.currentTarget.value;  
  var nodeRow = e.currentTarget.closest(".quickOrder-row");
  nodeRow.querySelector(".quantityContainer input").value = 1;
  nodeRow.querySelector(".description").innerHTML = "";
  nodeRow.querySelector(".unitPrice").innerHTML = "";
  nodeRow.querySelector(".lineTotal").innerHTML = "";
  nodeRow.querySelector(".delete").innerHTML = "";  
  var data = ajaxDataset.filter(function(o) {return o.itemNo.includes(val)});  
  if(document.querySelector("#suggestionBox") !== null) {
    document.querySelector("#suggestionBox").remove();
  }
  if (data.length > 0) {    
    e.currentTarget.parentNode.insertAdjacentHTML('beforeend',renderSuggestionBox(data, val));
    registerEventsSuggestionBox()
  } 
}

function calculateInputCollection() {
  inputCollection = []; 
  document.querySelectorAll("input").forEach(function(el){ 
    inputCollection.push(el);  
  });   
}


//init
var inputCollection = [];
renderDataset(dataset, false);


document.querySelector("body").addEventListener("keyup", function(e){
  if (e.keyCode ===27) {
    if(document.querySelector("#suggestionBox") !== null) {
      document.querySelector("#suggestionBox").remove();
    }
  }
})

document.querySelector(".quickOrder-list").addEventListener("keydown", function(e){  
  var i = inputCollection.indexOf(e.target); 
  if (e.keyCode === 9) {
    e.preventDefault();    
    if (e.target.value === "" || (e.target.parentNode.classList.contains("itemNoContainer") && dataset.filter(function(o){return o.itemNo === e.target.value}).length === 0)) {
      new Noty({
        timeout: "2000",
        theme: 'relax',
        type: 'error',
        layout: 'center',
        text: 'Item number does not exist'
      }).show();
      e.target.parentNode.classList.add("has-error");
      return;
    } else {
      e.target.parentNode.classList.remove("has-error");
    }
   
    var itemNo = e.target.closest(".quickOrder-row").querySelector(".itemNoContainer input").value;      
    var lineIsValid = dataset.filter(function(o){return o.itemNo === itemNo}).length > 0;
    if(!e.target.parentNode.classList.contains("itemNoContainer")) {            
      if (lineIsValid) {       
        inputCollection[i+1].focus();            
      } else {
        new Noty({
          timeout: "2000",
          theme: 'relax',
          type: 'error',
          layout: 'center',
          text: 'Error appeared on the line. Item number is invalid !'
        }).show();
      } 
      
    } else {  
      //verifies if itemNo is invalid on line  
      if (lineIsValid) {
        renderDataset(dataset,true);     
        inputCollection[i+1].focus();
      } else {
        new Noty({
          timeout: "2000",
          theme: 'relax',
          type: 'error',
          layout: 'center',
          text: 'Error appeared on the line. Item number is invalid !'
        }).show();
      }        
    }
  } 
});

document.querySelector("#addAllLinesToCart").addEventListener("click", function(e){
  e.preventDefault();
  var validDataset = GetValidDataset(); //filters out invalid/incomplete itemNumbers  
  var itemsAddedToCart = validDataset.reduce(function(r,v,k){return r + " " +v.itemNo + " qty:" + v.qty + " | "},"");
  alert(itemsAddedToCart);
});