<?php
    header('Content-Type:text/plain; charset=utf-8');

    //(1) 전송된 파일데이터는 임시저장소에 있는 이 php에는 파일정보를 가진 택배송장 데이터만 전달되어 옴
    $file= $_FILES['img'];  //JS에서 FormData객체에 파일을 .append()할 때 지정한 식별자 'img'

    // 파일이 올바로 전송되어 왔는지 확인하기 위해 파일정보 응답해보기 - $file은 배열
    $fileName= $file['name'];     //원본파일명
    $fileSize= $file['size'];     //파일사이즈
    $fileType= $file['type'];     //파일타입
    $tempName= $file['tmp_name']; //임시저장소 경로

    echo "$fileName \n";
    echo "$fileSize \n";
    echo "$fileType \n";
    echo "$tempName \n";

    $dstName= 'IMG' . date('YmdHis') . $fileName;
    move_uploaded_file($tempName, $dstName);
?>