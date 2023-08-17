import { styled } from "..";

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: 40,

    maxWidth: 1180,
    margin: '0 auto'
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 548,
    height: 500,
    background: 'linear-gradient(188deg, #1ea483 0%, #7065d4 100%)',
    borderRadius: 8,
    padding: 1,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit:'cover'
    }
})

export const ProductDetail = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$gray300',
    },

    span: {
        marginTop: 4,
        display: 'block',
        fontSize: '$2xl',
        color: '$gray300'
    },

    p: {
        marginTop: 9,
        display: 'block',
        lineHeight: 1.6,
        color: '$gray300',
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        borderRadius: 10,
        color: '$white',
        padding: 16,
        cursor: 'pointer',

        fontWeight: 'bold',
        fontSize: '$md',

        '&:not(disabled):hover': {
            backgroundColor: '$green300'
        },

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed'
        }
    }
})