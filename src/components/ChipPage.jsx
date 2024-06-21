import React, { useState } from "react";
import NavPage from "./layouts/Navigation/SideNav";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBatteryThreeQuarters, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import ChipInfo from "./chip";

function ChipPage() {
    const nation_num = sessionStorage.getItem("Selected_nation");
    let nation;

    const usage_num = sessionStorage.getItem("Selected_usage");
    let usage;

    const spsr_num = sessionStorage.getItem("Selected_spsr");

    switch (parseInt(nation_num, 10)) { // sessionStorage 값은 문자열이므로 정수로 변환
        case 0:
            nation = "대한민국";
            break;
        case 1:
            nation = "스페인";
            break;
        case 2:
            nation = "프랑스";
            break;
        case 3:
            nation = "독일";
            break;
        default:
            nation = "알수없음";
            break;
    }

    switch (parseInt(usage_num, 10)) { // sessionStorage 값은 문자열이므로 정수로 변환
        case 0:
            usage = "생산";
            break;
        case 1:
            usage = "저장";
            break;
        case 2:
            usage = "소비";
            break;
        default:
            usage = "알수없음";
            break;
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <NavPage />
                <div class="col-sm p-3 min-vh-100">
                    <Row>
                        <Col style={{display:"flex", justifyContent: 'space-between', fontSize : 30, color : "#0e2971", fontWeight : "bold"}} xs={5}>
                            <span></span>
                        </Col>
                        <Col style={{ fontSize: 20, display: "flex", justifyContent: 'space-between', flexDirection: "row", 
                            border: "1px solid #0d2568", borderRadius: '1rem', padding: 10, marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faBolt} />
                                <div style={{ marginLeft: '10px' }}><b>국가 :</b> {nation}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faBatteryThreeQuarters} />
                                <div style={{ marginLeft: '10px' }}><b>구분 :</b> {usage}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faLightbulb} />
                                <div style={{ marginLeft: '10px' }}><b>SPSR :</b> {spsr_num}</div>
                            </div>
                        </Col>

                    </Row>

                    <Row style={{margin: 10}}>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip1" voltValue="57" ahValue="43" tempValue="77" wattValue="24" batteryValue="97" statuscode="000" />
                        </Col>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip2" voltValue="84" ahValue="34" tempValue="42" wattValue="69" batteryValue="44" 
                            circleColor="#1a66ff"/>
                        </Col>
                        <Col style={{marginBottom: 10}}>
                            <ChipInfo chipName="chip3" voltValue="12" ahValue="51" tempValue="77" wattValue="15" batteryValue="61" 
                            circleColor="#ffff1a"/>     
                        </Col>
                        <Col style={{marginBottom: 10}}>
                            <ChipInfo chipName="chip4" voltValue="91" ahValue="89" tempValue="41" wattValue="32" batteryValue="47" 
                            circleColor="#ff9933"/>
                        </Col>
                    </Row>

                    <Row style={{margin: 10}}>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip5" voltValue="44" ahValue="35" tempValue="91" wattValue="55" batteryValue="12" 
                            circleColor="#00cc00" progressColor="success"/>
                        </Col>
                        <Col style={{marginBottom: 10}}>
                            <ChipInfo chipName="chip6" voltValue="57" ahValue="9" tempValue="46" wattValue="77" batteryValue="78" 
                            circleColor="#c44dff" progressColor="custom"/>
                        </Col>
                        <Col style={{marginBottom: 10}}>
                            <ChipInfo chipName="chip7" voltValue="32" ahValue="50" tempValue="71" wattValue="27" batteryValue="54" 
                            circleColor="black" statuscode="111"/>
                        </Col>
                        <Col style={{marginBottom: 10}}>
                            <ChipInfo chipName="chip8" voltValue="0" ahValue="0" tempValue="0" wattValue="0" batteryValue="0" 
                            circleColor="#ffff1a" statuscode="100"/>
                        </Col>
                    </Row>

                    <Row style={{margin: 20}}>
                        <div style={{ border : '2px solid black', borderRadius: '1rem', padding: '20px'}} >
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h2>전체 탄소배출 절감량</h2> <h2>0g/h</h2>
                        </div>              
                            <hr></hr>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h1>해당 보드 탄소배출 절감량</h1> <h1>0g/h</h1>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ChipPage;
