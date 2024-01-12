import {useState,useEffect} from "react";
import { useRecoilState} from 'recoil';
import styled, {keyframes,css} from 'styled-components';
import { deleteOrderState,deleteTotalPriceState } from "../components/func/AtomData";
import { PayCompleteState } from "../recoil/atoms/ItemState";
import OrderPopup from "../popup/OrderPopup";

// fadeIn 애니메이션 키프레임
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const BtDiv = styled.div`
    height:80vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const OrderBt = styled.button`
    height:20%;
    width:20%;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 180%;
    font-weight: 800;
    border-radius: 0.6rem;
    background: #FFF;
    white-space: nowrap;
    color: #000000;

    // 애니메이션 적용
    opacity: 0;
    ${({ visible }) =>
        visible &&
        css`
            animation: ${fadeIn} 0.5s ease-in-out forwards;
        `}

    &:hover {
        background-color: #e0e0e0;
    }

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 768px) {
        width:25%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width:23%;
    }
    @media screen and (min-width: 1025px) {
        width:20%;
    }
`

function Kiosk(){
    const [orderModalOn, setOrderModalOn] = useState(false);
    // const [selectedTableId, setSelectedTableId] = useState(null);
    const [closeAllPopup,setCloseAllPopup] = useRecoilState(PayCompleteState)
    
    const deleteOrder = deleteOrderState()
    const deleteTotalPrice= deleteTotalPriceState()
    const openOrderPopup = () => {
        setOrderModalOn(true)
        document.body.style.overflow = "hidden";
    }
    const closeOrderPopup = () => {
        deleteOrder()
        deleteTotalPrice()
        setOrderModalOn(false)
        setCloseAllPopup(false)
        document.body.style.overflow = "unset"        
        // console.log("closeOrderPopup-tableId",tableId)
    }
    // 몇초 후에 주문하기 버튼이 나타나도록 설정
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsButtonVisible(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return(
        <BtDiv>
            <OrderBt type="button" onClick={(e) => { e.preventDefault(); openOrderPopup();}} visible={isButtonVisible} >주문하기</OrderBt>
            {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup} tableId={0}/>}
        </BtDiv>
    )
}
export default Kiosk