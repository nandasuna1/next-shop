import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react'
import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from '../lib/stripe';
import { GetServerSideProps, GetStaticProps } from 'next';
import Stripe from 'stripe';
import Link from 'next/link';

interface HomeProps {
    products : {
        id: string,
        name: string,
        imageUrl: string,
        price: string
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
                    <Link 
                        href={`/product/${product.id}`}
                        key={product.id}
                        prefetch={false}
                        >
                        <Product
                            className='keen-slider__slide' 
                        >
                        <Image alt={product.name} src={product.imageUrl} width={480} height={520}/>
                        <footer>
                            <strong>{product.name}</strong>
                            <span>{(product.price)}</span>
                        </footer>
                        </Product> 
                    </Link>
                    
            )}) }

        </HomeContainer>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    
    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        const uAmount = price.unit_amount ? Number(price.unit_amount)/100 : 0

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(uAmount)
        }
    })

    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2
    }
}