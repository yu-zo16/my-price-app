"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  const addProduct = async () => {
    const res = await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) }),
    });

    const newProduct = await res.json();
    if (res.ok) {
      setProducts([...products, ...newProduct]);
      setName("");
      setPrice("");
    } else {
      alert(newProduct.error);
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch("/api/test", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert(result.error);
    }
  };

  const updateProduct = async () => {
    const res = await fetch("/api/test", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(editId), name: editName, price: Number(editPrice) }),
    });

    const updatedProduct = await res.json();
    if (res.ok) {
      setProducts(products.map((p) => (p.id === Number(editId) ? { ...p, name: editName, price: Number(editPrice) } : p)));
      setEditId(null);
      setEditName("");
      setEditPrice("");
    } else {
      alert(updatedProduct.error);
    }
  };

  return (
    <div>
      <h1>商品一覧</h1>
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}円
            <button onClick={() => deleteProduct(product.id)}>削除</button>
            <button onClick={() => {
              setEditId(product.id);
              setEditName(product.name);
              setEditPrice(product.price);
            }}>編集</button>
          </li>
        ))}
      </ul>

      <h2>商品を追加</h2>
      <input
        type="text"
        placeholder="商品名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="価格"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>追加</button>

      {editId && (
        <div>
          <h2>商品を編集</h2>
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
          <button onClick={updateProduct}>更新</button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      )}
    </div>
  );
}
