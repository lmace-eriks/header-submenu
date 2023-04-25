import React, { ReactChildren, useState, useRef, useEffect } from 'react';

// Styles
import styles from "./styles.css";

interface HeaderSubmenuProps {
  menuTitle: string
  menu: Array<menuObject>
  children: ReactChildren | any
  noPhotos: Boolean
}

interface menuObject {
  text: string
  image: string
  link: string
}

const loadingDirectLinkClass = "eriksbikeshop-headersubmenu-1-x-loadingDirectLink";
const spinnerSolo = `<svg class="eriksbikeshop-headersubmenu-1-x-spinner" width="50px" height="50px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2624 5.40607L13.8714 4.42848C13.6471 3.86771 13.104 3.5 12.5 3.5C11.896 3.5 11.3529 3.86771 11.1286 4.42848L10.7376 5.40607C10.5857 5.78585 10.2869 6.08826 9.90901 6.2448C9.53111 6.40133 9.10603 6.39874 8.73006 6.23761L7.76229 5.82285C7.20716 5.58494 6.56311 5.70897 6.13604 6.13604C5.70897 6.56311 5.58494 7.20716 5.82285 7.76229L6.23761 8.73006C6.39874 9.10602 6.40133 9.53111 6.2448 9.90901C6.08826 10.2869 5.78585 10.5857 5.40607 10.7376L4.42848 11.1286C3.86771 11.3529 3.5 11.896 3.5 12.5C3.5 13.104 3.86771 13.6471 4.42848 13.8714L5.40607 14.2624C5.78585 14.4143 6.08826 14.7131 6.2448 15.091C6.40133 15.4689 6.39874 15.894 6.23761 16.2699L5.82285 17.2377C5.58494 17.7928 5.70897 18.4369 6.13604 18.864C6.56311 19.291 7.20716 19.4151 7.76229 19.1772L8.73006 18.7624C9.10603 18.6013 9.53111 18.5987 9.90901 18.7552C10.2869 18.9117 10.5857 19.2141 10.7376 19.5939L11.1286 20.5715C11.3529 21.1323 11.896 21.5 12.5 21.5C13.104 21.5 13.6471 21.1323 13.8714 20.5715L14.2624 19.5939C14.4143 19.2141 14.7131 18.9117 15.091 18.7552C15.4689 18.5987 15.894 18.6013 16.2699 18.7624L17.2377 19.1771C17.7928 19.4151 18.4369 19.291 18.864 18.864C19.291 18.4369 19.4151 17.7928 19.1771 17.2377L18.7624 16.2699C18.6013 15.894 18.5987 15.4689 18.7552 15.091C18.9117 14.7131 19.2141 14.4143 19.5939 14.2624L20.5715 13.8714C21.1323 13.6471 21.5 13.104 21.5 12.5C21.5 11.896 21.1323 11.3529 20.5715 11.1286L19.5939 10.7376C19.2141 10.5857 18.9117 10.2869 18.7552 9.90901C18.5987 9.53111 18.6013 9.10602 18.7624 8.73006L19.1772 7.76229C19.4151 7.20716 19.291 6.56311 18.864 6.13604C18.4369 5.70897 17.7928 5.58494 17.2377 5.82285L16.2699 6.23761C15.894 6.39874 15.4689 6.40133 15.091 6.2448C14.7131 6.08826 14.4143 5.78585 14.2624 5.40607Z" stroke="#121923" stroke-width="1.2"/><path d="M16.5 12.5C16.5 14.7091 14.7091 16.5 12.5 16.5C10.2909 16.5 8.5 14.7091 8.5 12.5C8.5 10.2909 10.2909 8.5 12.5 8.5C14.7091 8.5 16.5 10.2909 16.5 12.5Z" stroke="#121923" stroke-width="1.2"/></svg>`;
const spinnerWithText = `${spinnerSolo}<div style="font-size: 0.8rem;">Loading...</div>`;

const HeaderSubmenu: StorefrontFunctionComponent<HeaderSubmenuProps> = ({ menu, menuTitle, children, noPhotos }) => {
  const openGate = useRef(true);
  const submenuNames = useRef<Array<string>>([]);
  const submenuImages = useRef<Array<string>>([]);
  const [finalMenuActive, setFinalMenuActive] = useState<Boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<any>();
  const [finalMenuImage, setFinalMenuImage] = useState<string>();
  const [gridOrBlock, setGridOrBlock] = useState<"grid" | "block">("grid");

  // Build Submenu Arrays once - LM
  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

    const tempNames: Array<string> = [];
    const tempImages: Array<string> = [];

    menu.forEach(item => {
      tempNames.push(item.text);
      tempImages.push(item.image);
    });

    submenuNames.current = tempNames;
    submenuImages.current = tempImages;
  });

  const handleClickSubmenu = (e: any) => {
    const clicked: number = e.currentTarget.dataset.submenucategory;
    const link: string = e.currentTarget.dataset.link;

    const hasLink = link !== "none" ? true : false;

    if (hasLink) {
      addSpinnerAndNavigate(link, e.currentTarget);
      return;
    }

    setActiveSubmenu(children[clicked]);
    setFinalMenuImage(menu[clicked].image);
    setFinalMenuActive(true);
    setGridOrBlock("block");
  }

  const addSpinnerAndNavigate = (link: string, target: any) => {
    target.classList.add(loadingDirectLinkClass);
    target.innerHTML = noPhotos ? spinnerSolo : spinnerWithText;
    // Timeout for Safari bug - LM
    setTimeout(() => { document.location.href = link }, 1);
  }

  const handleGoBack = () => {
    setGridOrBlock("grid");
    setFinalMenuActive(false);
  }

  const TextLayoutMenu = () => (<>
    {menu.map((menuItem, index) => (
      <button key={`submenuitem-${index}`} data-submenucategory={index} data-link={menuItem.link || "none"} onClick={handleClickSubmenu} className={styles.submenuCategoryNoPhotos}>
        <div className={styles.submenuCategoryTextNoPhotos}>{menuItem.text}</div>
      </button>
    ))}
  </>);

  const PhotosMenuLayout = () => (<>
    {menu.map((menuItem, index) => (
      <button key={`photo-${index}`} data-submenucategory={index} data-link={menuItem.link || "none"} onClick={handleClickSubmenu} className={styles.submenuCategory}>
        <div className={styles.submenuCategoryText}>
          {menuItem.text}
        </div>
        <img src={menuItem.image} alt="" className={styles.submenuCategoryImage} />
      </button>
    ))}
  </>);

  const FinalMenu = () => (
    <div className={styles.activeSubmenuContainer}>
      <div className={styles.backButtonAndImageContainer}>
        <img src={finalMenuImage} width={300} height={300} alt="" className={styles.activeSubmenuImage} />
        <button onClick={handleGoBack} className={styles.backToMainButton}>◀ All {menuTitle}</button>
      </div>
      {activeSubmenu}
    </div>
  );

  return (
    <nav className={noPhotos ? styles.submenuContainerNoPhotos : styles.submenuContainer} style={noPhotos ? { display: gridOrBlock } : {}}>
      {!finalMenuActive ? noPhotos ? <TextLayoutMenu /> : <PhotosMenuLayout /> : <></>}
      {finalMenuActive && <FinalMenu />}
    </nav>
  );
}

HeaderSubmenu.schema = {
  title: 'Desktop Sub Menu',
  description: 'editor.headersubmenu.description',
  type: 'object',
  properties: {
    menu: {
      title: "Menu List",
      type: "array",
      items: {
        properties: {
          __editorItemTitle: {
            title: "Site Editor Item Title",
            desciption: "Only visible in Site Editor.",
            type: "string",
          },
          text: {
            title: "Text",
            type: "string"
          },
          image: {
            title: "Image Source",
            description: "Absolute Path.",
            type: "string"
          },
          link: {
            title: "Link",
            description: "Only used if item has no sub menu.",
            type: "string"
          }
        }
      }
    }
  }
}

export default HeaderSubmenu;