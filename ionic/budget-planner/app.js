const InReason = document.querySelector('#input-reason');
const InAmt = document.querySelector('#input-amt');
const addBtn = document.querySelector('#btn-add');
const clearBtn = document.querySelector('#btn-clear');
const expList = document.querySelector('#expenses-list');
const totExpOp = document.querySelector('#total-expenses');
const alertCtrl = document.querySelector('ion-alert-controller');

let totExp = 0;

const clear = () => {
    InReason.value = '';
    InAmt.value = '';
};

addBtn.addEventListener('click', async () => {
    const entReason = InReason.value;
    const entAmt = InAmt.value;
    
    if( entReason.trim().length <= 0 || entAmt <=0 || entAmt.trim().length <= 0 ) {
        // let alert = alertCtrl.create({
        //     message: 'Please enter valid data!', 
        //     header: 'Invalid inputs', 
        //     buttons: ['Okay']
        // });
        // alert.present();
        const alert = document.createElement('ion-alert');
        alert.header = 'Alert';
        alert.subHeader = 'Please enter valid data!';
        alert.message = 'Invalid inputs';
        alert.buttons = ['OK'];
    
        document.body.appendChild(alert);
        await alert.present();
        return;
    }
    console.log(entReason, entAmt);
    const newItem = document.createElement('ion-item');
    newItem.textContent = entReason + ' : $' + entAmt;
    expList.appendChild(newItem);

    totExp += +entAmt;
    totExpOp.textContent = totExp;

    clear();
});

clearBtn.addEventListener('click', clear);