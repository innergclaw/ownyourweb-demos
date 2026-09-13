import test from 'node:test';import assert from 'node:assert/strict';import{MENU,subtotal,items,phone,orderText,smsLink}from'./menu.mjs';
const customer={name:'Demo Customer',phone:'202-555-0100',method:'Pickup',date:'2026-09-20',time:'6 PM',notes:''};
test('all eight prices match supplied flyer',()=>assert.deepEqual(MENU.map(m=>m.price),[1000,1200,1500,1000,1200,1200,1500,2500]));
test('quantities produce exact cents total',()=>assert.equal(subtotal({shrimp:2,snapper:1}),4500));
test('invalid quantities and unknown dishes are ignored',()=>assert.deepEqual(items({fake:1,chicken:-1,steak:21,shrimp:1.5}),[]));
test('pickup message contains exact items and no stale address',()=>{const text=orderText({chicken:2}, {...customer,address:'do not include'});assert.match(text,/2 x Chicken Alfredo @ \$10.00 = \$20.00/);assert.match(text,/Phone: \+12025550100/);assert.match(text,/Not confirmed/);assert.doesNotMatch(text,/do not include/);});
test('delivery address is required and included',()=>{assert.throws(()=>orderText({salmon:1},{...customer,method:'Delivery'}));assert.match(orderText({salmon:1},{...customer,method:'Delivery',address:'123 Example Street, Test City, 00000'}),/Delivery address: 123 Example Street/);});
test('recipient and encoded body are correct for Android and iOS',()=>{const text=orderText({mussels:1},customer);for(const ios of [true,false]){const link=smsLink(text,ios);assert.ok(link.startsWith('sms:+12676023346'+(ios?'&':'?')+'body='));assert.equal(decodeURIComponent(link.split('body=')[1]),text);}});
test('empty carts and invalid customer phone are rejected',()=>{assert.throws(()=>orderText({},customer));assert.throws(()=>orderText({chicken:1},{...customer,phone:'123'}));assert.equal(phone('(267) 602-3346'),'+12676023346');});
