Customers
[
    {
        firstName,
        lastName,
        avatar,
        email: { notifyMe, email },
        Pno: { notifyMe, Pno },
        state,
        city,
        area,
        username,
        password,
        queues: [
            {
                ticket: currTicket + queCount + 1,
                queId

                // position = (ticket - currTicket + 1) - (cancelledTickets[i] < ticket).length
            },
            {
                ticket,
                queId
            }
        ],
    }
]

ShopOwner
[
    {
        ownerName,
        avatar,
        username,
        password,
        shop: {
            shopImg,
            shopName,
            address,
            counters: [
                {
                    countNo,
                    queId,
                },
                {
                    countNo,
                    queId,
                },
            ],
            employees: [id, id, id]
        }
    }
]

Employees
[
    {
        id,
        avatar,
        name,
        email,
        username,
        password,
        shopId,
    }
]

Queues
[
    {
        id:
            shopId,
        shopName:
            counterNo,
        isOpen: true,
        queueCount: 0,
        firstTicket: 0,
        lastTicket: 0,
        cancelledTickets: [ticket, ticket]
    }
]