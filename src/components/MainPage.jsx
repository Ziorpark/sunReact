import React, { useState, useEffect } from "react";
import NavPage from './layouts/Navigation/SideNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import styled from "styled-components";

const NATION_OPT = [
    { value: 0, name: { en: "KOREA", kr: "대한민국" } },
    { value: 1, name: { en: "SPAIN", es: "España", kr: "스페인" } },
    { value: 2, name: { en: "FRANCE", fr: "France", kr: "프랑스" } },
    { value: 3, name: { en: "GERMANY", de: "Deutschland", kr: "독일" } },
];

const USAGE_OPT = [
    { value: 0, name: { en: "Production", kr: "생산" } },
    { value: 1, name: { en: "Storage", kr: "저장" } },
    { value: 2, name: { en: "Consumption", kr: "소비" } },
];

const SPSR_OPT = [
    { value: "00001", name: { en: "00001", kr: "00001" } },
    { value: "00032", name: { en: "00032", kr: "00032" } },
    { value: "00101", name: { en: "00101", kr: "00101" } },
    { value: "00102", name: { en: "00102", kr: "00102" } },
    { value: "00106", name: { en: "00106", kr: "00106" } },
];

export const Select = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	padding: 8px 35px 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
	&:focus {
		border-color: red;
	}
    -webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
    Width: 150px;
`;

// flex Box를 사용하기 위해 display flex option을 넣은 Wrapper를 하나 생성
const SelectBoxWrapper = styled.div`
	display: flex;
`;

// Icon에 사용할 Icon SVG 컴포넌트 생성
const IconSVG = styled.svg`
	margin-left: -28px;
	align-self: center;
	width: 24px;
	height: 24px;
`;

function SelectBox(props) {
    const { option, onChange } = props;

    return (
        <SelectBoxWrapper>
            <Select onChange={(e) => onChange(e.target.value)}>
                {option.map((option) => (
                    <option
                        key={option.value} value={option.value}>
                        {option.name.kr}
                    </option>
                ))}
            </Select>
            <IconSVG
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 14L16 6H4L10 14Z"
                    fill="#1A1A1A"
                />
            </IconSVG>
        </SelectBoxWrapper>
    )
}

function MainPage() {

    const [nation, setNation] = useState(NATION_OPT[0].value);
    const [usage, setUsage] = useState(USAGE_OPT[0].value);
    const [spsr, setSpsr] = useState(SPSR_OPT[0].value);
    
    //Connect Event 등록
    const OnClickConnect = () => {
        sessionStorage.setItem("Selected_nation", nation);
        sessionStorage.setItem("Selected_usage", usage);
        sessionStorage.setItem("Selected_spsr", spsr);

        alert("선택 완료!");
    };


    return (
        <div class="container-fluid">
            <div class="row">
                <NavPage />
                <div className="col-sm p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Container style={{ fontSize: 25 }}>
                    <Row style={{ marginBottom : 30, alignItems: 'center' }}>
                        <Col></Col>
                        <Col xs={5}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <span style={{marginRight : 30}}>국 가 :</span> <SelectBox option={NATION_OPT} onChange={setNation} />
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row style={{marginBottom : 30}}>
                        <Col></Col>
                        <Col xs={5}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <span style={{marginRight : 30}}>구 분 :</span> <SelectBox option={USAGE_OPT} onChange={setUsage} />
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row style={{marginBottom : 100}}>
                        <Col></Col>
                        <Col xs={5}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <span style={{marginRight : 30}}>SPSR :</span> <SelectBox option={SPSR_OPT} onChange={setSpsr} />
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row style={{marginBottom : 30}}>
                        <Col></Col>
                        <Col xs={5} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button style={{fontSize: 25, backgroundColor : "#0d2568", border : "#0d2568" }} onClick={OnClickConnect}>
                                Next
                            </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                    
                </Container>
                </div>
            </div>
        </div>
      );
}

export default MainPage;