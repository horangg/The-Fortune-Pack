export const getCardImageSrc = (englishName: string) => {
  let fileName = englishName;
  if (englishName === "The Hierophant") fileName = "The HiePophant";
  else if (englishName === "The Lovers") fileName = "The Lover";
  else if (englishName === "Judgment") fileName = "Judgement";
  return `${import.meta.env.BASE_URL}Card/${fileName}.jpg`;
};
