import {users, products, carts, orderHistory} from "../data/data";
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';


const resolvers = {
  Query: {
    getAllProduct: () => products,
    getCart: (_, {userId}) => carts.find(cart => userId == cart.userId),
    getOrderHistory: (_, {userId}) => orderHistory.find(history => userId == history.userId),
  },
  Mutation: {
    createUser: (_, {user: _user}) => {
      const id = uuidv4(); 
      const user = { 
        id: id, 
        name: _user.name, 
        address: _user.address, 
        email: _user.email, 
        password: _user.password, 
        role: _user.role
      }
      users.push(user);
      return user;
    },

    login: (parent, {email, password}) => {
      const { id, role } = users.find(user => email == user.email && password == user.password); 
      return jwt.sign(
        { role }, // payload
        "SECRET_KEY", // secret key
        { algorithm: "HS256", subject: id, expiresIn: "1d" }, // optional argument
      );
    },

    addProduct: (_, {product: _product}) => {
      const id = uuidv4(); 
      const product= {
        id: id,
        name: _product.name,
        description: _product.description,
        imageUrl: _product.imageUrl,
        price: _product.price,
        quantity: _product.quantity
      }
      products.push(product);
      return product;
    },
    updateProduct: (_, {product: _product}) => {
      const id = _product.id;
      const product = products.find(product => id == product.id);

      product.name = _product.name ?? product.name;
      product.description = _product.description ?? product.description;
      product.imageUrl = _product.imageUrl ?? product.imageUrl;
      product.price = _product.price ?? product.price;
      product.quantity = _product.quantity ?? product.quantity;

      return product;
    },

    deleteProduct: (_, {productId: _productId}) => {
      const index = products.findIndex(product => _productId == product.id);
      const isProductPresent = index != -1;
      if(isProductPresent) products.splice(index, 1);
      return isProductPresent;
    },

    addCartItem: (_, {userId: _userId, cartItem: _cartItem}) => {
      const userCart = carts.find(cart => _userId == cart.userId);
      const cartItem = {
        productId: _cartItem.productId,
        quantity: _cartItem.quantity
      }
      userCart.items.push(cartItem);
      return cartItem;
    },
    updateCartItem: (_, {userId: _userId, cartItem: _cartItem}) => {
      const userCart = carts.find(cart => _userId == cart.userId);
      const cartItem = userCart.items.find(item => _cartItem.productId == item.productId);
      cartItem.quantity = _cartItem.quantity ?? cartItem.quantity;
      return cartItem;
    },
    deleteCartItem: (_, {userId: _userId, productId: _productId}) => {
      const userCart = carts.find(cart => _userId == cart.userId);
      const index = userCart.items.findIndex(item => _productId == item.productId);
      const isCartPresent = index != -1;
      if(isCartPresent) userCart.items.splice(index, 1);
      return isCartPresent;
    },
    addOrderHistory: (_, {userId: _userId, history: _history}) => {
      const userOrderHistory = orderHistory.find(history => _userId == history.userId);
      const history = {
        date: _history.date,
        productId: _history.productId,
        quantity: _history.quantity
      };
      userOrderHistory.history.push(history);
      return history;
    }
  },
  CartItem: {
    product: (item) => products.find(product => item.productId == product.id)
  },
  OrderHistoryItem: {
    product: (item) => products.find(product => item.productId == product.id)
  }
};


export default resolvers;