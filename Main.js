import { useRef, useState, version } from "react"

const Main= ()=>{

    //(실습1 [1])에서 사용할 제목,메세지 state 변수만들기 HOOK
    const [title, setTitle]= useState('') //초기값 : ''
    const [message, setMessage]= useState('') //초기값 : ''

    //(실습1 [1])에서 사용할 input요소의 입력값 변경 이벤트 처리. 메소드
    const changeTitle= (event)=>{  //파라미터 event : 이벤트 콜백메소드로 지정된 함수는 이벤트객체를 파라미터로 전달 받음.
        // 변경되는 입력글씨 확인해보기
        console.log(event.target.value)
        // 제목 state 값 설정
        setTitle(event.target.value)
    }

    const changeMessage= (event)=>{
        // 메세지 state 값 설정
        setMessage(event.target.value)
    }

    //(실습1 [2])에서 추가할 onSubmit이벤트의 콜백지정 함수
    const submitGet= (event)=>{
        //(1) form 요소는 submit 이벤트가 발생하면 기본적으로 페이지 전환이 이루어짐. action속성이 명시적으로 없으면 현재 페이지를 새로고침함. 즉, 화면이 깜빡임. 이 기본동작을 막아야 함.
        event.preventDefault()

        //(2) submit 버튼 클릭했을 때 title, message 값 확인해보기
        //alert(title +" , "+ message) 

        //(3) ajax 로 서버 백엔드 프로그램에 데이터 보내기 - GET 방식으로 보내기
        // 먼저 JS의 XMLHttpRequest 생성자함수 이용해보기 [학습내용 검토용] 
        const xhr= new XMLHttpRequest()
        xhr.onreadystatechange= ()=>{
            if(xhr.readyState==4 && xhr.status==200){ //서버로부터 응답을 받았고(readyState:4) 응답결과 OK(status:200)
                alert( '응답결과 : ' + xhr.responseText )
            }
        }
        // [서버 URL : 보통 웹서버를 통해 웹앱을 배포할때 프로젝트폴더 안에 frontend | backend 폴더가 같은 호스팅 서버에 존재하기에 이를 고려하여 경로 지정]
        //       * 폴더구조 *  [프로젝트폴더]의 하위폴더에 [backend] 폴더를 만들고 REACT로 빌드된 정적 웹앱을 프로젝트폴더에 넣고 backend폴더에 php같은 파일을 위치하여 호스팅함. 
        // [경로 설명 './backend/getTest.php] index.html문서가 있는 폴더의 backend폴더 안의 php파일에 보내기!
        xhr.open('GET', './backend/getTest.php?title='+title+"&msg="+message)
        xhr.send()

        //(4) ajax 통신 동작은 웹서버에서만 가능하기에 리액트 웹앱을 배포하고 php백엔드 코드도 만들기
        // (4.1) 리액트 웹앱을 배포하기 위해 정적페이지로 build하기 [ $npm run build ] ~ 프로젝트 폴더에 build폴더가 새로생김 - 이 build폴더 안의 파일들을 서버에 업로드..[파일질라 FTP 이용]
        // (4.2) 호스팅 서버의 root 주소에 배포했다면.. 그냥 빌드하면 되지만 혹시 서브 폴더안에 배포하여 경로가 mrhi.dothome.co.kr/react/ex12 와 같이.. 서브경로가 존재한다면..package.json에 ["homepage": "http://mrhiandroid2024.dothome.co.kr/react/ex12-form"] 이런식의 경로를 등록해 줘야 함. ~ 등록하고 다시 build
        // (4.3) 프로젝트 root 위치에서 backend폴더 만들고 백엔드 프로그램 getTest.php를 만들고 이를 웹서버에 업로드[웹서버에서 index.html이 있는 폴더에 backend폴더를 만들고 그 안에 php파일이 있어야 함.
        // (4.4) 웹 브라우저의 새탭에서 직접 웹서버 주소를 입력하여 동작테스트 수행!

    }


    //(실습2 [1]) 라디오버튼의 선택값을 저장하는 state 변수
    const [gender, setGender] = useState('female') //초기값 'female'

    //(실습2 [2]) 체크박스버튼의 선택값을 저장하는 state 변수 [ 다중선택이어서 배열 변수 ]
    const [fruits, setFruits] = useState([]) //초기값 [] 빈 배열 

    const changeCheckbox= (value)=>{

        // fruits 배열에 선택한 체크박스의 value값이 포함되어 있다면 .. 제거... 없다면 추가해주는 코드 
        if( fruits.includes(value) ){
            //(3) 배열요소의 삭제도.. 추가할때와 마찬가지로 기존배열에서 해당 value요소를 제거한 후 새로운 배열로 만들어야 함.
            //    권장하는 방식은 filter() 메소드 사용 [ 특정 조건에 해당하는 요소만 리턴해서 새로운 배열로 만들어 주는 기능메소드 ]
            //    * value와 같은 값을 갖지 않은 요소들만 return true 되도록 필터조건 지정
            const newFruits= fruits.filter( element=> element != value )
            setFruits(newFruits)

        }else{
            //(1) fruits 배열에 선택한 체크박스의 value값 추가하고 setFruits() state 설정함수로 지정....해도 UI변경이 안될 것임.
            //fruits.push(value)
            //setFruits(fruits)  

            //(2) state 변수가 바뀌어야 하는데 배열 객체는 그대로 이고 요소만 변경되면 state변경으로 인정되지 않음
            // 기존 배열에 새로운 요소를 추가한 후 새로운 배열을 만들기 [방법 2가지 - concat() , [ ... ] spread 연산자 ]
            const newFruits= [ ...fruits, value ]
            setFruits(newFruits)

        }
    }

    //(실습2 [3]) select의 선택값을 저장하는 state 변수
    const [brand, setBrand]= useState('기아') //초기값 

    const changeBrand= (event)=>{
        //이벤트를 발생시킨 select 요소(event.target)의 value값으로 brand state변수 설정
        setBrand(event.target.value)
    }


    //(실습2 [4]) textarea의 선택값을 저장하는 state 변수
    const [content, setContent]= useState('')
    // textarea 입력값 변경 이벤트 콜백함수 - 화살표함수의 축약표현으로 한줄로 state값 설정 
    const changeContent= event => setContent(event.target.value)


    //(실습2 [5]) 선택 및 입력값 확인 버튼 클릭 이벤트 콜백 메소드
    const clickBtn= ()=>{
        let s= ''
        s += 'gender : ' + gender +"\n"
        s += 'fruits : ' + fruits +"\n"
        s += 'brand : ' + brand + "\n"
        s += 'content : ' + content 
        
        alert(s)
    }
    

    //(실습3)에서 추가할 POST 방신 전송 form onSubmit이벤트의 콜백지정 함수
    const submitPost= (event)=>{
        //(1)submit에 의한 새로고침 방지를 위해 기본 제출버튼 이벤트 동작을 막기
        event.preventDefault()

        //(2)서버에 보낼 데이터를 json string으로 만들기 [리터럴 객체로 보낼데이터들을 묶음] -- [key=value]형식보다 현업에서는 json으로 데이터를 보내는 경우가 많아서..
        const data= JSON.stringify({
            gender: gender,
            fruits : fruits,
            brand,  // 프로퍼티명과 값을 가진 변수명이 같다면.. 변수명만 써도 됨. [brand: brand]
            content // 프로퍼티명과 값을 가진 변수명이 같다면.. 변수명만 써도 됨. [content: content]
        })
        //(2.1)보낼 데이터가 json string 으로 잘 만들어 졌는지 확인
        //alert( data )

        //(3)XMLHttpRequest 객체 대신 fetch() HTTP 요청 내장 함수로 서버와 통신하기
        // [경로 설명 './backend/postTest.php] 현재 작업 중인 src폴더를 기준으로 하지 않고 빌드되어 배포될때 webpack에 의해 하나의 .js로 번들화 되어 index.html에 연결되어 동작하기에..index.html문서가 있는 폴더의 backend폴더 안의 php파일에 보내기!
        fetch('./backend/postTest.php',{
            method:'POST',
            headers: {
                'Conent-Type':'application/json'
            },
            body: data

        }).then(function(response){  //fetch() 비동기 작업 후 응답받았을때 실행되는 콜백함수 [ 파라미터 response : 응답객체 ]
            return response.text() //응답객체가 가져온 정보를 글씨로 만들어 달라고 요청[.text()] - 비동기 [결과를 Promiss로 리턴]

        }).then(function(text){ // text로 변환이 완려되었을 때 실행되는 콜백함수 [ 파리미터 text : 변환된 응답 글씨 ]
            alert("응답결과 : " + text)

        }).catch(function(error){ // 통신 중 예외발생 시 빠지는 catch()영역 [ 파라미터 error : 에러정보 객체 ]
            alert('에러 : ' + error.message)

        })

        //4) backend/ 폴더안에 postTest.php 파일 만들고 json 데이터를 받아 응답하는 php코드 작성.

        //5) 동작 테스트는 (실습1)의 GET 방식 서버전송 테스트 방법 (4)를 참고하여 실행!
    }


    // (실습4)에서 추가할 파일선택 입력폼의 선택 value 변경 이벤트 콜백 함수
    const changeFile= (event)=>{
        //alert(event.target.value) // value는 fakepath 가짜경로를 제공함. - 사용 X

        //선택한 파일 정보를 가진 File객체 얻기
        const files= event.target.files // input요소의 속성으로 multiple을 주면 여러개를 선택할 수 있어서 기본적으로 여러파일을 저장할 배열로 받음

        //현재 예제에는 multipe 속성이 없기에 1개의 파일만 있음. 즉, files[0] 만 사용할 것임
        const filename= files[0].name
        const filesize= files[0].size
        const filetype= files[0].type

        //선택한 파일정보 확인해보기
        alert( filename + "\n" + filesize + "\n" + filetype)

        //선택한 파일정보객체를 submit할 때 사용하기 위해 state에 저장
        setFile( files[0] )
    }

    const [file, setFile]= useState()

    // (실습4 [3])에서 추가할 선택한 파일 서버에 보내기 위한 onSubmit 이벤트 콜백 함수 
    const submitFile= (event)=>{
        //(0) submit의 페이지 전환 기본 동작 막기 - 새로고침 방지.)
        event.preventDefault()

        //(1) 서버에 파일전송하기 전에 state에 저장된 선택한 파일정보 확인해보기
        //alert( file ) //[object File]

        //(2) 파일을 전송하기 위한 택배박스객체 FormData
        const data= new FormData()
        data.append('img', file)  // '식별자 key', File 객체

        //(3) fetch() 내장함수로 전송 [경로는 GET/POST test 실습참고]
        fetch('./backend/uploadFile.php', {  //headers : 'Content-Type':'Multipart/form-data'를 추가하면 400 BAD Request.. 검토필요
            method: 'POST',
            body: data

        }) // then() 파라미터 함수를 화살표함수로 축약하여 구현하기
        .then( response => response.text() )
        .then( text=> alert(text) )
        .catch( error=> alert(error.message) )

        //(4) backend/폴더 안에 upload.php 만들고 File 데이터 받는 코드 작성

        // ** 동작 테스트는 이전 GET/POST 실습 참고 ***
    }


    //(실습5 [2])에서 추가할 파일선택 입력폼의 선택 files 변경 이벤트 콜백 함수
    const changeFiles= (event)=>{
        //선택한 파일들의 정보를 가진 객체를 얻어오기
        const files= event.target.files

        //JS의 File API를 이용하여 이미지 File 데이터를 읽어서 img요소가 보여줄 URL로 만들어 state 배열로 저장

        const newImageUrls=[] //선택한 파일들을 읽은 URL 정보를 저장할 빈 배열 변수 만들기.
        for(const file of files){
            const fr= new FileReader()
            fr.onload= ()=> { //   비동기 동작이어서..로드개수에 오류발생여지 있는..검토 필요
                newImageUrls.push(fr.result)
                // read작업이 완료되어 얻어진 URL 배열의 개수와 파일들의 배열개수가 같으면 화면에 표시..하기 위해 state set!!
                if(newImageUrls.length == files.length) setImageUrls(newImageUrls)                              
            }
            fr.readAsDataURL(file)
        }
    }

    //(실습5 [2])에서 추가할 파일리더로 읽어들인 파일의 URL을 저장할 state 배열변수
    const [imageUrls, setImageUrls]= useState([])


    //(실습5 [5])에서 추가할 submit 이벤트 콜백
    const submitFilesWithText= (event)=>{
        //(0) submit의 페이지 전환 기본 동작 막기 - 새로고침 방지.
        event.preventDefault()

        // (1)useRef를 이용하여 요소를 참조하고 닉네임과 선택한 파일들 객체 참조하기 - 마치 안드로이드 처럼...

        // (2)ref 참조변수로 현재참조하는(.current) input요소의 값을 얻어오기
        const nickname= nicknameRef.current.value
        const files= fileInputRef.current.files 

        //얻어온 값 확인..
        //alert( nickname + '\n' + files) // sam \n [object FileList]
        
        // (3)서버로 전송하기 위해 데이터를 택배상자로 만들기 - FormData !!!! [ headres: 정보를 명시했을때.. 400 BAD REQUEST ERROR 발생 ]---
        const data=new FormData()
        data.append('nickname', nickname)

        //선택한 파일의 개수만큼 반복하며 같은 식별자로 File객체 전송. 
        for( const file of files ){
            data.append('imgs[]', file) //[ 주의!! PHP서버에서는 식별자에 []배열 표시가 있어야 배열로 파일들을 받을 수 있음. 'imgs[]' ]
        }
        
        // (4)fetch() 내장함수로 통신
        fetch('./backend/uploadData.php',{
            method: 'POST',
            body: data
        })
        .then(res=>res.text())
        .then(text=>alert(text))
        .catch(error=>alert(error.message))
    }

    //(실습5 [5](1))에서 추가할 요소참조 HOOK
    const nicknameRef= useRef(null)   //닉네임을 입력하는 input요소 참조변수 선언 [초기값 null]
    const fileInputRef= useRef(null)  //파일을 선택하는 input요소 참조변수 선언 [초기값 null]
    // 선언한 참조변수를 각각의 (실습5)의 input 요소에 ref 속성으로 지정


    return (
        <div style={{padding:16}}>
        
            {/* REACT는 실제 페이지의 전환을 하지 않는 SPA를 기반으로 하는 만큼 서버와의 HTTP통신도 form요소의 action속성을 이용하지 않고 AJAX로 통신작업을 수행함.*/}
            {/* 당연히 버튼요소의 onClick 이벤트를 통해 JS코드로 HTTP 요청을 할 수 있지만 가급적 서버와의 통신은 form요소를 사용함. why? form 요소의 onSubmit이벤트는 키보드 Enter키 에도 반응하기에 사용자 경험이 향상됨 */}
            {/* [리액트에서 폼 다루기 알아보기] */}

            {/* (실습1) GET 방식으로 간단하게 서버에 데이터 보내고 응답받기. [react는 요소를 참조하여 요소값을 얻지 않음. ex00_input 참고] */}
            <h4>GET method TEST</h4>
            {/* [2] form 요소의 submit 이벤트 콜백함수 지정 */}
            <form onSubmit={submitGet}>
                {/* [1] input요소를 참조하지 않고 입력값이 변경될때마다[onChange] 그 값을 state변수에 저장. */}
                <input placeholder="title" onChange={changeTitle}></input>
                <input placeholder="message" onChange={changeMessage}></input>

                <input type="submit"></input>
            </form>

            {/* 사용자 입력이 간단하게 글씨입력 type 만 있지 않음. */}            
            <hr></hr>            
            {/* (실습2) 다양한 input type들의 사용자 입력값 얻어오기 실습 [ radio, checkbox, select 같은 요소 - value값 얻어오는 것이 다소 어려울 수 있음. ]*/}
            <h4>다양한 input type 의 value 값을 state변수에 저장하기</h4>

            {/* [1] radio 버튼 [single choice] */}
            <h5>[1] radio type ~ single choice</h5>
            <div>
                GENDER :  
                {/* 기존 html form을 이용할때는 name속성으로 식별자를 지정하고 같은 이름을 radio버튼들에 지정함으로 그룹을 만들었지만 리액트는 ajax 코드를 통해 직접 서버에 전송하는 만큼 구현방식의 차이가 있음 */}
                {/* checked 속성값이 true 면 체크상태임. 체크상태에 따라 gender state변수값을 변경(onChange)하기에 이 값이 value값과 같다면 true가 되도록 == 비교연산 결과값을 checked속성으로 지정 */}
                <label><input type="radio" checked={gender=='male'} onChange={()=>setGender('male')}></input>male</label>
                <label><input type="radio" checked={gender=='female'} onChange={()=>setGender('female')}></input>female</label>
            </div>

            <br></br>
            {/* [2] checkbox 버튼 [multiple choice] */}
            <h5>[2] checkbox type ~ multiple choice</h5>
            <div>
                FRUITS : 
                {/* radio button 구현처럼 name속성을 통하여 그룹을 형성하지 않고 state변수를 이용하여 선택된 값들 취득함 */}
                {/* multiple choice여서 state값은 배열임. 현재 input요소의 value값이 state fruits 배열에 포함되어 있는지 여부를 checked속성값으로 지정. */}
                {/* checked 속성값이 true 면 체크상태임. 체크상태변경 onChange 콜백으로 체크상태에 따른 fruits배열값 변경. 체크된 요소의 value값을 저장하고 있는 배열에 현재 value가 포함되어 있는지 여부를 true/false 결과로 리턴하는 includes()메소드 활용*/}
                {/* (1)checked 속성만 먼저 작성 후 확인해보기 ~ 요소를 체크해도 체크표시가 안될것임. 체크표시는 chekced속성값으로 적용되는데 이 값을 state로 결정하기 때문임. fruits state 초기값 배열에 'apple'을 넣어보면 확인가능함*/}
                {/* (2)체크상태 변경할때 배열 */}
                <label><input type="checkbox" checked={ fruits.includes('apple') } onChange={()=>changeCheckbox('apple')}></input>APPLE</label>
                <label><input type="checkbox" checked={ fruits.includes('banana') } onChange={()=>changeCheckbox('banana')}></input>BANANA</label>
                <label><input type="checkbox" checked={ fruits.includes('orange') } onChange={()=>changeCheckbox('orange')}></input>ORANGE</label>

            </div>

            <br></br>

            {/* [3] select 콤보박스 요소 [radio, checkbox와 다르게... select요소의 선택변경 이벤트 onChange할때 선택값 value를 설정 - 일반 input text type과 비슷함]*/}
            <h5>[3] select element ~ select item</h5>
            <div>
                자동차 브랜드 선택 : &nbsp; 
                <select value={brand} onChange={changeBrand} >
                    <option value='현대'>현대</option>
                    <option value='기아'>기아</option>
                    <option value='KGM'>KGM</option>
                </select>
            </div>

            <br></br>

            {/* [4] textarea 요소 - 여러줄 입력 [ textContent를 읽기 보다는 일반 input text type 처럼 value로 값을 취득 ~ children] */}
            <h5>[4] textarea ~ multi line input</h5>
            <div>
                CONTENT : <textarea placeholder="content" onChange={changeContent} value={content}></textarea>
            </div>

            {/* #### 나머지 입력요소들도 비슷한 방식으로 구현 가능. 필요하면 구글검색을 통해 문제 해결 ######## */}

            <br></br>
            {/* [5] 위 4개의 선택 및 입력값들이 잘 저장되었는지 다이얼로그로 확인해보기 */}
            <button onClick={clickBtn}>위 4개의 선택 및 입력값 확인하기</button>


            <hr></hr>
            {/* (실습3) POST 방식으로 위 4개의 입력폼 데이터를 서버에 보내고 응답받기 */}
            <h4>POST method TEST</h4>
            {/* (3) submit 버튼 클릭에 대응하는 onSubmt이벤트 콜백함수 지정 */}
            <form onSubmit={submitPost}>
                {/*(1) 이 자리에 위 4개의 입력요소들을 배치해야 함... 이미 위 입력요소들의 값을 state에 저장한 상태이므로 submit버튼만 배치 */}                
                {/*(2) input 요소가 아닌 button요소에도 type="submit"으로 통해 제출버튼으로 만들 수 있음. [클릭해보면 페이지가 새로고침되는 submit동작을 확인할 수 있음.]*/}
                <button type="submit" style={{width:'100%', padding:'.5rem'}}>위 4개의 선택 및 입력값 서버에 전송하기 - POST 방식</button>
            </form>


            <hr></hr>
            {/* (실습4) 파일전송 입력폼 */}
            <h4>File 선택 및 전송 TEST</h4>
            {/* [3] submit event 처리 */}
            <form onSubmit={submitFile}>
                {/* [1]파일선택용 입력폼 type='file' [핸드폰 웹브라우저에서 실행하면 화면 하단에 [앱 선택 (카메라, 갤러리)] BottomSheet가 보임.*/}
                <input type="file" onChange={changeFile}></input>

                {/* [2]제출버튼 */}
                <input type="submit"></input>
            </form>


            <hr></hr>
            {/* (실습5) 여러개의 파일 선택 및 미리보기 + 글씨 데이터까지 서버에 전송하는 입력폼  */}
            {/* [이번에는 useRef를 이용하여 요소를 참조하여 선택값 얻어오는 방식 실습해보기] */}
            <h4>여러개의 File 선택 및 미리보기 + 글씨 데이터까지 서버에 전송</h4>
            {/* [5] submit 이벤트 반응하기 */}
            <form onSubmit={submitFilesWithText}>
                {/* [1]글씨 데이터 입력폼 ~~~~ [ ref속성은 [5]실습에서 추가 ]*/}
                <input placeholder="닉네임" ref={nicknameRef}></input> 
                <br></br>

                {/* [2]multiple 파일선택 입력폼 [only 이미지] ~~~~ [ ref속성은 [5]실습에서 추가 ]*/}
                <input type="file" multiple accept="image/*" onChange={changeFiles} ref={fileInputRef}></input>

                {/* [3]선택된 파일들 미리보기용 img 요소 List*/}
                <p>선택된 이미지 수 : {imageUrls.length}</p>
                <div style={{borderTop:'2px solid black', borderBottom:'2px solid black', padding:8}}>
                    {
                        imageUrls.map((value,index)=><img src={value} key={index} style={{width:'20%', margin:4, border:'1px solid black'}}></img>)
                    }
                </div>
                <br></br>

                {/* [4]서버 전송 submit 버튼 */}
                <button type="submit" style={{width:'100%',padding:'.5rem'}}>닉네임과 첨부파일 이미지 서버로 전송하기 - FormData</button>
            </form>
            



        </div>
    )
}

export default Main