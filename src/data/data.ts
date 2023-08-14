// user
const users = [
  {
    id: "1",
    name: "sachin walunjakar",
    address: "bhosari, pune 411039.",
    email: "walunjakarsachin@gmail.com",
    password: "Passw0rd",
    role: "admin"
  },
  {
    id: "2",
    name: "admin user",
    address: "admin address",
    email: "admin@gmail.com",
    password: "Passw0rd",
    role: "user"
  },
  {
    id: "3",
    name: "allu arjun",
    email: "allu@gmail.com",
    password: "Allu@123",
    address: "karnatak",
    role: "user"
  },
]

// product
const products = [
  {
    id: "1",
    name: "macbook pro",
    description: "laptop with m1 chip",
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206?wid=640&hei=595&fmt=jpeg&qlt=95&.v=1664497359481",
    price: 110000,
    quantity: 20
  },
  {
    id: "2",
    name: "OnePlus USB 3.0 to Type-C OTG Cable Adapter",
    description: "New OnePlus USB 3.0 to Type-C OTG Cable Adapter Compatible with USB to c Type Converter Supporting All laptops, Mobile Smartphone and Other Type c Devices (White & Red)",
    imageUrl: "https://m.media-amazon.com/images/I/412FI6mFh2L._SY450_.jpg",
    price: 1499,
    quantity: 20
  },
  {
    id: "3",
    name: "Spinido",
    description: "Bestand Spinido for Magic Trackpad 2 MJ2R2LL/A and Apple Magic Keyboard MLA22LL/A (white)",
    imageUrl: "https://m.media-amazon.com/images/I/51V+6HWfI-L._SY355_.jpg",
    price: 1499,
    quantity: 21
  },
]


// cart
const carts = [
  {
    userId: "1",
    items: [
      {
        "productId": "1",
        "quantity": 1
      }
    ]
  },
  {
    userId: "2",
    items: [
      {
        "productId": "1",
        "quantity": 2
      },
      {
        "productId": "2",
        "quantity": 1
      },
      {
        "productId": "3",
        "quantity": 1
      }
    ]
  },
  {
    userId: "3",
    items: [
      {
        "productId": "1",
        "quantity": 1
      }
    ]
  }
]

const orderHistory = [
  {
    userId: "1",
    history: [
      {
        date: "2023-08-13T15:05:04.071Z",
        productId: "1",
        quantity: 2
      },
      {
        date: "2023-08-13T15:06:47.575Z",
        productId: "2",
        quantity: 4
      },
    ]
  },
  {
    userId: "2",
    history: [
      {
        date: "2023-08-08T15:08:16.194Z",
        productId: "1",
        quantity: 10
      },
      {
        date: "2023-08-03T15:08:36.970Z",
        productId: "2",
        quantity: 20
      },
    ]
  }
]


export {users, products, carts, orderHistory};
