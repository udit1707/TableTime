import Header from "@/components/Header/Header";
import styles from "../styles/Index.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import BannerCarousel from "@/components/BannerCarousel/BannerCarousel";
import Outlets from "@/components/Outlets/Outlets";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BannerCarousel />
      <Outlets />
    </div>
  );
};

export default Index;
