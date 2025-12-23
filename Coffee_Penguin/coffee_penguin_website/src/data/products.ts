// Static product data from Suzuri shop
// This data is manually curated to ensure reliability and fast loading

export interface Product {
  id: number
  title: string
  itemName: string
  price: number
  imageUrl: string
  url: string
  rank?: number
}

export const featuredProducts: Product[] = [
  {
    id: 18491045,
    title: "Coffee Penguin's Logo パーカー",
    itemName: "パーカー",
    price: 5594,
    imageUrl: "/images/products/hoodie-black.webp",
    url: "https://suzuri.jp/CoffeePenguin/products",
    rank: 1,
  },
  {
    id: 18491044,
    title: "Coffee Penguin's Logo ロングスリーブTシャツ",
    itemName: "ロングスリーブTシャツ",
    price: 4395,
    imageUrl: "/images/products/mocha-sitting.png",
    url: "https://suzuri.jp/CoffeePenguin/products",
    rank: 2,
  },
  {
    id: 18491043,
    title: "Coffee Penguin's Logo オーバーサイズTシャツ",
    itemName: "オーバーサイズTシャツ",
    price: 5280,
    imageUrl: "/images/products/mocha-profile.png",
    url: "https://suzuri.jp/CoffeePenguin/products",
    rank: 3,
  },
  {
    id: 18491042,
    title: "Coffee Penguin's Logo ヘビーウェイトTシャツ",
    itemName: "ヘビーウェイトTシャツ",
    price: 4690,
    imageUrl: "/images/products/mocha-waving.png",
    url: "https://suzuri.jp/CoffeePenguin/products",
    rank: 4,
  },
]

export const shopUrl = "https://suzuri.jp/CoffeePenguin"
