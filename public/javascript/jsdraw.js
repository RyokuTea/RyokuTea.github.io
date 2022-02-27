function preparingDraw(ctx,ratioY){
  ctx.clearRect(0,0,330,450);

  ctx.strokeRect(0, 0, 320, ratioY);
  ctx.fillStyle = "rgba(0,0,255,0.2)";
}

function drawMaps(Xwidth, Ywidth, Xnumber, Ynumber, XYnumber, areaRatio, ctx) {
  var oriXPosition = 0;
  var oriYPosition = 0;
  var XPosition = 0;
  var YPosition = 0;

  if(fi4.marginMiddleX.value==0 && fi4.marginMiddleY.value==0){
    for(var i=0;i<Xnumber;i++){
      for(var j=0;j<Ynumber;j++){
        oriXPosition = drawRatio(fi4.marginX.value);
        oriYPosition = drawRatio(fi4.marginY.value);

        XPosition = oriXPosition + (Xwidth * i);
        YPosition = oriYPosition + (Ywidth * j);

        ctx.strokeRect(XPosition, YPosition,Xwidth,Ywidth);
        ctx.fillRect(XPosition, YPosition,Xwidth,Ywidth);
      }
    }
  } else {
    for(var k=0;k<=3;k++){
      switch (k){
        case 0:
          oriXPosition = drawRatio(fi4.marginX.value);
          oriYPosition = drawRatio(fi4.marginY.value);
          break;
        case 1:   //Upper right hand
          oriXPosition = drawRatio(fi4.genX.value/2)+drawRatio(fi4.marginMiddleX.value/2);
          oriYPosition = drawRatio(fi4.marginY.value);
          break;
        case 2:   //bottom left hand
          oriXPosition = drawRatio(fi4.marginX.value);
          oriYPosition = drawRatio(fi4.genY.value/2)+drawRatio(fi4.marginMiddleY.value/2);
          break;
        case 3:   //bottom right hand
          oriXPosition = drawRatio(fi4.genX.value/2)+drawRatio(fi4.marginMiddleX.value/2);
          oriYPosition = drawRatio(fi4.genY.value/2)+drawRatio(fi4.marginMiddleY.value/2);
          break;
      }

      for(var i=0;i<(Xnumber/2);i++){
        for(var j=0;j<(Ynumber/2);j++){
          XPosition = oriXPosition + (Xwidth * i);
          YPosition = oriYPosition + (Ywidth * j);
  
          ctx.strokeRect(XPosition, YPosition,Xwidth,Ywidth);
          ctx.fillRect(XPosition, YPosition,Xwidth,Ywidth);
        }
      }
    }
  }

  ctx.fillStyle="rgba(255,255,255,0.9)";
  ctx.strokeRect(80,drawRatio(fi4.genY.value)/4,160,drawRatio(fi4.genY.value)/2);
  ctx.fillRect(80,drawRatio(fi4.genY.value)/4,160,drawRatio(fi4.genY.value)/2);

  ctx.font="15px 'Segoe UI'"
  ctx.fillStyle="rgba(0,0,0,1)";

  var expText = [
    "- Longitudinal -",
    "Gen.: " + fi4.genX.value + " x " + fi4.genY.value + " mm",
    "UPS: " + XYnumber,
    "Area Ratio: " + areaRatio + "%"
  ]

  for(var i=0;i<expText.length;i++){
    ctx.fillText(expText[i], 85, (drawRatio(fi4.genY.value)/4)+20+24*i);
  }

}

function drawLong() {
  FindUPS()

  var canvas = document.getElementById('myUPSLong');
  var ctx = canvas.getContext('2d');

  preparingDraw(ctx,drawRatio(fi4.genY.value));

  var Xwidth = drawRatio(fi4.unitX.value);
  var Ywidth = drawRatio(fi4.unitY.value);
  var Xnumber = fi4.longX.value;
  var Ynumber = fi4.longY.value;
  var XYnumber = fi4.longXY.value;
  var areaRatio = fi4.areaRatioLong.value;

  drawMaps(Xwidth, Ywidth, Xnumber, Ynumber, XYnumber, areaRatio, ctx);
}

function drawTrans() {
  FindUPS()

  var canvas = document.getElementById('myUPSLong');
  var ctx = canvas.getContext('2d');

  preparingDraw(ctx,drawRatio(fi4.genY.value));

  var Xwidth = drawRatio(fi4.unitY.value);
  var Ywidth = drawRatio(fi4.unitX.value);
  var Xnumber = fi4.transX.value;
  var Ynumber = fi4.transY.value;
  var XYnumber = fi4.transXY.value;
  var areaRatio = fi4.areaRatioTrans.value;

  drawMaps(Xwidth, Ywidth, Xnumber, Ynumber, XYnumber, areaRatio, ctx);
}

function drawRatio(objSize){
  return 320 * objSize / fi4.genX.value;
}
