"use server";

export const price = async () => {
  const response = await fetch("https://dummyjson.com/products");

  return response.json();
};
