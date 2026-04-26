import { api } from "./axios";

export async function getCategories() {
  const res = await api.get("/categories");
  console.log(res);
  return res.data.data;
}
