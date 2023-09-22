import { useContext, useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";
import { SiteContext}  from "../../store/site-context";
import GoBack from "../../components/goBack";
import { Size } from "../../types/enums";
import { useScreenWidth } from "../../utils/hooks";

const InvoiceBody: React.FC<{close:any; animation: boolean}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const [headerHeight, setHeaderHeight] = useState('')
  const [headerWidth, setHeaderWidth] = useState('')
  const [invoiceWidth, setInvoiceWidth] = useState(0)
  const screenWidth = useScreenWidth()
  
  useEffect(()=>{
    const appHeaderHeight = document.getElementById('appHeader')!.clientHeight;
    const appHeaderWidth = document.getElementById('appHeader')!.clientWidth;
    setHeaderHeight(screenWidth < Size.desktopBreakpoint ? appHeaderHeight+'px' : '0px')
    setHeaderWidth(screenWidth > Size.desktopBreakpoint ? appHeaderWidth+'px' : '0px' )
    setInvoiceWidth(screenWidth < Size.desktopBreakpoint ? 616 : 639 +  appHeaderWidth)
  },[screenWidth])

  return (
    <div style={{'marginTop':headerHeight, 'paddingLeft': headerWidth, 'maxWidth': invoiceWidth+'px'}} className={`${styles.invoice} ${setThemeStyles("backgroundSeven")} ${props.animation ? styles.animationIn : styles.animationOut}`}>
      <div className={styles.section} id='invoiceHeader'>
        <GoBack onClick={props.close}/>
        <h2 className={`${styles.header} ${setThemeStyles("textOne")}`}>New Invoice</h2>
      </div>
      <InvoiceForm close={props.close}/>
    </div>
  );
};

export default InvoiceBody;
