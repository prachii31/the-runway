import { createContext, useContext, useEffect, useReducer, useState } from "react";

const ShopContext = createContext();

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  cart: readStorage("cart", []),
  wishlist: readStorage("wishlist", [])
};

function shopReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const found = state.cart.find(
        item => item.id === action.product.id && item.size === action.size && item.color === action.color
      );
      const cart = found
        ? state.cart.map(item =>
            item.id === action.product.id && item.size === action.size && item.color === action.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.product, size: action.size, color: action.color, quantity: 1 }];
      return { ...state, cart };
    }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map(item => item.id === action.id && item.size === action.size && item.color === action.color
            ? { ...item, quantity: item.quantity + action.change }
            : item)
          .filter(item => item.quantity > 0)
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => !(item.id === action.id && item.size === action.size && item.color === action.color)) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some(item => item.id === action.product.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter(item => item.id !== action.product.id)
          : [...state.wishlist, action.product]
      };
    }
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter(item => item.id !== action.id) };
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  function notify(message, type = "success") {
    setToast({ message, type, id: Date.now() });
  }

  const value = {
    cart: state.cart,
    wishlist: state.wishlist,
    toast,
    notify,
    dismissToast: () => setToast(null),
    addToCart: (product, size, color = product.color) => {
      dispatch({ type: "ADD_TO_CART", product, size, color });
      notify(`${product.name} added to cart`);
    },
    updateQuantity: (item, change) => dispatch({ type: "UPDATE_QUANTITY", id: item.id, size: item.size, color: item.color, change }),
    removeFromCart: item => dispatch({ type: "REMOVE_FROM_CART", id: item.id, size: item.size, color: item.color }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleWishlist: product => {
      const exists = state.wishlist.some(item => item.id === product.id);
      dispatch({ type: "TOGGLE_WISHLIST", product });
      notify(exists ? "Removed from wishlist" : "Added to wishlist");
    },
    removeFromWishlist: id => dispatch({ type: "REMOVE_FROM_WISHLIST", id })
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
