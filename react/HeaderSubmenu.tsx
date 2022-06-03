import React, { ReactChildren } from 'react';
import { useEffect } from 'react';

// Styles
import styles from "./styles.css";

interface HeaderSubmenuProps {
  children: ReactChildren
}

const HeaderSubmenu: StorefrontFunctionComponent<HeaderSubmenuProps> = ({ }) => {

  useEffect(() => {
    console.clear();
  })

  return (
    <h5>Hello World!</h5>
  )
}

HeaderSubmenu.schema = {
  title: 'editor.headersubmenu.title',
  description: 'editor.headersubmenu.description',
  type: 'object',
  properties: {}
}

export default HeaderSubmenu;