export const CHEF_PHONE='+12676023346';
export const MENU=[
 {id:'shrimp',name:'Shrimp Alfredo',price:1000,category:'Seafood'},
 {id:'steak',name:'Steak Alfredo',price:1200,category:'Steak & chicken'},
 {id:'salmon',name:'Salmon Alfredo',price:1500,category:'Seafood'},
 {id:'chicken',name:'Chicken Alfredo',price:1000,category:'Steak & chicken'},
 {id:'mussels',name:'Mussels Alfredo',price:1200,category:'Seafood'},
 {id:'whiting',name:'Whiting Alfredo',price:1200,category:'Seafood'},
 {id:'porgy',name:'Porgy Alfredo',price:1500,category:'Seafood'},
 {id:'snapper',name:'Red Snapper Alfredo',price:2500,category:'Seafood'}
];
export const money=cents=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(cents/100);
export const items=cart=>MENU.filter(m=>Number.isInteger(cart[m.id])&&cart[m.id]>0&&cart[m.id]<=20).map(m=>({...m,qty:cart[m.id]}));
export const subtotal=cart=>items(cart).reduce((n,m)=>n+m.price*m.qty,0);
export function phone(value){const digits=value.replace(/\D/g,'');return digits.length===10?'+1'+digits:digits.length===11&&digits[0]==='1'?'+'+digits:null;}
const line=s=>String(s||'').replace(/[\r\n]+/g,' ').trim();
export function orderText(cart,customer){if(!items(cart).length)throw Error('Choose at least one item.');if(!line(customer.name)||!phone(customer.phone))throw Error('Enter a name and valid US phone number.');if(!['Pickup','Delivery'].includes(customer.method))throw Error('Choose pickup or delivery.');if(customer.method==='Delivery'&&!line(customer.address))throw Error('Add a delivery address.');return [
 'CHEF BOYR BEEF | ORDER REQUEST',
 'Not confirmed. Please confirm availability and final total.',
 '',`Requested date: ${line(customer.date)}`,`Requested time: ${line(customer.time)}`,
 `Name: ${line(customer.name)}`,`Phone: ${phone(customer.phone)}`,`Service: ${customer.method}`,
 customer.method==='Delivery'?`Delivery address: ${line(customer.address)}`:'Pickup location: please confirm with chef',
 '', 'ORDER',...items(cart).map(m=>`${m.qty} x ${m.name} @ ${money(m.price)} = ${money(m.qty*m.price)}`),
 '',`Menu subtotal: ${money(subtotal(cart))}`,'Tax / delivery fee / final total: chef to confirm',
 `Notes: ${line(customer.notes)||'None'}`,
 '', 'Please reply with availability, confirmed time, final total, and payment instructions.'
 ].join('\n');}
export const smsLink=(body,ios=false)=>`sms:${CHEF_PHONE}${ios?'&':'?'}body=${encodeURIComponent(body)}`;
