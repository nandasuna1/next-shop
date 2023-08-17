import Link from "next/link";
import { ImaageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
    const homeLink = process.env.NEXT_URL
    return(
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

            <ImaageContainer>

            </ImaageContainer>

            <p>
                Uhuull<strong>Fernanda pinho</strong>,  sua <strong>Camiseta bonitona</strong> já está a caminho da sua casa
            </p>

            <Link href={`${homeLink}/`}>
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}