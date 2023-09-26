import Toolbar from "../../components/toolbar/Toolbar";
import CustomButton from "../../components/UI/customButton/CustomButton";
import CardList from "../../components/сardList/CardList";
import { useSidebarContext, SidebarContextType } from "../../context/SidebarContext";
import css from './Home.module.sass'
import WrapPagination from "./WrapPagination";
import WrapSearch from "./WrapSearch";


const Home = () => {


  const { setSidebarOpen } = useSidebarContext() as SidebarContextType;



  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <Toolbar />
      </div>
      <div className={css.content}>
        <div className={css.toolbar__btn}>
          <CustomButton onClick={() => setSidebarOpen(true)}>
            Sidebar
          </CustomButton>
        </div>
        <div className={css.topButton}>
          <WrapSearch />

        </div>
        <CardList />
        <div>
          <WrapPagination />
        </div>
      </div>
    </div >
  )
}

export default Home
