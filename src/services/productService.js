import { get, del, post } from './service.js'

function getProduct(payload) {
    return get('/products');
}
function postOrder(payload) {
    return post('/order', payload)
}

export const productService = {
    getProduct,
    postOrder,
}