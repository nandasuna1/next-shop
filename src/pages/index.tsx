import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react'
import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import c1 from '../assets/c1.png'
import c2 from '../assets/c2.png'
import c3 from '../assets/c3.png'
import { stripe } from '../lib/stripe';
import { GetServerSideProps, GetStaticProps } from 'next';
import Stripe from 'stripe';

interface HomeProps {
    products : {
        id: string,
        name: string,
        imageUrl: string,
        price: number
    }[]
}
export default function Home({products}: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides : {
            perView: 3,
            spacing: 48
        }
    })
    return(
        <HomeContainer ref={sliderRef} className='keen-slider'>
            {products?.map(product => {
                return(
                    <Product className='keen-slider__slide' key={product.id}>
                    <Image alt='Camiseta 1' src={c1} width={480} height={520}/>
                    <footer>
                        <strong>{product.name}</strong>
                        <span>{(product.price)/100}</span>
                    </footer>
                </Product>
            )}) }

        </HomeContainer>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    
    const products = response.data.map(product => {
        const productPrice = product.default_price as Stripe.Price
        const uAmount = productPrice.unit_amount ? productPrice.unit_amount/100 : 0
        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            // price: new Intl.NumberFormat('pt-BR', {
            //     style: 'currency',
            //     currency: 'BRL'
            // }).format(uAmount)
            price: productPrice.unit_amount
        }
    })

    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2
    }
}