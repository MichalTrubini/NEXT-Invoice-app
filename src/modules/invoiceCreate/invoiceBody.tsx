import { useContext, useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";
import SiteContext from "../../store/site-context";
import GoBack from "../../components/goBack";

const InvoiceBody: React.FC<{close:any; animation: boolean}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext);
  const [headerHeight, setHeaderHeight] = useState('')

  useEffect(()=>{
    const appHeaderHeight = document.getElementById('appHeader')!.clientHeight
    setHeaderHeight(appHeaderHeight+'px')
  },[])

  return (
    <div style={{'marginTop':headerHeight}} className={`${styles.invoice} ${setThemeStyles("backgroundSeven")} ${props.animation ? styles.animationIn : styles.animationOut}`}>
      <div className={styles.section} id='invoiceHeader'>
        <GoBack />
        <h2 className={`${styles.header} ${setThemeStyles("textOne")}`}>New Invoice</h2>
      </div>
      <InvoiceForm close={props.close}/>
    </div>
  );
};

export default InvoiceBody;
