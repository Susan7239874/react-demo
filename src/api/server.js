import request from '@/utils/request';
//
//查询数据资产趋势
export async function getToken() {
    return request({
        url: '/get/assenToken',
        method: 'GET',
    });
}
//查询ID资产数据
export async function getProductList(params) {
    return request({
        url: '/getProductList',
        method: 'GET',
        params
    });
}