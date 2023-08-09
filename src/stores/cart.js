
// pinia  本地购物车数据（未登陆状态）

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',()=>{
    // 1.定义state
    const cartList = ref([])

    // 2. 定义action同步异步函数
    // 添加购物车 （ 通过判断：传过来的商品对象中的 skuId 能否在 cartList 中找到）
    const addCart = ( goods ) => {
        // --已添加过此商品 - count+
        const item = cartList.value.find(( item ) => item.skuId === goods.skuId)
        if( item ){
            item.count += goods.count
        }
        // --未添加过 - 直接 push
        else{
            cartList.value.push(goods)
        }
        console.log("ccccc",cartList)
    }

    // 3.删除商品(关键：获取当前商品ID)
    const delCart = (skuId) => {
        cartList.value = cartList.value.filter(( item ) => item.skuId !== skuId )
    }

    // 4.计算属性
    const allCount = computed(() => cartList.value.reduce(( a, c ) => a + c.count , 0 ))
    const allPrice = computed(() => cartList.value.reduce(( a, c ) => a + c.count*c.price , 0 ))
    // const total = computed(() => {
    //     let count = 0;
    //     let price = 0;
    //     for(let i = 0; i < cartList.value.length; i++) {
    //         // 1.总数量
    //         count += cartList.value[i].count;
    //         // 2.总价
    //         price += cartList.value[i].price * cartList.value[i].count;
    //     }
    //     return { count, price } 
    // })

    // 5.单选功能 (单选框中 )
    const singleCheck = ( val, item ) => {
       // val: el-checkbox 单选框 返回 此项的勾选状态 布尔值
       // item: 当前商品
       // 通过skuId找到要要修改的那一项 然后把它的selected值 修改为 传过来的 val
       const ckeckItem = cartList.value.find((i) => i.skuId === item.skuId)
       ckeckItem.selected = val
    }

    // 6. 全选框功能
    // 单选决定全选：判断cartList中的每一项勾选状态都为true时 ，全选框才为true
    const cartAllCheck = computed(() => cartList.value.every((i) => i.selected === true))
    // 全选决定单选 ：cartList的每一项勾选状态 = 全选框状态
    const allCheck = (bool) => {
        cartList.value.forEach((i) => i.selected = bool)
    }

    return { cartList, allCount, allPrice, cartAllCheck, addCart, delCart, singleCheck, allCheck }
},
{ persist:true })  // 数据持久化