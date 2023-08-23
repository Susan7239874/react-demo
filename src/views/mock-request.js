import { sleep } from 'antd-mobile/es/utils/sleep'
import {v4 as uuidv4} from "uuid";

let count = 1
const total=200;
export async function mockRequest(page_no,limit) {
    if (count >= 10) {
        return {
            result:[ ],
            total_pages:total/limit,
            current_page:page_no,
            total:200,
            page_size:limit
        };
    }
    await sleep(2000)
    count++
    const arr=[
        {
            gallery:['https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/ac9c1a95786002d97903fc63ef036571/V/2/V207-2111-89653-00.jpg'],
            title:'Black Frame Canvas Black Frame Canvas Black Frame Canvas',
            freeYn:false,
            newYn:true,
            tex:null,
            website_url: "https://www.dropshipzone.com.au/artiss-4x-collins-dining-chairs-dark-grey.html",
        },
        {
            gallery:['https://cdn.dropshipzone.com.au/media/catalog/product/cache/1/small_image/190x/9303ccaf147f8bc217744ba0c842a805/V/2/V207-2131-89670-00.jpg'],
            title:'Wood Frame ',
            freeYn:true,
            newYn:false,
            tex:'60cmx60cm Glitchy Floral 2 Sets',
            website_url: "https://www.dropshipzone.com.au/artiss-4x-collins-dining-chairs-dark-grey.html",
        },
    ]
    let list=[]
    for(var i=0;i<limit/2;i++){
        list=list.concat(arr)
    }
    return {
        result:list,
        total_pages:total/limit,
        current_page:page_no,page_no,
        total:200,
        page_size:limit
    };

}