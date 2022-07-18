import React, { ReactChildren } from 'react';
import { useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface HeaderSubmenuProps {
  menuTitle: string
  menu: Array<menuObject>
  children: ReactChildren
}

interface menuObject {
  text: string
  image: string
  summary: string
}

const HeaderSubmenu: StorefrontFunctionComponent<HeaderSubmenuProps> = ({ menu, menuTitle, children }) => {
  const [textSubmenuActive, setTextSubmenuActive] = useState<Boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<any>();
  const [activeSubmenuName, setActiveSubmenuName] = useState<string>();
  const [activeSummary, setActiveSummary] = useState<string>();
  const [activeImage, setActiveImage] = useState<string>();

  const submenuNames: Array<string> = [];
  const submenuImages: Array<string> = [];
  const submenuSummaries: Array<string> = [];

  menu.forEach(item => {
    submenuNames.push(item.text);
    submenuImages.push(item.image);
    submenuSummaries.push(item.summary);
  })


  useEffect(() => {
    console.log("Render");
  })

  const handleClick = (e: any) => {
    const clicked: number = e.currentTarget.dataset.submenucategory;

    // @ts-expect-error
    setActiveSubmenu(children[clicked]);
    setActiveImage(menu[clicked].image);
    setActiveSubmenuName(submenuNames[clicked]);
    setActiveSummary(submenuSummaries[clicked]);
    setTextSubmenuActive(true);
  }

  const handleGoBack = () => {
    setTextSubmenuActive(false);
  }

  return (
    <div className={styles.submenuContainer}>
      <nav className={styles.submenuWrapper}>
        {!textSubmenuActive &&
          menu.map((menuItem, index) => (
            <div role="button" data-submenuCategory={index} onClick={handleClick} className={styles.submenuCategory}>
              <div className={styles.submenuCategoryText}>{menuItem.text}</div>
              <img className={styles.submenuCategoryImage} src={menuItem.image} /></div>
          ))
        }
        {textSubmenuActive &&
          <div className={styles.activeSubmenuContainer}>
            <div className={styles.backButtonAndImageContainer}>
              <div onClick={handleGoBack} className={styles.backToMainButton}>◀ All {menuTitle}</div>
              <div className={styles.activeSubmenuImageContainer}>
                <img src={activeImage} className={styles.activeSubmenuImage} />
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.submenuName}>{activeSubmenu}</div>
            </div>
          </div>
        }
      </nav>
    </div>
  )
}

HeaderSubmenu.schema = {
  title: 'editor.headersubmenu.title',
  description: 'editor.headersubmenu.description',
  type: 'object',
  properties: {}
}

export default HeaderSubmenu;