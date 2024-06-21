import React from "react";
import { Button } from "react-bootstrap";

const styles = {
    but : {
        padding : "10px",
        fontSize : "16px",
        backgroundColor : "#0d2568",
        border : "#0d2568",
    }
};

function Toolbar(props) {
    const {isLoggedIn, onClickLogin, onClickLogout} = props;

    return (
        <>
        {isLoggedIn ? (
            <Button type='submit' style={styles.but} onClick={onClickLogout}>
                로그아웃
            </Button>
        ) : (
            <Button type='submit' style={styles.but} onClick={onClickLogin}>
                로그인
            </Button>
        )}
        </>
    );
}

export default Toolbar;