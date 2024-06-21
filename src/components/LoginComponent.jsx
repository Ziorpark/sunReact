import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import LoginButton from "./LoginButton";

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //로그인 상태 변경
    const [isLoggedIn, setInLoggedIn] = useState(false);
    //이벤트 핸들러 등록
    const onClickLogin = () => {
        setInLoggedIn(true);
    };
    const onClickLogout = () => {
        setInLoggedIn(false);
    };

    //session에 사용자 정보 저장
    const handleLogin = () => {
        sessionStorage.setItem('userID', id);
        sessionStorage.setItem('userPassword', password);
        navigate("/Main");
    };

    return (
        <div style={{
            display : 'flex', justifyContent : 'center', alignItems : 'center',
            width : '100%', height : '100vh'
        }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width : '300px'}}>
            <h1 style={{fontWeight: 'bold', marginBottom: '50px'}}>Login</h1>
                <form style={{display : 'flex', flexDirection : 'column', width: '100%', textAlign : 'center'}} onSubmit={handleLogin}>
                    {/*<label>User ID</label>*/ }
                    <input type='text' value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" style={{marginBottom : '10px'}} className="input-field"/>
                    {/*<label>Password</label>*/}
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" className="input-field" />
                    <br />

                    <LoginButton />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;