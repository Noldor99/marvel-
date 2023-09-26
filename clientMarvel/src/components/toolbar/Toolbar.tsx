import css from './Toolbar.module.sass'
import React from 'react';
import Divider from '../UI/divider/Divider';
import WrapRange from './WrapRange';
import WrapMenuList from './WrapMenuList';
import WrapClearFilter from './WrapClearFilter';
import { useSidebarContext, SidebarContextType } from '../../context/SidebarContext';
import WrapSelect from './WrapSelect';


const Toolbar = () => {

  const { sidebarOpen, setSidebarOpen } = useSidebarContext() as SidebarContextType;

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 680) {
        setSidebarOpen(true);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [setSidebarOpen]);

  return (
    <div className={`${css.sidebar} ${sidebarOpen && css.sidebarOpen}`}>
      <div className={`${sidebarOpen && css.blur}`}
        onClick={() => setSidebarOpen((p) => !p)}
      />
      <p className={css.title}>Brands</p>
      <WrapMenuList />
      <Divider />
      <WrapRange />
      <Divider />
      <WrapClearFilter />
      <Divider />
      <WrapSelect />
    </div>
  )
}


export default Toolbar