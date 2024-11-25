import {productService} from "@/services/productService";
import ProductItem from "@/app/(products)/product/components/ProductItem";

export default async function Product() {
    const res = await productService.getProduct();
    return (
        <div className="px-[100px]">
            <div className="grid grid-cols-3 gap-[10px]">
                {
                    res.data.map((post) => (
                        <ProductItem
                            product_id={post.id}
                            key={post.id}
                            img={post.preview_img_path}
                            title={post.name}
                            description={post.description}
                            stock={post.stock}
                            category={post.category.name}
                            price={post.price}
                        ></ProductItem>
                    ))
                }
            </div>
        </div>
    );
}
