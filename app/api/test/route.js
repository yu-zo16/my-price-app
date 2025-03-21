import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Supabase fetch error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Fetched data:", data); // 取得したデータをログ出力

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const { name, price } = body;
    if (!name || !price) {
      return new Response(JSON.stringify({ error: "Missing name or price" }), { status: 400 });
    }

    const { data, error } = await supabase.from("products").insert([{ name, price }]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Inserted data:", data); // 追加されたデータをログ出力

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    console.log("Received delete request:", body);

    const { id } = body;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Deleted product with id:", id);
    return new Response(JSON.stringify({ message: "Deleted successfully", id }), { status: 200 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("Received update request:", body);

    const { id, name, price } = body;
    console.log("Type of id:", typeof id, "Value of id:", id);  // ✅ ID の型と値を確認！

    if (!id || !name || !price) {
      return new Response(JSON.stringify({ error: "Missing id, name, or price" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .update({ name, price })
      .eq("id", Number(id))  // ✅ `id` を確実に `INTEGER` に変換！
      .select();  // ✅ 更新後のデータを取得

    if (error) {
      console.error("Supabase update error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Updated product:", data);  // ✅ 更新後のデータを確認
    return new Response(JSON.stringify({ message: "Updated successfully", data }), { status: 200 });
  } catch (err) {
    console.error("PUT Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
