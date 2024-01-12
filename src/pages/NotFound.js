// NotFound.js

import React from 'react';
import styled from 'styled-components';

// 스타일을 정의
const NotFoundContainer = styled.div`
  text-align: center;
  margin: 50px auto; /* 상하 50px, 좌우 가운데 정렬 */
  background-color: #f7f7f7; /* 배경색을 변경합니다. */
  padding: 20px; /* 내용과의 간격을 추가합니다. */
  border-radius: 10px; /* 모서리를 둥글게 만듭니다. */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과를 추가합니다. */
`;

const Heading2 = styled.h2`
  color: #333;
  font-family: 'Arial', sans-serif; /* 폰트를 변경합니다. */
`;

const Heading1 = styled.h1`
  font-size: 8em;
  color: #2D69C4;
  font-weight: 900;
  font-family: 'Impact', sans-serif; /* 폰트를 변경합니다. */
`;

const Paragraph = styled.p`
  color: #666;
  font-style: italic; /* 기울임꼴로 변경합니다. */
  font-size: 1.2em; /* 글자 크기를 변경합니다. */
`;

// 컴포넌트 정의
const NotFound = () => (
  <NotFoundContainer>
    <Heading2>Uh-oh! Page not found.</Heading2>
    <Heading1>404</Heading1>
    <Paragraph>We could not find the page you are looking for.</Paragraph>
  </NotFoundContainer>
);

export default NotFound;
