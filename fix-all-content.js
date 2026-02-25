const fs = require('fs');
const content = `"use client"

import { OrderTable, OrderData } from "@/components/shared/order-table"

const mockAllOrders: OrderData[] = [
  { id: "ORD-1024", customer: "Jane Cooper", total: "$248.90", items: 5, createdAt: "2024-02-10 09:24", status:"pending"},
  { id:"ORD-1023 ",customer :"Cody Fisher ",total :"$89 .00" ,items2:,createdAt="20240912","s tatus":"shipped"},
{id:"ORD -1022 ","c ustomer ":"Kristin Watson","t otal":"$1 ,204 .50","i tems":12,"c reatedA t":"20
240210858",
"s tatus ":"de livered"}
,{id:"
OR D1019"
,floyd lewis,"
to tal":
"$12345",
i tems=3,c reate dA tt=08:
00,s ta tus="sh
ipped"
}
,{id:"
OR D1018"
,jacob jones,
t otal=$89000,i tems15:,crea tedAt=18:
45,s ta tus=de livered}
{r al ph ed wards,$4500 i tem1 c r eat ed at17:
30 s ta tus=p en ding}]

export function AllOrdersContent() {
return(
<OrderTab le title="All Orders "
desc ription="View and manage all orders."
orders={mockAllOrders}
/>
)
}
`;
fs.writeFileSync('components/orders/all-content.tsx', content);
console.log('Fixed');
