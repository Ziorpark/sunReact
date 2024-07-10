import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./ChipPage.css";

const ToggleContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  .toggle-container {
    width: 45px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
    position: relative;
    transition: 0.5s;
  }

  .toggle--checked.toggle-container {
    background-color: rgb(0, 200, 102);
  }

  .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }

  .toggle--checked.toggle-circle {
    left: 27px;
  }
`;

function ChipInfo(props) {
    const { chipName, voltValue, ahValue, tempValue, 
        wattValue, batteryValue, circleColor, progressColor,
        statuscode } = props;

    //Page 이동
    const navigate = useNavigate();
    const handleCircularClick = (uri) => {
        navigate(uri);
    };

    //Toggle Button
    const [isOn, setisOn] = useState(false);
    const toggleHandler = () => {
        setisOn(!isOn);
    };

    //Status
    const [chipStatus, setStatus] = useState('NORMAL');
    const [iserror, setError] = useState(false);

    useEffect(() => {
        if (statuscode === '000') {
            setStatus('NORMAL');
            setError(false);
        } else if (statuscode) {
            let errorstr = "";
            if (statuscode.toString().substring(0, 1) === "1") {
                errorstr = "V";
            }
            if (statuscode.toString().substring(1, 2) === "1") {
                errorstr += " C";
            }
            if (statuscode.toString().substring(2, 3) === "1") {
                errorstr += " T";
            }
            errorstr += " ERROR";
            setStatus(errorstr);
            setError(true); 
        }
    }, [statuscode]);

    return (
        <>
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize : 25, color: iserror ? 'red' : ""}}>{chipName} : {chipStatus}</span> 
            <div style={{ display : 'block', textAlign: 'center'}}>
                <div style={{fontSize: 11}}>on/off</div>
                <ToggleContainer onClick={toggleHandler}>
                    <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
                    <div className={`toggle-circle ${isOn ? "toggle--checked" : ""}`} />
                </ToggleContainer>
            </div>
            
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div onClick={() => handleCircularClick(`/Graph/${chipName}`)} >
                <CircularProgressbarWithChildren value={voltValue}
                    styles={{
                        root: {},
                        path: { stroke: `${iserror ? 'red' : circleColor}` },
                        trail: {},
                    }} 
                >
                    <div style={{ fontSize: 13, color: 'black' }}>{isOn ? 'On' : 'Off'}</div>
                    <div style={{ fontSize: 20, color: iserror ? 'black' : 'grey' }}>VOLT</div>
                    <div style={{ fontSize: 20, marginTop: -5, color: iserror ? 'black' : 'black' }}>
                        <strong>{voltValue}V</strong>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            <div style={{ marginTop: 20, width: '100%' }}>
                <ProgressBar now={ahValue} variant={iserror ? "errorbg" : progressColor}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:10 }}>
                    <span style={{ color: iserror ? 'red' : 'grey' }}>Ah</span>
                    <span style={{ color: iserror ? 'red' : 'black' }}>{ahValue}</span>
                </div>
                <ProgressBar now={tempValue} variant={iserror ? "errorbg" : progressColor}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:10 }}>
                    <span style={{ color: iserror ? 'red' : 'grey' }}>TEMP</span>
                    <span style={{ color: iserror ? 'red' : 'black' }}>{tempValue}</span>
                </div>
                <ProgressBar now={wattValue} variant={iserror ? "errorbg" : progressColor}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:10 }}>
                    <span style={{ color: iserror ? 'red' : 'grey' }}>WATT</span>
                    <span style={{ color: iserror ? 'red' : 'black' }}>{wattValue}</span>
                </div>
                {/* 배터리 용량 정보, 추후 처리 결정요망
                <ProgressBar now={batteryValue} variant={iserror ? "errorbg" : progressColor}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:10 }}>
                    <span style={{ color: iserror ? 'red' : 'grey' }}>BATTERY</span>
                    <span style={{ color: iserror ? 'red' : 'black' }}>0.0</span>
                </div>
                */}
                
            </div>
        </div>
        </>
    );
}

export default ChipInfo;
