import Header from '@/components/Header/Header';
import styles from '../styles/Index.module.css';
import SearchBar from '@/components/SearchBar/SearchBar';
import BannerCarousel from '@/components/BannerCarousel/BannerCarousel';

const Index = () => {
  return ( <div className={styles.container}>
      <Header />
      <SearchBar/>
      <BannerCarousel />
  </div> );
}
 
export default Index;