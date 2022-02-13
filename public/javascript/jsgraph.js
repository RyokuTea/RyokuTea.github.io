function makeGraphXY(){
    document.getElementById('graphAreaUV').style.display = 'none';
    document.getElementById('graphAreaXY').style.display = 'block';

    var standardValues = [
            {x:fi2.B1x.value, y:fi2.B1y.value},
            {x:fi2.G1x.value, y:fi2.G1y.value},
            {x:fi2.R1x.value, y:fi2.R1y.value},
            {x:fi2.B1x.value, y:fi2.B1y.value},
        ];
    var sampleValues = [
            {x:fi2.B2x.value, y:fi2.B2y.value},
            {x:fi2.G2x.value, y:fi2.G2y.value},
            {x:fi2.R2x.value, y:fi2.R2y.value},
            {x:fi2.B2x.value, y:fi2.B2y.value},
        ];

    var data = makeData(standardValues, sampleValues);
    var maxTicks = [0.8, 0.9];
    drawGraphMain(data, maxTicks, 'myChart', 'CIE1931(xy)');
    drawGraphXY(data);
}

function makeGraphUV(){
    document.getElementById('graphAreaXY').style.display = 'none';
    document.getElementById('graphAreaUV').style.display = 'block';

    var standardValues = [
            {x:fi2.B1u.value, y:fi2.B1v.value},
            {x:fi2.G1u.value, y:fi2.G1v.value},
            {x:fi2.R1u.value, y:fi2.R1v.value},
            {x:fi2.B1u.value, y:fi2.B1v.value},
        ];
    var sampleValues = [
          {x:fi2.B2u.value, y:fi2.B2v.value},
          {x:fi2.G2u.value, y:fi2.G2v.value},
          {x:fi2.R2u.value, y:fi2.R2v.value},
          {x:fi2.B2u.value, y:fi2.B2v.value},
        ];

    var data = makeData(standardValues, sampleValues);
    var maxTicks = [0.6, 0.6];
    drawGraphMain(data, maxTicks, 'myChartUV', "CIE1976(u'v')");
    drawGraphUV(data);
}

function makeData(standardValues, sampleValues){
    // データ
    return {
      datasets: [{
        label: 'Standard',
        data: standardValues,
        borderWidth: 1,
        //マークを同じ色にする場合
        //backgroundColor: '#f88',
        pointBorderColor: ['rgba(0,0,255,0.25)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', 'rgba(0,0,255,0.25)'],
        pointRadius: 3,
        fill: false,
        showLine: true,
        tension: 0,
        borderDash: [10,5],
       }, {
        label: 'Sample',
        data: sampleValues,
        borderColor: 'gray',
        borderWidth: 1,
        pointBackgroundColor: ['blue', 'green', 'red', 'blue'],
        pointBorderColor: ['blue', 'green', 'red', 'blue'],
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        showLine: true,
        tension: 0,
      }],
    };    
}

function drawGraphMain(data, maxTicks, chartName, titleName){
    // データ
    var data = data;

    //オプション
    var options = {
        title: {
            display: true,
            text: titleName,
            padding: 10,
            fontsize: 18
        },
        legend: false,
        tooltips: false,
        maintainAspectRatio: false,
        scales: {
           xAxes: [{
              scaleLabel: {
                 display: true,
                 labelString: 'x',
              },
              ticks: {
                 min: 0,
                 max: maxTicks[0],
                 stepSize: 0.1
              },
              gridLines: {
                 color: '#888',
                 drawOnChartArea: false
              }
           }],
           yAxes: [{
              scaleLabel: {
                 display: true,
                 labelString: 'y'
              },
              ticks: {
                 min: 0,
                 max: maxTicks[1],
                 padding: 8,
                 stepSize: 0.1
              },
              gridLines: {
                 color: '#888',
                 drawOnChartArea: false
              }
           }]
        }
    };

    // グラフを描画
    var ctx = document.getElementById(chartName);
    var myChart = new Chart(ctx, {
      type: 'scatter',
      data: data,
      options: options
    });
}

function drawGraphXY(data){
    // 2度押しのときのdistroyをいれる？if文。保留。。。

    // データ
    var data = data;

    //コメントの表示
    document.getElementById('addComment').style.display = 'block';

    var XminValues = [0.05, 0.2, 0.55];
    var XmaxValues = [0.25, 0.4, 0.75];
    var YminValues = [0, 0.55, 0.2];
    var YmaxValues = [0.2, 0.75, 0.4];
    var chartNames = ['blueChart', 'greenChart', 'redChart'];

    for(var i=0; i<=2; i++){
        options = {
            legend: false,
            tooltips: false,
            maintainAspectRatio: false,
            scales: {
            xAxes: [{
                ticks: {
                    min: XminValues[i],
                    max: XmaxValues[i],
                    fontSize: 8,
                    stepSize: 0.05
                },
                gridLines: {
                    color: 'rgba(125,125,125,0.6)',
                    drawOnChartArea: false
                }
            }],
                yAxes: [{
                ticks: {
                    min: YminValues[i],
                    max: YmaxValues[i],
                    padding: 4,
                    fontSize: 8,
                    stepSize: 0.05
                },
                gridLines: {
                    color: 'rgba(125,125,125,0.6)',
                    drawOnChartArea: false
                }
            }]
            }
        };

        ctx = document.getElementById(chartNames[i])
        switch(chartNames[i]){
            case 'blueChart':
                const blueChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
            case 'greenChart':
                const greenChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
            case 'redChart':
                const redChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
        }
    }
}

function drawGraphUV(data){
    // 2度押しのときのdistroyをいれる？if文。保留。。。
    // データ
    var data = data;

    //コメントの表示
    document.getElementById('addCommentUV').style.display = 'block';

    //Blue Green Red
    var XminValues = [0.14, 0.07, 0.44];
    var XmaxValues = [0.20, 0.13, 0.50];
    var YminValues = [0.14, 0.54, 0.49];
    var YmaxValues = [0.20, 0.60, 0.55];
    var chartNames = ['blueChartUV', 'greenChartUV', 'redChartUV'];

    for(var i=0; i<=2; i++){
        options = {
            legend: false,
            tooltips: false,
            maintainAspectRatio: false,
            scales: {
            xAxes: [{
                ticks: {
                    min: XminValues[i],
                    max: XmaxValues[i],
                    fontSize: 8,
                    stepSize: 0.01
                },
                gridLines: {
                    color: 'rgba(125,125,125,0.6)',
                    drawOnChartArea: false
                }
            }],
                yAxes: [{
                ticks: {
                    min: YminValues[i],
                    max: YmaxValues[i],
                    padding: 4,
                    fontSize: 8,
                    stepSize: 0.01
                },
                gridLines: {
                    color: 'rgba(125,125,125,0.6)',
                    drawOnChartArea: false
                }
            }]
            }
        };

        ctx = document.getElementById(chartNames[i])
        switch(chartNames[i]){
            case 'blueChartUV':
                const blueChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
            case 'greenChartUV':
                const greenChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
            case 'redChartUV':
                const redChart = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options
                });
                break;
        }
    }
}