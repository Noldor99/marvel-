import React from 'react';
import { useSidebarContext, SidebarContextType } from '../../../../context/SidebarContext';
import WrapUserLink from './WrapUserLink';
import css from './DrawerAdmin.module.sass'
import Divider from '../../../UI/divider/Divider';
import MenuListLink from '../../../UI/menuListLink/MenuListLink';


const DrawerAdmin = () => {

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
      <ul>
        {[
          { label: 'Home', to: '/admin' },
          { label: 'AddBrand', to: 'addBrand' },
          { label: 'AddRole', to: 'AddRole' },
        ].map((item) => (
          <MenuListLink key={item.label}
            label={item.label}
            to={item.to}
          />
        ))
        }
      </ul>
      <Divider />
      <WrapUserLink />
    </div>
  )
}


export default DrawerAdmin