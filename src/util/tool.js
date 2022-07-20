// layout
import { getMenu } from '../api/menu';
import {AppstoreOutlined,DesktopOutlined,NodeIndexOutlined} from '@ant-design/icons';
export const getItem=(label, key, icon, children)=>{
    return {
      key,
      icon,
      children,
      label,
    };
}
export const menuIcon = {
    "":<AppstoreOutlined />,
    "data":<DesktopOutlined />,
    "resource":<NodeIndexOutlined />,
}
export const getItems = async ()=>{
    const username = localStorage.getItem('name')||''
    console.log(username)
    if(username){
      console.log(username,'1111')
      const menu = await getMenu()
      console.log(menu)
      const menus=menu['menu'].map((item) => {
        if(item.children.length>0){
          return getItem(item.label,item.key,menuIcon[item.key],item.children)
        }else{
          return getItem(item.label,item.key,menuIcon[item.key])
        }
        
      })
      console.log(menus)
      return menus
      
      
    }else{
      console.log('......')
      return []

      
    }
  }