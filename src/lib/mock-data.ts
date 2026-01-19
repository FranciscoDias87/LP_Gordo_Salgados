export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Coxinha de Frango",
    category: "Fritos",
    price: 5.50,
    status: 'active'
  },
  {
    id: 2,
    name: "Esfiha de Carne",
    category: "Assados",
    price: 6.00,
    status: 'active'
  },
  {
    id: 3,
    name: "Kibe com Queijo",
    category: "Fritos",
    price: 6.50,
    status: 'inactive'
  }
];