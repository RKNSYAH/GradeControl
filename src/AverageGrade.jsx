import React from "react";

import ReactECharts from 'echarts-for-react';


function AverageGrade({nilai}){

    var option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#58D9F9',
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
                lineStyle: {
                    width: 30,
                    color: [
                      [0.25, '#FF6E76'],
                      [0.5, '#FDDD60'],
                      [0.75, '#79D9F9'],
                      [1, '#7CFFB2']
                    ]
                  }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '55%'],
              fontSize: 15,
              fontWeight: 'bolder',
              formatter: 'Rata Rata Nilai : {value}',
              color: 'inherit'
            },
            data: [
              {
                value: nilai
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: '#4691a3'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: nilai
              }
            ]
          }
        ]
      };
    
    return <ReactECharts style={{height: '300px', width:'600px'}} option={option}/>
}
export default AverageGrade
    