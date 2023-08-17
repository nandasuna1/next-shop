import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray300'
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: 16
    },

    a: {
        display: 'block',
        marginTop: 40,
        fontSize: '$lg',
        color: '$green500',

        '&:hover': {
            color: '$green300'
        }
    },

    

} )

export const ImaageContainer = styled('div', {
    width: '100%',
    maxWidth: 130,
    height: 145,
    borderRadius: 0,
    background: 'linear-gradient(188deg, #1ea483 0%, #7065d4 100%)',
    padding: 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    }


})