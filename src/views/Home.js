import React,{useState,useEffect} from 'react';
import { useViewport } from '../utils/viewportContext';
import styles from './Home.module.css'
import Product from '../components/Product'
import { v4 as uuidv4 } from 'uuid';
import { InfiniteScroll, DotLoading  } from 'antd-mobile'
import { mockRequest } from './mock-request'
import { Dropdown, Space } from 'antd-mobile'
import { Button, } from 'antd';
import {ArrowDownOutlined} from '@ant-design/icons'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const Home = () => {
    const { width } = useViewport();
    const breakpoint = 760;
    const [products,setProducts]=useState([])
    const [pclist,setPcList]=useState([])
    const [current,setCurrent]=useState(1);
    const [pageSize,setSize]=useState(20)
    const [total]=useState(200)
    useEffect(()=>{
        async function initData() {
            const {data} = await mockRequest(current,pageSize)
            console.log('data:',data)
            setProducts(val => [...val, ...data])
            if(width>breakpoint){
                setPcList(data)
            }
        }
        initData();
    },[width])

    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const {data,total,size,count} = await mockRequest(current+1,pageSize)
        console.log('data:',data)
        setProducts(val => [...val, ...data])
        setHasMore(total>products?.length)
        setCurrent(count)
        setSize(size)
    }
    async function changePcData() {
        const {data} = await mockRequest(current,pageSize)
        console.log('data:',data)
        setProducts(val => [...val, ...data])
        setPcList([...data])
    }
    useEffect(()=>{
        console.log([current,pageSize])
        if(current===1&&pageSize===20){return;}
        if(total>products?.length){
            changePcData();
        }
    },[current,pageSize])
    // 更新页码
    const onChange = (page) => {
        if(page===current){return}
        setCurrent(page)
    };
    const onShowSizeChange=(size)=>{
        if(size===pageSize){return}
        setSize(size)
    }
    return <div className={styles.productsContainer}>
        {
            width>breakpoint? <div className={styles.pcproducts} >
                   <div className={styles.filderBox}>
                       <>
                       <Space className="site-button-ghost-wrapper" wrap>
                           <Button type="primary">
                               Synthesis
                           </Button>
                           <Button type="primary">Sales</Button>
                           <Button type="primary" icon={<ArrowDownOutlined />}>
                               Price
                           </Button>
                       </Space>
                       </>
                       <div >
                            <Space>
                               < Button type="link">All commodities:{total}</Button>
                                < Button type="link">{current}/{total/pageSize}</Button>
                            <Button type="primary" disabled={total===products?.length} ghost onClick={()=>{setCurrent(current+1)}}>Next Page</Button>
                            </Space>
                           </div>
                   </div>
                    {
                        pclist.length>0?pclist.map((item,idx)=>{
                            return <Product item={item}  key={uuidv4()}/>
                        }):<></>
                    }
                    <div style={{width:'98%',backgroundColor:'#fff',textAlign:'center',padding:'10px',marginBottom:'20px',boxSizing:'border-box'}}>
                        <Pagination
                            total={total}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            defaultPageSize={pageSize}
                            defaultCurrent={1}
                            onChange={onChange}
                            onShowSizeChange={onShowSizeChange}
                        />
                    </div>

            </div>:
                <>
                        <Dropdown>
                            <Dropdown.Item key='sorter' title='Sort' className="drownitem">
                                <div style={{ padding: 12 }}>
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item key='more' title='More Filder' className="drownitem">
                                <div style={{ padding: 12 }}>
                                    更多筛选内容
                                    <br />
                                    更多筛选内容
                                    <br />
                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                <div className={styles.mproducts}>
                    {
                        products.length>0?products.map((item)=>{
                            return <Product item={item} key={uuidv4()}/>
                        }):<></>
                    }

                </div>
                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                        <>
                            {hasMore ? (
                                <>
                                    <span>Loading</span>
                                    <DotLoading />
                                </>
                            ) : (
                                <span>--- Here is end…… ---</span>
                            )}
                        </>
                    </InfiniteScroll>
                </>
        }
    </div>;
};

export default Home;