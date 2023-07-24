import { useEffect, useState } from "react";
import styles from "./BannerCarousel.module.css";

const banners = [
  'https://png.pngtree.com/background/20210711/original/pngtree-simple-food-delivery-meal-fashion-poster-background-yellow-back-picture-image_1084439.jpg',
  'https://img.freepik.com/premium-photo/set-colored-spices-bowls-herbs-black-stone-background-view-from-top-view_187166-26063.jpg?w=2000',
  'https://animalequality.org/app/uploads/2023/02/cropped-vegan-food-tablescape-table-vegetables-plant-based-1200x630-1.jpg',
  'https://static.vecteezy.com/system/resources/previews/002/076/177/original/food-delivery-banner-design-flat-design-online-order-vector.jpg'
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className={styles.imgContainer}>
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`BannerImg ${index}`}
          className={`${styles.carousel} ${
            index === current ? styles.active : index === prev ? styles.prev : ""
          }`}
        />
      ))}
    </div>
  );
};

export default BannerCarousel;
