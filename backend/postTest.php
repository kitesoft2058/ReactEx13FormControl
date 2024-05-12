<?php
    header('Content-Type:text/plain; charset=utf-8');

    //(1) PHP는 사용자가 보낸 json body를 파일로 받기에 이를 읽어오기
    $jsonData= file_get_contents('php://input'); 

    echo "요청 하신 데이터 : $jsonData \n\n";

    //(2) json parsing --> associate array
    $data= json_decode($jsonData, true); //true : 연관배열로 만들어 줄지 여부
    $gender= $data['gender'];
    $fruits= $data['fruits']; //결과 배열..
    $brand= $data['brand'];
    $content= $data['content'];

    echo "gender : $gender\n";
    echo "fruits : $fruits\n"; //배열을 그냥 출력하면? Array 라고 출력됨
    echo "brand : $brand\n";
    echo "content : $content\n";
?>