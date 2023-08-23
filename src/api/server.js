import request from '@/utils/request';
//
//查询数据资产趋势
export async function getToken(body) {
    return request({
        url: '/auth',
        method: 'POST',
        data:body
    });
}
//查询ID资产数据
export async function getProductList(params) {
    return request({
        url: '/products',
        method: 'GET',
        params
    });
}