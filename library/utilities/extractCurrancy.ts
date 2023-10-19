export function extractCurrancy(element:any){
    const currancyEle = element.text().trim().slice(0,1);
    return currancyEle?currancyEle:"$";
}