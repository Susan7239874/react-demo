import { sleep } from 'antd-mobile/es/utils/sleep'
import {v4 as uuidv4} from "uuid";

let count = 1
const total=200;
export async function mockRequest(current,pageSize) {
    if (count >= 10) {
        return {
            count:count,
            data:[],
            total:200,
            size:pageSize
        };
    }
    await sleep(2000)
    count++
    const arr=[
        {
            imgurl:'https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/ac9c1a95786002d97903fc63ef036571/V/2/V207-2111-89653-00.jpg',
            name:'Black Frame Canvas Black Frame Canvas Black Frame Canvas',
            freeYn:false,
            newYn:true,
            tex:null,
            id:uuidv4()
        },
        {
            imgurl:'https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/9303ccaf147f8bc217744ba0c842a805/V/2/V207-2131-89670-00.jpg',
            name:'Wood Frame ',
            freeYn:true,
            newYn:false,
            tex:'60cmx60cm Glitchy Floral 2 Sets',
            id:uuidv4()
        },
    ]
    let list=[]
    for(var i=0;i<pageSize/2;i++){
        list=list.concat(arr)
    }
    return {
        count:count,
        data:list,
        total:200,
        size:pageSize
    };

}