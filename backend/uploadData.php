<?php
    header('Content-Type:text/plain; charset=utf-8');

    //(1) POST 글씨 데이터 받기
    $nickname= $_POST['nickname'];
    echo "닉네임 : $nickname \n\n"; 

    //(2) 전송된 파일데이터는 임시저장소에 있는 이 php에는 파일정보를 가진 택배송장 데이터만 전달되어 옴
    $files= $_FILES['imgs'];  //JS에서 FormData객체에 파일을 .append()할 때 지정한 식별자 'imgs'

    // 파일이 올바로 전송되어 왔는지 확인하기 위해 파일정보 응답해보기 - $files은 배열
    //echo count( $files) . "\n";  //5개
    //echo $files['name'] . "\n";  //Array..
    
    // 여러개의 파일을 보냈을 수도 있기에..파일 개수 구하기
    $file_num= count( $files['name'] );
    echo "전송된 파일 개수 : " . $file_num . "\n";
    echo "================================\n";

    //파일 개수만큼 반복하여 파일정보 응답...
    for($i=0; $i<$file_num; $i++){
        $fileName= $files['name'][$i];     //원본파일명
        $fileSize= $files['size'][$i];     //파일사이즈
        $fileType= $files['type'][$i];     //파일타입
        $tempName= $files['tmp_name'][$i]; //임시저장소 경로

        echo "$fileName \n";
        echo "$fileSize \n";
        echo "$fileType \n";
        echo "$tempName \n";
        echo "-----------------------\n";
    }
    
?>