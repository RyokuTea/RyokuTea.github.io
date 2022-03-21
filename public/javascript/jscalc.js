function FindInch(){
   subPixelTimes()
   fi1.resultAAH.value = Math.round(fi1.resolutionH.value * fi1.PixelFormat.value * fi1.subPixelH.value) * (10**-3);
   fi1.resultAAV.value = Math.round(fi1.resolutionV.value * fi1.pixelV.value) * 10**-3;
   fi1.result.value = Math.round((Math.sqrt((fi1.resultAAH.value ** 2) + (fi1.resultAAV.value**2)) / 25.4)*1000)/1000;
   fi1.PPIH.value = PPIH(fi1.subPixelH.value, fi1.PixelFormat.value);
   fi1.PPIV.value = PPIV(fi1.pixelV.value);
}

function PPIH(subPixelH, PixelFormat){
   return Math.round((25.4/(subPixelH*PixelFormat)*10**3));
}

function PPIV(pixelV){
   return Math.round((25.4/pixelV*10**3));
}

function subPixelTimes(){
   fi1.pixelV.value = Math.round(fi1.subPixelH.value * fi1.PixelFormat.value *10**2)*10**-2;
}

function Clear(){
   const clearLists = [fi1.resolutionH, fi1.PixelFormat, fi1.resolutionV, fi1.subPixelH, fi1.pixelV, fi1.PPIH, fi1.PPIV, fi1.resultAAH, fi1.resultAAV, fi1.result];
   const dashLists = [fi1.pixelV, fi1.PPIH, fi1.PPIV, fi1.resultAAH, fi1.resultAAV, fi1.result];

   ClearContents(clearLists);
   dashContetns(dashLists);
   fi1.PixelFormat.value = "3";
}

function dashContetns(dashLists){
   dashLists.forEach((dashList)=>{
      dashList.value = "-";
   });
}

function ClearContents(clearLists){
   clearLists.forEach((clearList)=>{
      clearList.value = "";
   });
}

function calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2){
   var trials = 20000; // 試行回数
   var t_inner1 = 0; // 第1三角形内の点の数
   var t_inner2 = 0; // 第2三角形内の点の数
   
   /*
   var indexs = [indexA, indexB, indexC];
   for(var j=0;j<indexs.length;j++){
      console.log(indexs[j]);
   }
   console.log(indexs[2][0]);
   */
   for(var i = 0; i<trials; i++){
      var x = Math.random(); // 0 ~ 1.0の乱数
      var y = Math.random(); // 0 ~ 1.0の乱数

      var a = slop(indexA1, indexB1);
      var b = intercept(indexA1, a);
      var idealy = linearFunction(a, x, b);
      var anotherPointX = linearFunction(a, indexC1[0], b);
      var anotherPointY = indexC1[1];

      if(checkTorF(y, idealy, anotherPointX, anotherPointY)){
         a = slop(indexB1, indexC1);
         b = intercept(indexB1, a);
         idealy = linearFunction(a, x, b);
         anotherPointX = linearFunction(a, indexA1[0], b);
         anotherPointY = indexA1[1];

         if(checkTorF(y,idealy,anotherPointX,anotherPointY)){
            a = slop(indexC1, indexA1);
            b = intercept(indexC1, a);
            idealy = linearFunction(a, x, b);
            anotherPointX = linearFunction(a, indexB1[0], b);
            anotherPointY = indexB1[1];

            if(checkTorF(y,idealy, anotherPointX,anotherPointY)){
               t_inner1++;

               a = slop(indexA2, indexB2);
               b = intercept(indexA2, a);
               idealy = linearFunction(a, x, b);
               anotherPointX = linearFunction(a, indexC2[0], b);
               anotherPointY = indexC2[1];

               if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                  a = slop(indexB2, indexC2);
                  b = intercept(indexB2, a);
                  idealy = linearFunction(a, x, b);
                  anotherPointX = linearFunction(a, indexA2[0], b);
                  anotherPointY = indexA2[1];

                  if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                     a = slop(indexC2, indexA2);
                     b = intercept(indexC2, a);
                     idealy = linearFunction(a, x, b);
                     anotherPointX = linearFunction(a, indexB2[0], b);
                     anotherPointY = indexB2[1];

                     if(checkTorF(y, idealy, anotherPointX,anotherPointY)){
                        t_inner2++;
                     }
                  }
               }
            }
         }
      }
   }

   // 計算結果
   var result1 = t_inner1 / trials;
   var result2 = t_inner2 / trials;
   var ratio = (result2 / result1)*100;
   return Math.round(ratio*100)/100;
}

function slop(index1, index2){
   return (index2[1]-index1[1]) / (index2[0]-index1[0]);
}

function intercept(index1, a){
   return index1[1] - a * index1[0];
}

function linearFunction(a, x, b){
   return a*x+b;
}

function checkTorF(y, idealy, anotherPointX, anotherPointY){
   if(anotherPointY<anotherPointX){
      return y<=idealy;
   } else {
      return y>=idealy;
   }
}

function arbitrayAreaRatio(A1,B1,C1,A2,B2,C2){
   var standardArea = triangleSquare(A1,B1,C1);
   var sampleArea = triangleSquare(A2,B2,C2);

   return Math.round(sampleArea/standardArea*100*100)/100;
}

function calcRatio(){
   //standard value
   var indexA1 = [fi2.B1x.value,fi2.B1y.value]; //Blue
   var indexB1 = [fi2.G1x.value,fi2.G1y.value]; //Green
   var indexC1 = [fi2.R1x.value,fi2.R1y.value]; //Red

   //sample
   var indexA2 = [fi2.B2x.value,fi2.B2y.value]; //Blue
   var indexB2 = [fi2.G2x.value,fi2.G2y.value]; //Green
   var indexC2 = [fi2.R2x.value,fi2.R2y.value]; //Red

   if(!(fi2.B2x.value=="")){
      fi2.areaRatioxy.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
      fi2.coverageRatioxy.value = calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

      // convert xy -> uv
      fi2.R2u.value=xyTOuv_u(fi2.R2x.value, fi2.R2y.value);
      fi2.R2v.value=xyTOuv_v(fi2.R2x.value, fi2.R2y.value);
      fi2.G2u.value=xyTOuv_u(fi2.G2x.value, fi2.G2y.value);
      fi2.G2v.value=xyTOuv_v(fi2.G2x.value, fi2.G2y.value);
      fi2.B2u.value=xyTOuv_u(fi2.B2x.value, fi2.B2y.value);
      fi2.B2v.value=xyTOuv_v(fi2.B2x.value, fi2.B2y.value);
   }

   indexA1 = [fi2.B1u.value,fi2.B1v.value]; //Blue
   indexB1 = [fi2.G1u.value,fi2.G1v.value]; //Green
   indexC1 = [fi2.R1u.value,fi2.R1v.value]; //Red

   indexA2 = [fi2.B2u.value,fi2.B2v.value]; //Blue
   indexB2 = [fi2.G2u.value,fi2.G2v.value]; //Green
   indexC2 = [fi2.R2u.value,fi2.R2v.value]; //Red

   fi2.areaRatiouv.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
   fi2.coverageRatiouv.value = calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

   if(fi2.B2x.value==""){
      // convert uv -> xy
      fi2.R2x.value=uvTOxy_x(fi2.R2u.value, fi2.R2v.value);
      fi2.R2y.value=uvTOxy_y(fi2.R2u.value, fi2.R2v.value);
      fi2.G2x.value=uvTOxy_x(fi2.G2u.value, fi2.G2v.value);
      fi2.G2y.value=uvTOxy_y(fi2.G2u.value, fi2.G2v.value);
      fi2.B2x.value=uvTOxy_x(fi2.B2u.value, fi2.B2v.value);
      fi2.B2y.value=uvTOxy_y(fi2.B2u.value, fi2.B2v.value);

      indexA1 = [fi2.B1x.value,fi2.B1y.value]; //Blue
      indexB1 = [fi2.G1x.value,fi2.G1y.value]; //Green
      indexC1 = [fi2.R1x.value,fi2.R1y.value]; //Red

      indexA2 = [fi2.B2x.value,fi2.B2y.value]; //Blue
      indexB2 = [fi2.G2x.value,fi2.G2y.value]; //Green
      indexC2 = [fi2.R2x.value,fi2.R2y.value]; //Red      

      fi2.areaRatioxy.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
      fi2.coverageRatioxy.value = calcCOM(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);
   }
}

function distance(P1,P2){
   return Math.sqrt((P1[0]-P2[0])**2+(P1[1]-P2[1])**2);
}

function triangleSquare(P1,P2,P3){
   var a = distance(P1,P2);
   var b = distance(P2,P3);
   var c = distance(P3,P1);
   var s = (a+b+c)/2;

   return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}

function xyTOuv_u(C1,C2){
   return Math.round((4*C1)/(-2*C1+12*C2+3)*10**3)/10**3;
}

function xyTOuv_v(C1,C2){
   return Math.round((9*C2)/(-2*C1+12*C2+3)*10**3)/10**3;
}

function uvTOxy_x(C1,C2){
   return Math.round((9*C1)/(6*C1-16*C2+12)*10**3)/10**3;
}

function uvTOxy_y(C1,C2){
   return Math.round((4*C2)/(6*C1-16*C2+12)*10**3)/10**3;
}

function colorKind(obj){
   var idx = obj.selectedIndex;
   var value = obj.options[idx].value;
   fi2.colorF1.value=value;
   fi2.colorF2.value=value;
   fi2.colorF3.value=value;

   switch (value){
      case "sRGB":
         fi2.R1x.value="0.640";
         fi2.R1y.value="0.330";
         fi2.G1x.value="0.300";
         fi2.G1y.value="0.600";
         fi2.B1x.value="0.150";
         fi2.B1y.value="0.060";
         break;
      case "DCI-P3":
         fi2.R1x.value="0.680";
         fi2.R1y.value="0.320";
         fi2.G1x.value="0.265";
         fi2.G1y.value="0.690";
         fi2.B1x.value="0.150";
         fi2.B1y.value="0.060";
         break;
      case "NTSC":
         fi2.R1x.value="0.670";
         fi2.R1y.value="0.330";
         fi2.G1x.value="0.210";
         fi2.G1y.value="0.710";
         fi2.B1x.value="0.140";
         fi2.B1y.value="0.080";
         break;
      case "AdobeRGB":
         fi2.R1x.value="0.640";
         fi2.R1y.value="0.330";
         fi2.G1x.value="0.210";
         fi2.G1y.value="0.710";
         fi2.B1x.value="0.150";
         fi2.B1y.value="0.060";
         break;
      case "BT.2020":
         fi2.R1x.value="0.708";
         fi2.R1y.value="0.292";
         fi2.G1x.value="0.170";
         fi2.G1y.value="0.797";
         fi2.B1x.value="0.131";
         fi2.B1y.value="0.046";
         break;
   }

   // convert xy -> uv
   fi2.R1u.value=xyTOuv_u(fi2.R1x.value, fi2.R1y.value);
   fi2.R1v.value=xyTOuv_v(fi2.R1x.value, fi2.R1y.value);
   fi2.G1u.value=xyTOuv_u(fi2.G1x.value, fi2.G1y.value);
   fi2.G1v.value=xyTOuv_v(fi2.G1x.value, fi2.G1y.value);
   fi2.B1u.value=xyTOuv_u(fi2.B1x.value, fi2.B1y.value);
   fi2.B1v.value=xyTOuv_v(fi2.B1x.value, fi2.B1y.value);

   //NTSCxy
   var indexA1 = [0.140,0.080]; //Blue
   var indexB1 = [0.210,0.710]; //Green
   var indexC1 = [0.670,0.330]; //Red

   var indexA2 = [fi2.B1x.value,fi2.B1y.value]; //Blue
   var indexB2 = [fi2.G1x.value,fi2.G1y.value]; //Green
   var indexC2 = [fi2.R1x.value,fi2.R1y.value]; //Red
   fi2.areaRatioNTSCxy.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

   //NTSCuv
   indexA1 = [0.152,0.196]; //Blue
   indexB1 = [0.076,0.576]; //Green
   indexC1 = [0.477,0.528]; //Red

   indexA2 = [fi2.B1u.value,fi2.B1v.value]; //Blue
   indexB2 = [fi2.G1u.value,fi2.G1v.value]; //Green
   indexC2 = [fi2.R1u.value,fi2.R1v.value]; //Red

   fi2.areaRatioNTSCuv.value = arbitrayAreaRatio(indexA1,indexB1,indexC1,indexA2,indexB2,indexC2);

   /*
   //検討用にあたいをいれてしまう。
   fi2.R2x.value="0.635";
   fi2.R2y.value="0.320";
   fi2.G2x.value="0.315";
   fi2.G2y.value="0.597";
   fi2.B2x.value="0.155";
   fi2.B2y.value="0.055";

   fi2.R2u.value="0.440";
   fi2.R2v.value="0.500";
   fi2.G2u.value="0.120";
   fi2.G2v.value="0.550";
   fi2.B2u.value="0.170";
   fi2.B2v.value="0.150";
   */

}

function FindPPI(){
   fi3.resultAAH.value = (Math.round(Math.sqrt((25.4*fi3.inch.value)**2/(1+(fi3.resolutionV.value/fi3.resolutionH.value)**2))*10**3)*10**-3).toFixed(3);
   fi3.resultAAV.value = (Math.round(fi3.resolutionV.value*fi3.resultAAH.value/fi3.resolutionH.value*10**3)*10**-3).toFixed(3);
   fi3.pixelV.value = (Math.round(fi3.resultAAV.value/fi3.resolutionV.value*10**3 *10**2)*10**-2).toFixed(2);
   fi3.subPixelH.value = (Math.round(fi3.pixelV.value / fi3.PixelFormat.value *10**2)*10**-2).toFixed(2);
   fi3.PPIH.value = PPIH(fi3.subPixelH.value, fi3.PixelFormat.value);
   fi3.PPIV.value = PPIV(fi3.pixelV.value);
}

function ClearPPI(){
   const clearLists = [fi3.inch, fi3.resolutionH, fi3.resolutionV, fi3.resultAAH, fi3.resultAAV, fi3.subPixelH, fi3.pixelV, fi3.PPIH, fi3.PPIV];
   const dashLists = [fi3.resultAAH, fi3.resultAAV, fi3.subPixelH, fi3.pixelV, fi3.PPIH, fi3.PPIV];

   ClearContents(clearLists);
   dashContetns(dashLists);
   fi3.PixelFormat.value = "3";
}

function genKind(obj){
   var idx = obj.selectedIndex;
   var value = obj.options[idx].value;

   switch (value){
      case "1":
         fi4.genX.value="200";
         fi4.genY.value="200";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "2":
         fi4.genX.value="370";
         fi4.genY.value="470";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "3":
         fi4.genX.value="550";
         fi4.genY.value="650";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "3.5":
         fi4.genX.value="600";
         fi4.genY.value="720";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "4":
         fi4.genX.value="680";
         fi4.genY.value="880";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "4.5":
         fi4.genX.value="730";
         fi4.genY.value="920";
         fi4.marginMiddleX.value="0";
         fi4.marginMiddleY.value="0";
         break;
      case "5a":
         fi4.genX.value="1100";
         fi4.genY.value="1250";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "5b":
         fi4.genX.value="1100";
         fi4.genY.value="1300";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "5.5":
         fi4.genX.value="1300";
         fi4.genY.value="1500";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "6a":
         fi4.genX.value="1500";
         fi4.genY.value="1800";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "6b":
         fi4.genX.value="1500";
         fi4.genY.value="1850";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "7":
         fi4.genX.value="1870";
         fi4.genY.value="2200";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "7.5":
         fi4.genX.value="1950";
         fi4.genY.value="2250";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "8":
         fi4.genX.value="2160";
         fi4.genY.value="2460";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "8.5":
         fi4.genX.value="2200";
         fi4.genY.value="2500";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "8.6":
         fi4.genX.value="2250";
         fi4.genY.value="2600";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "10":
         fi4.genX.value="2880";
         fi4.genY.value="3130";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
      case "10.5":
         fi4.genX.value="2940";
         fi4.genY.value="3370";
         fi4.marginMiddleX.value="30";
         fi4.marginMiddleY.value="30";
         break;
   }
}

function FindUPS(){
   if(fi4.marginMiddleX.value==0 && fi4.marginMiddleY.value==0){
      fi4.longX.value = Math.floor((fi4.genX.value - (fi4.marginX.value*2))/fi4.unitX.value);
      fi4.longY.value = Math.floor((fi4.genY.value - (fi4.marginY.value*2))/fi4.unitY.value);

      fi4.transX.value = Math.floor((fi4.genX.value - (fi4.marginX.value*2))/fi4.unitY.value);
      fi4.transY.value = Math.floor((fi4.genY.value - (fi4.marginY.value*2))/fi4.unitX.value);
   } else {
      fi4.longX.value = 2*(Math.floor((fi4.genX.value/2 - (Number(fi4.marginX.value)+Number(fi4.marginMiddleX.value)/2))/fi4.unitX.value));
      fi4.longY.value = 2*(Math.floor((fi4.genY.value/2 - (Number(fi4.marginY.value)+Number(fi4.marginMiddleY.value)/2))/fi4.unitY.value));

      fi4.transX.value = 2*(Math.floor((fi4.genX.value/2 - (Number(fi4.marginX.value)+Number(fi4.marginMiddleX.value)/2))/fi4.unitY.value));
      fi4.transY.value = 2*(Math.floor((fi4.genY.value/2 - (Number(fi4.marginY.value)+Number(fi4.marginMiddleY.value)/2))/fi4.unitX.value));
   }
   fi4.longXY.value = fi4.longX.value * fi4.longY.value;
   fi4.longXSize.value = Math.floor(fi4.unitX.value * fi4.longX.value * 10**2)/10**2;
   fi4.longYSize.value = Math.floor(fi4.unitY.value * fi4.longY.value * 10**2)/10**2;
   fi4.areaRatioLong.value = Math.round((fi4.longXSize.value * fi4.longYSize.value) / (fi4.genX.value * fi4.genY.value)*100*10)/10;

   fi4.transXY.value = fi4.transX.value * fi4.transY.value;
   fi4.transXSize.value = Math.floor(fi4.unitY.value * fi4.transX.value * 10**2)/10**2;
   fi4.transYSize.value = Math.floor(fi4.unitX.value * fi4.transY.value * 10**2)/10**2;
   fi4.areaRatioTrans.value = Math.round((fi4.transXSize.value * fi4.transYSize.value) / (fi4.genX.value * fi4.genY.value)*100*10)/10;
}

function clearUPS(){
   //To initialize. Require Id, name is not enough.
   document.getElementById("fi4").reset();
}

// Ref. This isn't used.
function calcPi(){
   var trials = 10000; // 試行回数
   var t_inner = 0; // 円内の点の数
 
   for(var i = 0; i < trials; i++){
     var x = Math.random(); // 0 ~ 1.0の乱数
     var y = Math.random(); // 0 ~ 1.0の乱数
     var r = Math.sqrt(x * x + y * y);
 
     if(r < 1){
       // 円の内側
       t_inner++;
     }
   }
   // 計算結果
   var result = 4 * t_inner / trials;
   mont.calPi.value = result;
}