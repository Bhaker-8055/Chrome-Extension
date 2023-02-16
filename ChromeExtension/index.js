let myLeads = [];
const inputEL = document.getElementById('input-el');

const inputBtn = document.getElementById('input-btn');

const ulEl = document.getElementById('ul-el');

const deleteBtn = document.getElementById('delete-btn');

const tabBtn = document.getElementById('tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', function () {
    if(inputEL.value != ""){
        myLeads.push(inputEL.value);
    }
    inputEL.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
})

deleteBtn.addEventListener('dblclick', function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        if (url != myLeads[myLeads.length - 1]) {
            myLeads.push((tabs[0].url));
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
        }
        render(myLeads);
    });
})

function render(leads) {
    let listItems = "";
    let i = 0;
    for (i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target = '_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
            <button class="del-leads" id = "cross-leads">X</button>
        </li>`;
    }

    ulEl.innerHTML = listItems;

    let allCroxxBtns = document.querySelectorAll('.del-leads');
    for(let i = 0; i < allCroxxBtns.length; i++){
        allCroxxBtns[i].addEventListener('click', (e)=>{
            let arrEle = allCroxxBtns[i].parentElement;
            let anchorText = arrEle.firstElementChild.getAttribute('href');
            myLeads = myLeads.filter((lds) => {
                return (lds != anchorText);
            })
            localStorage.clear();
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            render(myLeads);
            console.log(myLeads);
        })
    }
}