'use strict';

const errMsg = '관리자에게 문의하세요';

//get Data
async function getApi(path) {
  const url = `${path}`;

  return fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

//메뉴 리스트 추출
function getData() {
  return getApi('data.json');
}

function getDataMenu() {
  getData().then((data) => {
    if (data.pages.length > 0) {

      let menuHtml = '';
      const menu = document.querySelector('.menu');

      //메뉴표시
      for (let i = 0; i < data.pages.length; i++) {  
        menuHtml += `
        <li id='home${i}'><a href="javascript:gotoPage(${i})">${data.pages[i].pagetitle}</a></li>
        `;
      }
      
      menu.innerHTML = menuHtml;
    }
  })

  gotoPage(0);
}

function gotoPage(pageno) {
  let menuItemHtml = '';
  const menuPage = document.querySelector('.main');  

  getData().then((data) => {
    if (data.pages.length > 0) {
      for (let i = 0; i < data.pages.length; i++) {
        document.getElementById(`home${i}`).setAttribute('class','');
      }

      //메뉴Item
      menuItemHtml += `
      <div id="pages" class="carousel">
      `;

      console.log(pageno);

      const items = data.pages[pageno].menus;

      for (let k = 0; k < items.length; k++) {
        menuItemHtml += `
          <div class="menus">
            <div class="menulist ${pageno}">
              <img class="menuImg" src="images/${items[k].img}" onclick="displayModal('${items[k].name}','${items[k].price}','${items[k].img}','${items[k].desc}')">
              <div class="menuInfo">
                <span class="menuName">${items[k].name}</span>
                <span class="menuPrice">${items[k].price}</span>
              </div>
            </div>
          </div>
        `;
      }

      menuItemHtml += `</div>`;
      menuPage.innerHTML = menuItemHtml;

      document.getElementById(`home${pageno}`).setAttribute('class','active');

      setSlick();
    }
  })

  // document.getElementById(`home${pageno}`).setAttribute('class','active');
  const page = document.getElementById('curPage').value;
  // document.querySelector(`.page${page}`).style.display = 'none';
  document.getElementById('curPage').value = pageno;
  // document.querySelector(`.page${pageno}`).style.display = 'block';
}

function setSlick() {
  var slickopts = {
    slidesToShow: 4,    /* 화면에 보여질 이미지 갯수 */
    slidesToScroll: 4,  /* 스크롤시 이동할 이미지 갯수 */
    //vertical:true,      /* 세로방향으로 슬라이드를 원하면 추가하기 */
    //infinite: true ,    /* 맨끝이미지에서 끝나지 않고 다시 맨앞으로 이동 */ 
    //autoplay: true, /* 자동으로 다음이미지 보여주기 */
    dots : true,
    rows: 2, // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.	
    // prevArrow: $(".pp2"),
    // nextArrow: $(".nn2"),
    responsive: [
      { breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      { breakpoint: 776,
        settings: {
          slidesToShow: 1,
          rows: 1 // This doesn't appear to work in responsive (Mac/Chrome)
        }
      }]
  };

  $('.carousel').slick(slickopts);
}

getDataMenu();

function displayModal(name, price, img, desc) {
  document.querySelector('.modalImg').src = `images/${img}`;
  document.querySelector('.modalName').innerText = `${name}`;
  document.querySelector('.modalDesc').innerText = `${desc}`;
  document.querySelector('.modalPrice').innerText = `${price}`;
  document.querySelector('.modal').style.display = 'block';  
}

// getData().then((data) => {
//   let menuItemHtml = '';
//   const menuPage = document.querySelector('.main');
//   const currentPage = document.getElementById('curPage').value; 
  
//   if (data.pages.length > 0) {
//     //메뉴 & Item
//     for (let i = 0; i < data.pages.length; i++) {  
//       menuItemHtml = '';
//       menuItemHtml += `
//       <div id="pages" class="carousel${data.pages[i].pageno} page${data.pages[i].pageno}">
//       `;

//       const items = data.pages[i].menus;

//       for (let k = 0; k < items.length; k++) {
//         menuItemHtml += `
//           <div>
//             <div class="menulist ${data.pages[i].pageno}">
//               <img class="menuImg" src="images/${items[k].img}" onclick="displayModal('${items[k].name}','${items[k].price}','${items[k].img}','${items[k].desc}')">
//               <div class="menuInfo">
//                 <span class="menuName">${items[k].name}</span>
//                 <span class="menuPrice">${items[k].price}</span>
//               </div>
//             </div>
//           </div>
//         `;
//       }

//       menuItemHtml += '</div>';
//       menuPage.innerHTML += menuItemHtml;
//     }    
    
//     //메뉴 & Item
//     for (let i = 0; i < data.pages.length; i++) {  
//       const pages = document.querySelector(`.page${data.pages[i].pageno}`)

//       if (parseInt(currentPage) === data.pages[i].pageno) {
//         pages.style.display = 'block';
//       } else {
//         pages.style.display = 'none';
//       } 
//     }
//   } else {
//     alert(errMsg);
//   }  
// });
