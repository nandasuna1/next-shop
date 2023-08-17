import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetail } from "@/src/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
    }
}
export default function Product({product} : ProductProps) {
    const {isFallback} = useRouter()
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

    async function handleBuyProduct() {        
        try {
            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })
            
            const { checkoutUrl } = response.data
            window.location.href = checkoutUrl.url
        } catch(e) {
            setIsCreatingCheckoutSession(false)
            // conectar com ferramenta de observabilidade
            console.log('error', e);
            
            alert('Falha ao redirecionar ao checkout')
        }
    }
    
    if(isFallback) return (<div>Loading...</div>)

    return(
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="" width={520} height={480}/>
            </ImageContainer>
            <ProductDetail>
                <h1>{product.name}</h1>
                <strong>{product.price}</strong>

                <p>
                    {product.description}
                </p>

                <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                    Comprar agora
                </button>
            </ProductDetail>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: { id:'prod_OPk8Vc9FFEHjay' }}
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    const uAmount = price.unit_amount ? Number(price.unit_amount)/100 : 0

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(uAmount),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        // revalidate: 60 * 60 * 1 //1 hour
    }
}