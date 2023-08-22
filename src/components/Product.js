import React, {useState} from 'react';
import styles from './Product.module.css'
import {useViewport} from "../utils/viewportContext";

const Product = (props) => {
    const { width } = useViewport();
    const breakpoint = 760;
    const {item} = props;
    return <div className={`${styles.productBox} ${width>breakpoint?styles.pcproductBox:styles.mproductBox}`} >
        <div className={styles.innerBox} >
            <img src={item.imgurl} alt=""/>
            <div className={styles.name}>
                <p>{item.name}</p></div>
            <div className={styles.flag}>
                {item.newYn?<span className={styles.newbtn}>New</span>:<span className={styles.freebtn}>Free</span>}
                <span className={styles.morebtn}>More</span>
            </div>
        </div>

    </div>;
};

export default Product;