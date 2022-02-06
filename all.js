//選取input欄位
const input = document.querySelector("#inputText");
//選取button
const  addBtn = document.querySelector(".btn_add");
//新增一個空陣列儲存資料
let data =[];

//button綁監聽點擊事件 點擊按鈕會新增待辦事項
addBtn.addEventListener("click", function addTodo(e){
  //新增物件
  let newToDo ={
    //要新增的待辦事項內容
    txt: input.value,
    
    //透過 new Date().getTime() 的方式來當成 id 使用
    id:new Date().getTime(),
    
    //是否打勾
    checked:""
  };  
  
  //防呆 為了避免沒有輸入文字也能新增待辦事項的情況發生
  if(newToDo.txt.trim() !== ""){
    //如果有輸入內容 newToDo的物件資料會塞進data陣列
    data.push(newToDo);
    //完成新增後 請輸入待辦事項的inpu欄位 會被清空
    input.value="";
  }else{
    alert("請輸入內容");
  }
  //更新資料
 updateList();
 
});

//資料初始化的函式

//選取到放資料的ul區塊
const list = document.querySelector(".list");

function render(newToDo){
  //新增一個空字串 會把forEach跑的內容放進去
  let str="";
  newToDo.forEach((item, index)=>{
     //將 todo 的 id 的值放到 data-id屬性內 id內的值是時間 所以每次新增的li都會有不同的id
    //將checked 埋在 input 標籤內 因為打勾時會出現checked 不打勾就沒有
    
        str += `<li data-id="${item.id}">
          <label class="checkbox" for="">
            <input type="checkbox" ${item.checked}/>
            <span>${item.txt}</span>
          </label>
          <a href="#" class="delete" data-num="${index}"></a>
        </li>`;
  })
  list.innerHTML = str; 
}


//刪除資料
list.addEventListener("click", function(e){
   let id = parseInt(e.target.closest("li").dataset.id);
  if(e.target.getAttribute("class") =="delete"){
    // 使用 findIndex() 搭配 id 來實作
    let deleteIndex = data.findIndex( item=> item.id == id);
       data.splice(deleteIndex,1);
       alert("刪除成功!"); 

  }else{
    data.forEach((item)=>{
       //確認data內的id是否和點擊到的id上的時間值相同
      if (item.id === id) {
       if(item.checked === "checked"){
          item.checked = "";
        }else{
          item.checked ="checked";
        }
      }
    });
  }
  //render(data);
    updateList();
});


//切換 tab
const tab = document.querySelector(".tab");
//tab的預設顯示是全部
let tabStatus = "all"; 
//tab 切換功能，更改部分 class，建議使用 classList。
tab.addEventListener("click", function(e){
//取出data-tab內的值
tabStatus = e.target.dataset.tab; 
//選取到tab區塊的li位置
const tabCheck = document.querySelectorAll(".tab li");

//點擊到的tab會新增上active
tabCheck.forEach(item =>{
  item.classList.remove('active');
})
  e.target.classList.add('active');
 updateList();
});

//切換完成或未完成

function updateList(){
  
  let showData =[]; 
  
  if (tabStatus === "all"){
    //如果是預設的全部狀態 showData陣列內的資料會和data陣列內的資料一致
    showData = data; 
  }else if (tabStatus === "undo"){
    //選到未完成 顯示未完成的項目
    showData = data.filter((item)=> item.checked === ""); 
  }else{
    showData = data.filter((item)=> item.checked === "checked");
  }
  //計算待完成數量
  let toDoItemNum = document.getElementById("toDoItemNum");
  //篩選出沒打勾的項目
  let dataLength = data.filter((item)=> item.checked ==="").length;
  toDoItemNum.textContent = dataLength;
  render(showData);
}
updateList(); 


//點擊清除已完成項目會刪掉全部已完成的資料 
//清除已完成項目後，也可以 render 出全部的內容，讓使用者知道有確實清除。
const deleteChecked = document.querySelector('.list_footer a');
deleteChecked.addEventListener("click", function(e){
   data = data.filter((item)=> item.checked !=="checked");
   render(data);
   updateList();  
    
});






