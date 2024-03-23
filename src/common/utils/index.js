export const post = async (url, body) => {
  try {
    const response = await fetch(url);
    const res = await response.json();
    return res;
  } catch (e) {
    console.error("Error:", e);
  }
};
