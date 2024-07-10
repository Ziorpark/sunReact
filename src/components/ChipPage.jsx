import React, { useState, useEffect } from "react";
import NavPage from "./layouts/Navigation/SideNav";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBatteryThreeQuarters, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import ChipInfo from "./chip";
import axios from 'axios';

function ChipPage() {
    // LocalStorage에서 값들을 읽어와 변수에 할당
    const nation_num = parseInt(localStorage.getItem("Selected_nation"), 10);
    const usage_num = parseInt(localStorage.getItem("Selected_usage"), 10);
    const spsr_num = localStorage.getItem("Selected_spsr");
    
    // 국가 및 용도 코드 매핑
    const nationMap = {
        0: "대한민국",
        1: "스페인",
        2: "프랑스",
        3: "독일",
        default: "알수없음"
    };

    const usageMap = {
        1: "생산",
        2: "저장",
        3: "소비",
        default: "알수없음"
    };

    // State 정의
    const [chipData, setChipData] = useState(null);
    const [co2RedAmt, setCo2RedAmt] = useState(0);
    const [co2RedAmt_all, setCo2RedAmtAll] = useState(0);

    // 데이터 가져오기 useEffect
    useEffect(() => {
        const spsrNum = localStorage.getItem('spsrNum');

        if (spsrNum) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/chipdata', { params: { spsrNum } });
                    console.log('ChipPage - Data received:', response.data);
                    setChipData(response.data);

                    /*
                    if (response.data && response.data[0] && response.data[0].Co2RedAmt) {
                        setCo2RedAmt((parseFloat(response.data[0].Co2RedAmt) / 1000).toFixed(2));
                    }
                    */

                } catch (error) {
                    console.error('ChipPage - Error fetching data:', error);
                    // 에러 처리
                }
            };

            fetchData();
        } else {
            console.error('No spsrNum found in localStorage');
        }
    }, []);

    //전체보드
    useEffect(() => {
        const fetchAllReduceData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/all_reduce'); // 서버 URL 변경
                let data = parseFloat(response.data);
                if (data > 1000) {
                    data = (data / 1000).toFixed(2);
                } else {
                    data = data.toFixed(2);
                }
                setCo2RedAmtAll(data);
                console.log("reduce_all data: " + data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchAllReduceData();
      }, []);

    //현재보드
    useEffect(() => {
        const spsrNum = localStorage.getItem('spsrNum');
        //console.log("spsrNum: " + spsrNum);
        
        const nowReduceFetchData = async () => {
            if (spsrNum) {
                try {
                    const response = await axios.get('http://localhost:4000/api/now_reduce', { params: { spsrNum } });
                    //console.log('API response:', response.data);

                    let data = parseFloat(response.data);
                    if (data > 1000) {
                        data = (data / 1000).toFixed(2);
                    } else {
                        data = data.toFixed(2);
                    }
                    setCo2RedAmt(data);
                    console.log("reduce_now data: " + data);

                } catch (error) {
                    console.error('ChipPage - Error fetching data:', error);
                }
            } else {
                console.error('No spsrNum found in localStorage');
            }
        };

        nowReduceFetchData();
    }, []);
      

    return (
        <div className="container-fluid">
            <div className="row">
                <NavPage />
                <div className="col-sm p-3 min-vh-100">
                    <Row>
                        <Col style={{ display: "flex", justifyContent: 'space-between', fontSize: 30, color: "#0e2971", fontWeight: "bold" }} xs={5}>
                            <span></span>
                        </Col>
                        <Col style={{ fontSize: 20, display: "flex", justifyContent: 'space-between', flexDirection: "row", border: "1px solid #0d2568", borderRadius: '1rem', padding: 10, marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faBolt} />
                                <div style={{ marginLeft: '10px' }}><b>국가 :</b> {nationMap[nation_num] || nationMap.default}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faBatteryThreeQuarters} />
                                <div style={{ marginLeft: '10px' }}><b>구분 :</b> {usageMap[usage_num] || usageMap.default}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                <FontAwesomeIcon icon={faLightbulb} />
                                <div style={{ marginLeft: '10px' }}><b>SPSR :</b> {spsr_num}</div>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ margin: 10 }}>
                        {chipData?.[0] && (
                            ["Ch1", "Ch2", "Ch3", "Ch4"].map((ch, index) => (
                                <Col key={index} style={{ marginBottom: 10 }}>
                                    <ChipInfo
                                        chipName={`chip${index + 1}`}
                                        voltValue={parseFloat(chipData[0][`${ch}_Volt`]).toFixed(2)}
                                        ahValue={parseFloat(chipData[0][`${ch}_Curr`]).toFixed(2)}
                                        tempValue={parseFloat(chipData[0][`${ch}_Temp`]).toFixed(2)}
                                        wattValue={parseFloat(chipData[0][`${ch}_Stat`]).toFixed(2)}
                                        batteryValue="97"
                                        circleColor={index===1 ? "" : index === 2 ? "#ffff1a" : index === 3 ? "#ff9933" : "#1a66ff"}
                                    />
                                </Col>
                            ))
                        )}
                    </Row>

                    <Row style={{ margin: 10 }}>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip5" voltValue="44" ahValue="35" tempValue="91" wattValue="55" batteryValue="12"
                                circleColor="#00cc00" progressColor="success" />
                        </Col>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip6" voltValue="57" ahValue="9" tempValue="46" wattValue="77" batteryValue="78"
                                circleColor="#c44dff" progressColor="custom" />
                        </Col>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip7" voltValue="32" ahValue="50" tempValue="71" wattValue="27" batteryValue="54"
                                circleColor="black" statuscode="111" />
                        </Col>
                        <Col style={{ marginBottom: 10 }}>
                            <ChipInfo chipName="chip8" voltValue="0" ahValue="0" tempValue="0" wattValue="0" batteryValue="0"
                                circleColor="#ffff1a" statuscode="100" />
                        </Col>
                    </Row>

                    <Row style={{ margin: 20 }}>
                        <div style={{ border: '2px solid black', borderRadius: '1rem', padding: '20px' }} >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>전체 탄소배출 절감량</h2> <h2>{co2RedAmt_all}{co2RedAmt_all > 1 ? 'k' : ''} g/h</h2>
                            </div>
                            <hr></hr>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>해당 보드 탄소배출 절감량</h1> <h1>{co2RedAmt}{co2RedAmt > 1 ? 'k' : ''} g/h</h1>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ChipPage;
