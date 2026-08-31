export const getProductImage = (images: any[]): string => {
  if (!images || images.length === 0) {
    return "hero.png";
  }

  const first = images[0];

  // Seeded data (string)
  if (typeof first === "string") {
    return first;
  }

  // Cloudinary object
  if (typeof first === "object" && first.url) {
    return first.url;
  }

  return "/hero.png";
};
