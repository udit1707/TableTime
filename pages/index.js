import Header from '@/components/Header/Header';
import styles from '../styles/Index.module.css';
import SearchBar from '@/components/SearchBar/SearchBar';

const Index = () => {
  return ( <div className={styles.container}>
      <Header />
      <SearchBar/>
  </div> );
}
 
export default Index;