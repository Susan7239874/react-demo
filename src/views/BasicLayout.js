import React,{useState,useEffect,useLayoutEffect} from 'react';
import { BackTop } from 'antd';
import { useViewport } from '../utils/viewportContext';
import styles from './BasicLayout.module.css'
import logo from './assets/logo-wb.png'
import rihgt from './assets/arrowright.png'
import down from './assets/arrowdown.png'
import search from './assets/search.png'
import {getToken} from "../api/server";
const BasicLayout = ({ children }) => {
    const { width } = useViewport();
    const breakpoint = 760;
    const [products,setProducts]=useState([])
    useEffect(()=>{
        document.body.scrollTop=0;                         //移动端
        document.documentElement.scrollTop=0;    //PC
        document.getElementById('root').scrollTop=0;                         //移动端
        const arr=[
            {
                imgurl:'https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/ac9c1a95786002d97903fc63ef036571/V/2/V207-2111-89653-00.jpg',
                name:'Black Frame Canvas',
                freeYn:false,
                newYn:true,
                tex:null
            },
            {
                imgurl:'https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/9303ccaf147f8bc217744ba0c842a805/V/2/V207-2131-89670-00.jpg',
                name:'Wood Frame ',
                freeYn:true,
                newYn:false,
                tex:'60cmx60cm Glitchy Floral 2 Sets'
            },
        ]
        let list=[]
        for(var i=0;i<20;i++){
            list=list.concat(arr)
        }
        setProducts(list)
    },[])
    const style = {
        height: 40,
        width: 50,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: 'rgba(92,183,231,0.99)',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight:'bold'
    };
    useLayoutEffect(()=>{
        console.log('哈哈哈哈')
   /*     async function getTokenFn(){
            const aToken = await getToken({
                "email": "apiuseremail@apiuseremail.com",
                "password": "123456"
            });
            localStorage.setItem('token',aToken.token)
        }
        getTokenFn();*/
    },[])
    return (
        <div style={{paddingTop:'1.95rem'}}>
            {/* 共享的布局部分 */}
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>
            <div className={styles.headerContaier}>
                <div className={`${styles.header} ${width>breakpoint?styles.pcheader:styles.mheader}`}>
                    <div className={styles.headerLeft}>
                        <span className={styles.hlbox}>SELL</span>
                        <span className={styles.hlbox}>SUPPLY</span>
                        <span className={styles.hlbox}>LEARN</span>
                        <span className={styles.hlbox}>SUPPORT</span>
                    </div>
                    {width>breakpoint&&<div className={styles.headerRight}>
                        <img src={logo} alt=""/>
                        <div className={styles.loginbtn}>LOG IN</div>
                        <div className={styles.startbtn}>GET STARTD<img src={rihgt} alt=""/></div>
                    </div>}
                </div>
                <div className={`${styles.headerFooter} ${width>breakpoint?styles.pchaderFooter:styles.mheaderFooter}`}>
                    {width>breakpoint&&<div className={styles.left}>
                       <div className={styles.menubtn}>CATEGORIES<img src={down} alt=''/></div>
                       <span className={styles.normalbtn}>New arrivals</span>
                       <span className={styles.normalbtn}>Promotions</span>
                   </div>}
                    <div className={styles.right}>
                        <img src={search} alt=""/>
                        <input type="text" placeholder="Search for products or suppliers..."/>
                    </div>
                </div>
            </div>
            <div className={styles.posterContainer}>
                <img src="https://m.360buyimg.com/babel/jfs/t1/175627/21/38868/124673/64dede52F2e4da216/9bf9fe056e0dde84.jpg" alt=""/>
            </div>

            {/* 嵌套子组件 */}
            {children}
        {/*    <nav>导航栏</nav>
             共享的布局部分
            <footer>页脚</footer>*/}

        </div>
    );
};

export default BasicLayout;