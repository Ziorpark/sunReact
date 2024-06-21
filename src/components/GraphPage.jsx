import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavPage from "./layouts/Navigation/SideNav";
import { Line } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { RealTimeScale, StreamingPlugin } from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

//Select Box
const GRAPH_OPT = [
  { value: 0, name : "1s/ 10s", setopt : { ref : 1000, dur : 10000, step: 10 } },
  { value: 1, name : "10s / 1m", setopt : { ref : 10000, dur : 60000, step: 60 } },
  { value: 2, name : "1m / 10m", setopt : { ref : 60000, dur : 600000, step: 600 } },
  { value: 3, name : "10m / 1h", setopt : { ref : 600000, dur : 3600000, step: 3600 } },
  { value: 4, name : "1h / 1d", setopt : { ref : 3600000, dur : 3600000 * 24, step: 3600*24 } },
];

const SelectBox = (props) => {
  const { options, onChange } = props;

  return (
    <select onChange={(e) => onChange(options[e.target.selectedIndex])}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
};

Chart.register(
  StreamingPlugin,
  RealTimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphPage() {
    const { chipId } = useParams(); // chipId를 경로 매개변수로 받음
    const [opt, setOption] = useState(GRAPH_OPT[0]);

    //변경된 값 console 출력
    const handleSelectChange = (value) => {
      console.log(value);
      setOption(value);
    };

    const getUnit = (duration) => {
      if (duration <= 60000) {
        return 'second';
      } else if (duration <= 3600000) {
        return 'minute';
      } else if (duration <= 86400000) {
        return 'hour';
      } else {
        return 'day';
      }
    };
    
    const initialTimestamp = Date.now(); //실시간 현재 시간

    const [options2, setOptions2] = useState({
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            delay: 0, // 데이터가 표시되기까지의 지연 시간 (밀리초)
            refresh: opt.setopt.ref, // onRefresh가 호출되는 주기 (밀리초)
            duration: opt.setopt.dur, // x축에 표시되는 데이터의 기간 (밀리초)
            onRefresh: (chart) => {
              chart.data.datasets.forEach((dataset) => {
                const now = Date.now();
                dataset.data.push({
                  x: now,
                  y: Math.random(),
                });
              });
            },
          },
          time: {
            unit: getUnit(opt.setopt.dur),
            displayFormats: {
              second: 'HH:mm:ss',
              minute: 'HH:mm',
              hour: 'MMM D, HH:mm',
              day: 'MMM D',
            },
            stepSize: opt.setopt.step,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true, // 툴팁 활성화
          mode: 'nearest', // 가장 가까운 데이터 포인트에 대해 툴팁을 표시
          intersect: false, // 마우스가 데이터 포인트와 교차하지 않아도 툴팁을 표시
        },
      },
    });

    useEffect(() => {
      setOptions2({
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              delay: opt.setopt.dur,
              refresh: opt.setopt.ref,
              duration: opt.setopt.dur,
              onRefresh: (chart) => {
                chart.data.datasets.forEach((dataset) => {
                  const now = Date.now();
                  dataset.data.push({
                    x: now,
                    y: Math.random(),
                  });
                });
              },
            },
            time: {
              unit: getUnit(opt.setopt.dur),
              displayFormats: {
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'MMM D, HH:mm',
                day: 'MMM D',
              },
              stepSize: opt.setopt.step,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
          },
        },
      });
    }, [opt]);

    const data1 = {
        datasets: [{
          label: `${chipId} Voltage`,
          data: [],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

    const data2 = {
        datasets: [{
          label: `${chipId} Ampere`,
          data: [],
          fill: false,
          borderColor: 'rgb(53, 162, 235)',
          tension: 0.1
        }]
      };

    const data3 = {
        datasets: [{
          label: `${chipId} Temperate`,
          data: [],
          fill: false,
          borderColor: 'rgb(255, 128, 0)',
          tension: 0.1
        }]
      };

    const data4 = {
        datasets: [{
          label: `${chipId} Watt`,
          data: [],
          fill: false,
          borderColor: 'rgb(163, 26, 255)',
          tension: 0.1
        }]
      };

    return (
        <div className="container-fluid">
            <div className="row">
                <NavPage />
                <div className="col-sm p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                  <Container>
                    <Row>
                      <Col style={{ marginBottom: '30px' }}>
                        <SelectBox options={GRAPH_OPT} onChange={handleSelectChange} />
                      </Col>
                      <Col></Col>
                    </Row>

                    <Row>
                    <Col md={6} style={{ marginBottom: '30px' }}>
                        <Line type="line" options={options2} data={data1} />
                    </Col>
                    <Col md={6} style={{ marginBottom: '30px' }}>
                        <Line type="line" options={options2} data={data2} />
                    </Col>
                    </Row>

                    <Row>
                    <Col md={6} style={{ marginBottom: '30px' }}>
                        <Line type="line" options={options2} data={data3} />
                    </Col>
                    <Col md={6} style={{ marginBottom: '30px' }}>
                        <Line type="line" options={options2} data={data4} />
                    </Col>
                    </Row>
                  </Container>
                </div>
            </div>
        </div>
    )
}

export default GraphPage;
