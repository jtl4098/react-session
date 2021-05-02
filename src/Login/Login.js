import React from 'react';

const Login = (props) =>{

    const {email, setEmail, password, setPassword, handleLogin, handleSignUp, hasAccount, setHasAccount, emailError, passwordError} = props;
    return(
        <section className="login">
            <div className="loginContainer">
                <label>Email</label>
                <input type="text"
                    autoFocus 
                    required 
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" 
                    required
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}    
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleSignUp}>회원가입</button>
                            <p>이미 계정이있으신가요 ?  <span onClick={() => setHasAccount(!hasAccount)}>로그인</span></p>
                        </>
                        
                    ) : (
                        <>
                            <button onClick={handleLogin}>로그인</button>
                            <p>회원 가입을 하지 않으셨다면 이곳을 클릭해주세요 <span onClick={() => setHasAccount(!hasAccount)}>회원가입</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;