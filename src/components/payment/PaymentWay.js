import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import CardPopup from '../../popup/CardPopup';
import CashPopup from '../../popup/CashPopup';
import { PayPutApi } from '../../api/pay/PayPutApi';
import { PayCompleteState } from '../../recoil/atoms/ItemState';

const WayDiv = styled.div`
    width:100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;

`
const ButtonDiv = styled.div`
    width: 80%;
    height: 10%;
    margin: 1rem;
    background-color:gray;
    
    display: flex;
    justify-content: center;
    box-sizing: border-box; /* padding, border가 너비에 포함되도록 함 */
`
const Button = styled.button`
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
`
/* eslint-disable */
function PaymentWay({closePaymentPopup,tableId}) {

    const [cardPopupOn, setCardPopupOn] = useState(false);
    const [cashPopupOn, setCashPopupOn] = useState(false);
    const [closeAllPopup,setCloseAllPopup] = useRecoilState(PayCompleteState)
    
    const openCardPopup =() =>{
        setCardPopupOn(true);
        // 5초 후에 모달을 닫는 함수 호출
        setTimeout(() => {
            console.log("1-closeCardPopup")
            closeCardPopup();
        }, 1000);
    }
    const closeCardPopup =() =>{
        console.log("2-closePaymentPopup")
        setCardPopupOn(false)
        setCloseAllPopup(true)
        closePaymentPopup();        
    }
    const openCashPopup =() =>{
        setCashPopupOn(true)
    }
    const closeCashPopup =() =>{
        setCashPopupOn(false);
        console.log("=>=>paymentway closeAllPopup :", closeAllPopup)

        if(closeAllPopup){
            closePaymentPopup()
        }
        // closePaymentPopup();        
    }
    
    useEffect(() => {
        console.log("closeCashPopup closeAllPopup :", closeAllPopup)
        if(closeAllPopup){
            console.log("closeCashPopup closeAllPopup :", closeAllPopup)
            closePaymentPopup()
        }
    },[closeAllPopup]);

    // 결제
    const payPut = () =>{
        const data = {table_no:tableId}
        const dataPut = PayPutApi(data)

    }
    // useEffect(() =>{

    // },[cardPopupOn,cashPopupOn])
    return (
        <>
        <WayDiv>
            {/* 결제버튼-카드 */}
            <ButtonDiv>
            <Link to={`/order/${tableId}/payment/card`} onClick={(e) => { e.preventDefault(); openCardPopup(); payPut()}} style={{width:'100%', height:'100%',display: 'block'}}> 
                <Button type='button'>카드</Button>
                {/* <CardPopup/> */}
            </Link>          
            </ButtonDiv>
            {/* 결제버튼-현금 */}
            <ButtonDiv>
            <Link to={`/order/${tableId}/payment/cash`} onClick={(e) => { e.preventDefault(); openCashPopup(); }}style={{width:'100%', height:'100%',display: 'block'}}>
            <Button type='button'>현금</Button>
                {/* <CashPopup/> */}
            </Link>
            </ButtonDiv>
            {/* 결제버튼-간편결제 */}
            <ButtonDiv>
                <Button type='button'>간편결제</Button>
            </ButtonDiv>                  
        </WayDiv>
        {cardPopupOn && <CardPopup openCardPopup={openCardPopup} closeCardPopup={closeCardPopup}/>}        
        {cashPopupOn && <CashPopup openCashPopup={openCashPopup} closeCashPopup={closeCashPopup} tableId={tableId}/>} 
        </>
    );
};
export default PaymentWay;